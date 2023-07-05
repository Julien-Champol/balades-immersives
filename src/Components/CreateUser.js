import axios from "axios";
import utils from "../Utils/utils.json"

const CreateUser = () => {

    const createUserForm = async (e) => {
        e.preventDefault();

        const formData = {
            name: e.target.nomUser.value,
            email: e.target.emailUser.value,
            password: e.target.passwordUser.value,
        };

        if (e.target.passwordUser.value === e.target.confirmUser.value) {
            try {
                const response = await axios.post(utils.api.baladesImmersives.createUser, formData);
                if (response.status === 201) {
                    window.location.reload();
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            alert(utils.messages.passwordsNotCorresponding)
        }
    };

    return (
        <>
            <form onSubmit={createUserForm}>
                <label htmlFor="nomUser">Nom</label>
                <input type="text" name="nomUser" id="nomUser" placeholder="Votre nom" />
                <br />

                <label htmlFor="emailUser">Adresse email</label>
                <input type="text" name="emailUser" id="emailUser" placeholder="Votre email" />
                <br />

                <label htmlFor="passwordUser">Mot de passe</label>
                <input type="password" name="passwordUser" id="passwordUser" placeholder="mot de passe" />
                <br />

                <label htmlFor="confirmUser">Confirmation mot de passe</label>
                <input type="password" name="confirmUser" id="confirmUser" placeholder="confirmer votre mot de passe" />
                <br />
                <button type="submit" id="submitFormUser">Valider</button>
            </form>
        </>

    )


};

export default CreateUser;