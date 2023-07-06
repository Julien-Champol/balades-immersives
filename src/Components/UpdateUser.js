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
                <div className="form-group">
                    <label htmlFor="nomUser">Nom</label>
                    <input type="text" name="nomUser" className="form-control" id="nomUser" defaultValue={myUser.name}
                           /*onChange={handleInputChange}*//>
                </div>

                <div className="form-group">
                    <label htmlFor="emailUser">Adresse</label>
                    <input type="text" name="emailUser" className="form-control" id="emailUser" defaultValue={myUser.email}
                           /* onChange={handleInputChange}*//>
                </div>

                <button type="submit" className="btn btn-primary mb-2" id="submitFormUser">Mettre à jour</button>
            </form>
        </>
    )
}

export default UpdateUser;