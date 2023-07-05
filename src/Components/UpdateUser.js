import axios from "axios";
import {useState} from "react";
import utils from '../Utils/utils.json';

const UpdateUser = (props) => {
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
            const updateUserRequest = utils.api.baladesImmersives.updateUser.replace('{userId}', myUser._id);
            const response = await axios.put(updateUserRequest, formData);

            if (response.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
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

export default UpdateUser;