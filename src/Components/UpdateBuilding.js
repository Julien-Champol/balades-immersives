import axios from "axios";
import { useEffect, useState } from "react";
import utils from '../Utils/utils.json';

const UpdateBuilding = (props) => {
    const building = props.batiment;

    useEffect(() => {
        console.log(building)
    })

    const [imageSelected, setImageSelected] = useState("");
    const [urlCloudinary, setUrlCloudinary] = useState(building.URLPhoto);

    const handlePhotoUpload = async (e) => {
        e.preventDefault();
        const formPhoto = new FormData();
        formPhoto.append("file", imageSelected);
        formPhoto.append("upload_preset", "balades");

        await axios
            .post(utils.api.cloudinary.uploadToCloudinary, formPhoto)
            .then((response) => {
                const photoUrl = response.data.secure_url;
                setUrlCloudinary(photoUrl);
                alert(utils.messages.confirmImageUploadOnCloudinary);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: e.target.nomBat.value,
            address: e.target.addressBat.value,
            latitude: e.target.latitudeBat.value,
            longitude: e.target.longitudeBat.value,
            URLPhoto: urlCloudinary
        };

        console.log(formData)

        try {
            const updateBuildingRequest = utils.api.baladesImmersives.updateBuilding.replace('{batimentId}', building._id)
            const response = await axios.put(updateBuildingRequest, formData);

            if (response.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p>{building.name}</p>

                <label htmlFor="nomBat">Nom</label>
                <input type="text" name="nomBat" id="nomBat" defaultValue={building.name} />
                <br />

                <label htmlFor="addressBat">Adresse</label>
                <input type="text" name="addressBat" id="addressBat" defaultValue={building.address}
                />
                <br />

                <label htmlFor="latitudeBat">Latitude</label>
                <input type="text" name="latitudeBat" id="latitudeBat" defaultValue={building.latitude}
                />
                <br />

                <label htmlFor="longitudeBat">Longitude</label>
                <input type="text" name="longitudeBat" id="longitudeBat" defaultValue={building.longitude}
                />
                <br />

                <label htmlFor="photo">Photo</label>
                <input type="file" name="photo" id="photo" onChange={
                    (event) => {
                        setImageSelected(event.target.files[0]);
                    }
                } />
                <input type="text" defaultValue={building.URLPhoto} name="URLPhotoBat" id="URLPhotoBat"
                    style={{ display: 'none' }}
                />

                <button id="uploadPicture" onClick={handlePhotoUpload}>Charger la photo
                </button>
                < br />

                <button type="submit" id="submitForm">Mettre à jour</button>
            </form>
        </>
    )
}

export default UpdateBuilding;