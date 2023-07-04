import FormBatiment from "./FormBatiment";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Batiments = () => {
    const [batiments, setBatiments] = useState([]);
    const [showFormBat, setShowFormBat] = useState(false);
    const [selectedBatiment, setSelectedBatiment] = useState(null);

    useEffect(() => {
        // appel pour les bâtiments
        axios.get('https://balades-immersives.tech/buildings')
            .then((res) => {
                if (res.data.errors) {
                    console.log("Infos non disponibles");
                } else {
                    setBatiments(res.data);
                }
            })
    }, []);

    // fonction pour afficher le formulaire de modification du bâtiment
    const watchBuildingClick = (batiment) => {
        setSelectedBatiment(batiment);
        setShowFormBat(true);
    };

    const deleteBuildingClick = async (batiment) => {
        // affiche de popup pour confirmer la suppression
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce bâtiment ?");

        if (confirmed) {
            try {
                const response = await axios.delete(`https://balades-immersives.tech/buildings/${batiment._id}`);

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
            <Link to="/admin">Retour</Link>


            <table className="adminTable" id="tableauBatiments">
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
                                <button onClick={() => watchBuildingClick(batiment)}>Sélectionner</button>
                            </td>
                            <td>
                                <button onClick={() => deleteBuildingClick(batiment)}>Supprimer</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            {showFormBat && <FormBatiment batiment={selectedBatiment}/>}
        </div>
    )
};

export default Batiments;