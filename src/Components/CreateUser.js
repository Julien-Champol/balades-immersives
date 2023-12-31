import axios from "axios";
import utils from "../Utils/utils.json";

const CreateUser = (props) => {
    const users = props.users;

    const bcrypt = require("bcryptjs");

    const createUserForm = async (e) => {
        e.preventDefault();

        const hashPassword = async (password) => {
            try {
                const hash = await new Promise((resolve, reject) => {
                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) reject(err);
                        resolve(hash);
                    });
                });
                return hash;
            } catch (err) {
                console.error(utils.messages.cannotHashPassword, err);
                return null;
            }
        };

        const hashedPassword = await hashPassword(e.target.passwordUser.value);

        const formData = {
            name: e.target.nomUser.value,
            email: e.target.emailUser.value,
            password: hashedPassword,
        };

        const existingUser = users.find(user => user.email === formData.email);
        if (existingUser) {
            alert(utils.messages.emailAlreadyTaken);
            return;
        }

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
                <div className="form-group">
                    <label htmlFor="nomUser">Nom</label>
                    <input type="text" name="nomUser" className="form-control" id="nomUser" placeholder="Votre nom" />
                </div>

                <div className="form-group">
                    <label htmlFor="emailUser">Adresse email</label>
                    <input type="text" name="emailUser" className="form-control" id="emailUser"
                        placeholder="Votre email" />
                </div>

                <div className="form-group">
                    <label htmlFor="passwordUser">Mot de passe</label>
                    <input type="password" name="passwordUser" className="form-control" id="passwordUser"
                        placeholder="mot de passe" />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmUser">Confirmation mot de passe</label>
                    <input type="password" name="confirmUser" className="form-control" id="confirmUser"
                        placeholder="confirmer votre mot de passe" />
                </div>


                <button type="submit" className="btn btn-primary mb-2" id="submitFormUser">Valider</button>
            </form>
        </>
    )
};

export default CreateUser;