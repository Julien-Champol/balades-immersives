import axios from "axios";
import {useState} from "react";


const FormBatiment = (props) => {
    const myBat = props.batiment;
    const [formData, setFormData] = useState({
        nomBat: myBat.name || '',
        addressBat: myBat.address || '',
        latitudeBat: myBat.latitude || '',
        longitudeBat: myBat.longitude || '',
        URLPhotoBat: myBat.URLPhoto || ''
    });

    // Gestion de l'upload de la photo avec cloudinary
    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'your_upload_preset');

        axios
            .post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', formData)
            .then((response) => {
                const photoUrl = response.data.secure_url;
                setFormData({...formData, photo: photoUrl});
            })
            .catch((error) => {
                console.error('Error uploading photo:', error);
            });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            [e.target.address]: e.target.value,
            [e.target.latitude]: e.target.value,
            [e.target.longitude]: e.target.value,
            [e.target.URLPhoto]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: e.target.nomBat.value,
            address: e.target.addressBat.value,
            latitude: e.target.latitudeBat.value,
            longitude: e.target.longitudeBat.value,
            URLPhoto: e.target.URLPhotoBat.value
        };

        try {
            const response = await axios.put(`https://balades-immersives.tech/buildings/${myBat._id}`, formData);

            if (response.status === 200) {
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

    const uploadImage = () => {

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p>{myBat.name}</p>

                <label htmlFor="nomBat">Nom</label>
                <input type="text" name="nomBat" id="nomBat" value={formData.nomBat} onChange={handleInputChange}/>
                <br/>

                <label htmlFor="addressBat">Adresse</label>
                <input type="text" name="addressBat" id="addressBat" value={formData.addressBat}
                       onChange={handleInputChange}/>
                <br/>

                <label htmlFor="latitudeBat">Latitude</label>
                <input type="text" name="latitudeBat" id="latitudeBat" value={formData.latitudeBat}
                       onChange={handleInputChange}/>
                <br/>

                <label htmlFor="longitudeBat">Longitude</label>
                <input type="text" name="longitudeBat" id="longitudeBat" value={formData.longitudeBat}
                       onChange={handleInputChange}/>
                <br/>

                <label htmlFor="photo">Photo</label>
                <input type="file" name="URLPhotoBat" id="URLPhotoBat" onChange={handlePhotoUpload}/>
                <button id="uploadPicture" onClick={uploadImage}>Charger la photo</button>
                < br/>
                
                <button type="submit" id="submitForm">Mettre à jour</button>
            </form>
        </>
    )
}

export default FormBatiment;