import axios from "axios";

const CreateUser = () => {

    const createUserForm = async (e) => {
        e.preventDefault();

        const formData = {
            name: e.target.nomUser.value,
            email: e.target.emailUser.value,
            password: e.target.passwordUser.value,
        };

        if(e.target.passwordUser.value === e.target.confirmUser.value) {
            try {
                console.log("mon formulaire: ", formData)
                const response = await axios.post(`https://balades-immersives.tech/users`, formData);

                if (response.status === 201) {
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
        } else {
            console.log('Les mots de passe ne correspondent pas');
            alert("Les mots de passe ne sont pas identiques !")
        }
    };

    return (
        <>
            <form onSubmit={createUserForm}>
                <label htmlFor="nomUser">Nom</label>
                <input type="text" name="nomUser" id="nomUser" placeholder="Votre nom"/>
                <br/>

                <label htmlFor="emailUser">Adresse email</label>
                <input type="text" name="emailUser" id="emailUser" placeholder="Votre email"/>
                <br/>

                <label htmlFor="passwordUser">Mot de passe</label>
                <input type="password" name="passwordUser" id="passwordUser" placeholder="mot de passe"/>
                <br/>

                <label htmlFor="confirmUser">Confirmation mot de passe</label>
                <input type="password" name="confirmUser" id="confirmUser" placeholder="confirmer votre mot de passe"/>
                <br/>
                <button type="submit" id="submitFormUser">Valider</button>
            </form>
        </>

    )


};

export default CreateUser;