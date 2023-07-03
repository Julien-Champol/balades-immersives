import axios from "axios";
import {useState} from "react";

const FormUser = (props) => {
    const myUser = props.user;
    const [formData, setFormData] = useState({
        nomUser: myUser.name || '',
        emailUser: myUser.email || ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            [e.target.email]: e.target.value,
        });
    };

    const handleSubmitUser = async (e) => {
        e.preventDefault();

        const formData = {
            name: e.target.nomUser.value,
            email: e.target.emailUser.value
        };

        try {
            const response = await axios.put(`http://185.212.225.152:3002/users/${myUser._id}`, formData);
            //const response = await axios.put(`http://localhost:3002/users/${myUser._id}`, formData);

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

    return (
        <>
            <form onSubmit={handleSubmitUser}>
                <p>{myUser.name}</p>

                <label htmlFor="nomUser">Nom</label>
                <input type="text" name="nomUser" id="nomUser" value={formData.nomUser} onChange={handleInputChange}/>
                <br/>

                <label htmlFor="emailUser">Adresse</label>
                <input type="text" name="emailUser" id="emailUser" value={formData.emailUser}
                       onChange={handleInputChange}/>
                <br/>


                <button type="submit" id="submitFormUser">Mettre à jour</button>
            </form>
        </>
    )
}

export default FormUser;