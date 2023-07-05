import {useEffect, useState} from "react";
import axios from "axios";
import FormUser from "./FormUser";
import {Link} from "react-router-dom";
import CreateUser from "./CreateUser";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [showFormUser, setShowFormUser] = useState(false);
    const [showFormCreate, setShowFormCreate] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


    useEffect(() => {
        // appel pour les users
        axios.get('https://balades-immersives.tech/users')
            .then((resUsers) => {
                if (resUsers.data.errors) {
                    console.log('Infos sur les utilisateurs non disponibles');
                } else {
                    setUsers(resUsers.data);
                }
            })
            .catch((error) => {
                console.log('Erreur :', error);
            });

        // eslint-disable-next-line
    }, []);

    // fonction pour afficher le formulaire de modification d'un utilisateur
    const watchUserClick = (user) => {
        setSelectedUser(user);
        setShowFormUser(true);
    };

    const handleCreateUser = () => {
        setShowFormCreate(true);
    };

    const deleteUserClick = async (user) => {
        // affiche de popup pour confirmer la suppression
        const confirmedUser = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");

        if (confirmedUser) {
            try {
                const response = await axios.delete(`https://balades-immersives.tech/users/${user._id}`);

                if (response.status === 200) {
                    console.log('Utilisateur supprimé');
                    // Actualiser la liste des utilisateurs après suppression
                    const updatedUsers = users.filter((u) => u._id !== user._id);
                    setUsers(updatedUsers);
                } else {
                    console.log(`La suppression de l'utilisateur a échoué`);
                }
            } catch (error) {
                console.log(`Erreur lors de la suppression de l'utilisateur:`, error);
            }
        }
    };

    return (
        <div className="adminPage">
            <Link to="/admin">Retour</Link>
            < br/>
            <button onClick={() => {handleCreateUser()}}>Créer un utilisateur</button>
            {showFormCreate && <CreateUser/>}


            <table className="adminTable" id="tableauUsers">
                <caption>Utilisateurs</caption>
                <thead>
                <tr>
                    <th colSpan="1" className="tabCase tabTitle">Nom</th>
                    <th className="tabCase tabTitle">email</th>
                    <th className="tabCase tabTitle">{" "}</th>
                    <th className="tabCase tabTitle">{" "}</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map((user) => (
                        <tr key={user._id}>
                            <td className="tabCase">{user.name}</td>
                            <td className="tabCase">{user.email}</td>
                            <td>
                                <button onClick={() => watchUserClick(user)}>Modifier</button>
                            </td>
                            <td>
                                <button onClick={() => deleteUserClick(user)}>Supprimer</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            {showFormUser && <FormUser user={selectedUser}/>}
        </div>
    )
};

export default Users;