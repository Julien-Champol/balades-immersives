import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import utils from '../Utils/utils.json';

const Login = () => {
    const bcrypt = require('bcryptjs');

    const [msgError, setMsgError] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let email = e.target.emailUser.value;
        const passwordUser = e.target.passwordUser.value;

        const formData = {
            email: email,
        };
        try {
            const response = await axios.post(utils.api.baladesImmersives.connectUser, formData);

            if (response.status === 201 && response.data.length === 1) {
                const passwordUserBDD = response.data[0].password;
                bcrypt.compare(passwordUser, passwordUserBDD, (err, result) => {
                    if (result) {
                        navigate("/admin", { state: { u: response.data[0] } });
                    } else {
                        setMsgError(utils.messages.connectionError);
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <> {
            <div>
                <h2>Connexion</h2>
                <form onSubmit={handleSubmit}>
                    {msgError !== "" && <div className="alert alert-danger">
                        {msgError}
                    </div>}
                    <div className="form-group">
                        <label htmlFor="emailUser">Adresse mail</label>
                        <input type="email" className="form-control" id="emailUser"
                            aria-describedby="emailHelp"
                            placeholder="Entrer email" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="passwordUser">Password</label>
                        <input type="password" className="form-control" id="passwordUser"
                            placeholder="Mot de passe" />
                    </div>
                    <button type="submit" className="btn btn-primary" id="submitFormUser">Valider</button>
                </form>
            </div>
        }
        </>
    )
}

export default Login;