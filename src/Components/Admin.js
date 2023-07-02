import {useEffect, useState} from "react";
import axios from "axios";
import FormBatiment from "./FormBatiment";

const Admin = () => {

    const [batiments, setBatiments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedBatiment, setSelectedBatiment] = useState(null);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://185.212.225.152:3002/buildings'
        }).then((res) => {
            if (res.data.errors) {
                console.log("Infos non disponibles");
            } else {
                setBatiments(res.data);
            }
        })
        // eslint-disable-next-line
    }, []);

    const handleEntrerClick = (batiment) => {
        setSelectedBatiment(batiment);
        setShowForm(true);

    };

    const handleDeleteClick = async (batiment) => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce bâtiment ?");

        if (confirmed) {
            try {
                const response = await axios.delete(`http://185.212.225.152:3002/buildings/${batiment._id}`);

                if (response.status === 200) {
                    console.log('Bâtiment supprimé');
                    // Actualiser la liste des bâtiments après suppression
                    const updatedBatiments = batiments.filter((b) => b._id !== batiment._id);
                    setBatiments(updatedBatiments);
                } else {
                    console.log('La suppression du bâtiment a échoué');
                }
            } catch (error) {
                console.log('Erreur lors de la suppression du bâtiment:', error);
            }
        }
    };


    return (
        <div className="adminPage">
            <h2>Espace administration</h2>
            <p>Vous êtes dans l'espace de gestion des bâtiments et photos associées.</p>

            <table className="adminTable">
                <caption>Bâtiments</caption>
                <thead>
                <tr>
                    <th colSpan="1" className="tabCase tabTitle">Nom</th>
                    <th className="tabCase tabTitle">Adresse</th>
                    <th className="tabCase tabTitle">Latitude</th>
                    <th className="tabCase tabTitle">Longitude</th>
                    <th className="tabCase tabTitle">{" "}</th>
                    <th className="tabCase tabTitle">{" "}</th>
                </tr>
                </thead>
                <tbody>
                {
                    batiments.map((batiment) => (
                        <tr key={batiment._id}>
                            <td className="tabCase">{batiment.name}</td>
                            <td className="tabCase">{batiment.address}</td>
                            <td className="tabCase">{batiment.latitude}</td>
                            <td className="tabCase">{batiment.longitude}</td>
                            <td>
                                <button onClick={() => handleEntrerClick(batiment)}>Choisir</button>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteClick(batiment)}>Supprimer</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            {showForm && <FormBatiment batiment={selectedBatiment}/>}
        </div>
    )

}

export default Admin;