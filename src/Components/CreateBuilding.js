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
                <div className="form-group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" className="form-control" name="name" id="name" placeholder="Nom" />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Adresse</label>
                    <input type="text" className="form-control" name="address" id="address" placeholder="Adresse" />
                </div>

                <div className="form-group">
                    <label htmlFor="latitude">Latitude</label>
                    <input type="text" name="latitude" className="form-control" id="latitude" placeholder="Latitude" />
                </div>

                <div className="form-group">
                    <label htmlFor="e">Longitude</label>
                    <input type="text" className="form-control" name="e" id="e" placeholder="Longitude" />
                </div>


                <label htmlFor="photo">Photo</label>
                <div className="form-group input-group">

                    <input type="file" className="form-control" name="photo" id="photo" onChange={
                        (event) => {
                            setImageSelected(event.target.files[0]);
                        }
                    } />
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
};

export default CreateBuilding;