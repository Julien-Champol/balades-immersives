import axios from "axios";
import {useState} from "react";

const FormBatiment = (props) => {
    const myBat = props.batiment;
    const [formData, setFormData] = useState({
        nomBat: myBat.name || '',
        addressBat: myBat.address || '',
        latitudeBat: myBat.latitude || '',
        longitudeBat: myBat.longitude || ''
    });
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            [e.target.address]: e.target.value,
            [e.target.latitude]: e.target.value,
            [e.target.longitude]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: e.target.nomBat.value,
            address: e.target.addressBat.value,
            latitude: e.target.latitudeBat.value,
            longitude: e.target.longitudeBat.value
        };

        try {
            const response = await axios.put(`http://185.212.225.152:3002/buildings/${myBat._id}`, formData);
            //const response = await axios.put(`http://localhost:3002/buildings/${myBat._id}`, formData);

            if (response.status === 200) {
                // Retour ok
                console.log('Envoi validé');
                console.log(formData);
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
                <button type="submit" id="submitForm">Mettre à jour</button>
            </form>
        </>
    )
}

export default FormBatiment;