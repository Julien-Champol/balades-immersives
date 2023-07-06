import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useState} from "react";


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
            const response = await axios.post(`https://balades-immersives.tech/users/connexion`, formData);

            if (response.status === 201 && response.data.length === 1) {
                // Retour ok
                const passwordUserBDD = response.data[0].password;
                bcrypt.compare(passwordUser, passwordUserBDD, (err, result) => {
                    if (result) {
                        navigate("/admin", {state: {u: response.data[0]}});
                    } else {
                        // Le mot de passe est incorrect
                        setMsgError("Adresse mail ou mot de passe incorrect")
                    }
                });
            } else {
                // Retour avec erreur
                console.log('Échec de la connexion');
            }
        } catch (error) {
            // Pas d'envoi
            console.log('erreur: ', error);
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
                               placeholder="Entrer email"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="passwordUser">Password</label>
                        <input type="password" className="form-control" id="passwordUser"
                               placeholder="Mot de passe"/>
                    </div>
                    <button type="submit" className="btn btn-primary" id="submitFormUser">Valider</button>
                </form>
            </div>
        }

        </>
    )


}

export default Login;