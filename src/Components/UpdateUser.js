import axios from "axios";
import utils from '../Utils/utils.json';

const UpdateUser = (props) => {
    const myUser = props.user;

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
                    <input type="text" name="nomUser" className="form-control" id="nomUser" defaultValue={myUser.name}/>
                </div>

                <div className="form-group">
                    <label htmlFor="emailUser">Adresse</label>
                    <input type="text" name="emailUser" className="form-control" id="emailUser" defaultValue={myUser.email}/>
                </div>

                <button type="submit" className="btn btn-primary mb-2" id="submitFormUser">Mettre à jour</button>
            </form>
        </>
    )
}

export default UpdateUser;