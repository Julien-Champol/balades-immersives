import axios from "axios";
import { useState } from "react";
import utils from "../Utils/utils.json";

const CreateBuilding = () => {
    const [imageSelected, setImageSelected] = useState("");
    const [urlCloudinary, setUrlCloudinary] = useState("");

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
                console.error(utils.messages.cannotUploadToCloudinary, error);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: e.target.name.value,
            address: e.target.address.value,
            latitude: e.target.latitude.value,
            longitude: e.target.e.value,
            URLPhoto: urlCloudinary
        };
        try {
            const response = await axios.post(utils.api.baladesImmersives.createBuilding, formData);

            if (response.status === 201) {
                window.location.reload();
            }
        } catch (error) {
            console.log(utils.messages.cannotConnectToApi, error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>

                <label htmlFor="name">Nom</label>
                <input type="text" name="name" id="name" placeholder="Nom" />
                <br />

                <label htmlFor="address">Adresse</label>
                <input type="text" name="address" id="address" placeholder="Adresse" />
                <br />

                <label htmlFor="latitude">Latitude</label>
                <input type="text" name="latitude" id="latitude" placeholder="Latitude" />
                <br />

                <label htmlFor="e">Longitude</label>
                <input type="text" name="e" id="e" placeholder="Longitude" />
                <br />

                <label htmlFor="photo">Photo</label>
                <input type="file" name="photo" id="photo" onChange={
                    (event) => {
                        setImageSelected(event.target.files[0]);
                    }
                } />

                <input type="text" name="URLPhoto" id="URLPhoto" style={{ display: 'none' }} />

                <button id="uploadPicture" onClick={handlePhotoUpload}>Charger la photo</button>
                < br />

                <button type="submit" id="submitForm">Enregistrer</button>
            </form>
        </>
    )

};

export default CreateBuilding;