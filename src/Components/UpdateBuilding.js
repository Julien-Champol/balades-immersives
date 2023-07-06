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

                <div className="form-group">
                    <label htmlFor="nomBat">Nom</label>
                    <input type="text" className="form-control" name="nomBat" id="nomBat" defaultValue={building.name} placeholder="Nom"/>
                </div>

                <div className="form-group">
                    <label htmlFor="addressBat">Adresse</label>
                    <input type="text" className="form-control" name="addressBat" defaultValue={building.address} id="addressBat" placeholder="Adresse"/>
                </div>
                <div className="form-group">
                    <label htmlFor="latitudeBat">Latitude</label>
                    <input type="text" name="latitudeBat" className="form-control" id="latitudeBat" defaultValue={building.latitude} placeholder="Latitude"/>
                </div>
                <div className="form-group">
                    <label htmlFor="longitudeBat">Longitude</label>
                    <input type="text" className="form-control" name="longitudeBat" id="longitudeBat" defaultValue={building.longitude} placeholder="Longitude"/>
                </div>

                <label htmlFor="photo">Photo</label>

                <div className="form-group input-group">

                    <input type="file" className="form-control" name="photo" id="photo" onChange={
                        (event) => {
                            setImageSelected(event.target.files[0]);
                        }
                    }/>
                    <div className="input-group-prepend">

                        <button id="uploadPicture" className="btn btn-outline-secondary"
                                onClick={handlePhotoUpload}>Charger la photo
                        </button>
                    </div>

                </div>


                <button type="submit" className="btn btn-primary mb-2" id="submitForm">Enregistrer</button>
            </form>
        </>
    )
}

export default UpdateBuilding;