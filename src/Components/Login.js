import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const bcrypt = require('bcryptjs');

  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: e.target.emailUser.value,
    };
    try {
      console.log("mon formulaire: ", formData)
      const response = await axios.post(`https://balades-immersives.tech/users/connexion`, formData);

      console.log(" test de la réponse", response.data[0]);
      if (response.status === 201 && response.data.length === 1) {
        // Retour ok
        console.log(response.data[0].password)
        bcrypt.compare(e.target.passwordUser.value, response.data[0].password, (err, result) => {
          if (result) {
            console.log('Connexion réussie');
            navigate("/admin", { state: { u: response.data[0] } });
          } else {
            // Le mot de passe est incorrect
            console.log('Mot de passe incorrect');
          }
        });
      } else {
        // Retour avec erreur
        console.log(formData);

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
          <label htmlFor="emailUser">Adresse email</label>
          <input type="text" name="emailUser" id="emailUser" placeholder="Votre email" />
          <br />

          <label htmlFor="passwordUser">Mot de passe</label>
          <input type="password" name="passwordUser" id="passwordUser" placeholder="mot de passe" />
          <br />
          <button type="submit" id="submitFormUser">Valider</button>
        </form>
      </div>
    }

    </>
  )


}

export default Login;