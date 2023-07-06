import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import utils from '../Utils/utils.json';
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [showFormUser, setShowFormUser] = useState(false);
    const [showFormCreate, setShowFormCreate] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


    useEffect(() => {
        axios.get(utils.api.baladesImmersives.getUsers)
            .then((resUsers) => {
                setUsers(resUsers.data);
            })
            .catch((error) => {
                console.log(error);
            });

        // eslint-disable-next-line
    }, []);

    // fonction pour afficher le formulaire de modification d'un utilisateur
    const watchUserClick = (user) => {
        if(user !== selectedUser) {
            setSelectedUser(user);
            setShowFormUser(true);
        } else {
            setShowFormUser(!showFormUser)
        }

    };

    const handleCreateUser = () => {
        setShowFormCreate(!showFormCreate);
    };

    const deleteUserClick = async (user) => {
        // affiche de popup pour confirmer la suppression
        const confirmedUser = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");

        if (confirmedUser) {
            try {
                const deleteUserRequest = utils.api.baladesImmersives.deleteUser.replace('{userId}', user._id)
                const response = await axios.delete(deleteUserRequest);

                if (response.status === 200) {
                    const updatedUsers = users.filter((u) => u._id !== user._id);
                    setUsers(updatedUsers);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="adminPage">
            <Link className="btn btn-primary mt-1" to="/admin">Retour</Link>
            < br />
            <button className="btn btn-outline-success my-1" onClick={() => { handleCreateUser() }}>Créer un utilisateur</button>
            {showFormCreate && <CreateUser users={users}/>}


            <table className="adminTable" id="tableauUsers">
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
                                    <button className="btn btn-success" onClick={() => watchUserClick(user)}>Modifier</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteUserClick(user)}>Supprimer</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {showFormUser && <UpdateUser user={selectedUser} />}
        </div>
    )
};

export default Users;