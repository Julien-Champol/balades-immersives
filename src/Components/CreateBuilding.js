import {useState} from "react";
import axios from "axios";

const CreateBuilding = () => {
    const [imageSelected, setImageSelected] = useState("");
    const [urlCloudinary, setUrlCloudinary] = useState("");

    // Gestion de l'upload de la photo avec cloudinary
    const handlePhotoUpload = async (e) => {
        e.preventDefault();
        const formPhoto = new FormData();
        formPhoto.append("file", imageSelected);
        formPhoto.append("upload_preset", "balades");

        await axios
            .post('https://api.cloudinary.com/v1_1/dmtss9gtm/image/upload', formPhoto)
            .then((response) => {
                const photoUrl = response.data.secure_url;
                setUrlCloudinary(photoUrl);
                alert("photo chargée");
            })
            .catch((error) => {
                console.error('Error uploading photo:', error);
            });
    };

    const handleInputChange = (e) => {

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
            console.log(formData)
            const response = await axios.post(`https://www.balades-immersives.tech/buildings`, formData);

            if (response.status === 201) {
                // Retour ok
                console.log('Envoi validé');
                console.log(formData);
                window.location.reload();
            } else {
                // Retour avec erreur
                console.log('envoi non validé');
            }
        } catch (error) {
            // Pas d'envoi
            console.log('erreur: ', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>

                <label htmlFor="name">Nom</label>
                <input type="text" name="name" id="name" placeholder="Nom"/>
                <br/>

                <label htmlFor="address">Adresse</label>
                <input type="text" name="address" id="address" placeholder="Adresse"/>
                <br/>

                <label htmlFor="latitude">Latitude</label>
                <input type="text" name="latitude" id="latitude" placeholder="Latitude"/>
                <br/>

                <label htmlFor="e">Longitude</label>
                <input type="text" name="e" id="e" placeholder="Longitude"/>
                <br/>

                <label htmlFor="photo">Photo</label>
                <input type="file" name="photo" id="photo" onChange={
                    (event) => {
                        setImageSelected(event.target.files[0]);
                    }
                }/>
                <input type="text" name="URLPhoto" id="URLPhoto"
                       style={{display: 'none'}}
                       onChange={handleInputChange}/>

                <button id="uploadPicture" onClick={handlePhotoUpload}>Charger la photo
                </button>
                < br/>

                <button type="submit" id="submitForm">Enregistrer</button>
            </form>
        </>
    )

};

export default CreateBuilding;