import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import utils from '../Utils/utils.json';
import CreateBuilding from "./CreateBuilding";
import UpdateBuilding from "./UpdateBuilding";

const Batiments = () => {
    const [batiments, setBatiments] = useState([]);
    const [showFormBat, setShowFormBat] = useState(false);
    const [showFormCreate, setShowFormCreate] = useState(false);
    const [selectedBatiment, setSelectedBatiment] = useState(null);

    useEffect(() => {
        axios.get(utils.api.baladesImmersives.getBuildings)
            .then((res) => {
                setBatiments(res.data);
            })
    }, []);

    const watchBuildingOnClick = (batiment) => {
        setSelectedBatiment(batiment);
        setShowFormBat(true);
    };

    const createBuildingOnClick = () => {
        setShowFormCreate(true);
    };

    const deleteBuildingOnClick = async (batiment) => {
        const confirmed = window.confirm(utils.messages.confirmDeletionOfBuilding);

        if (confirmed) {
            try {
                const deleteRequest = utils.api.baladesImmersives.deleteBuilding.replace('{batimentId}', batiment._id);
                const response = await axios.delete(deleteRequest);

                if (response.status === 200) { // actualisation de la liste
                    const updatedBatiments = batiments.filter((b) => b._id !== batiment._id);
                    setBatiments(updatedBatiments);
                }
            } catch (error) {
                console.log(utils.messages.errorDeletionOfBuilding, error);
            }
        }
    };

    return (
        <div className="adminPage">
            <Link to="/admin">Retour</Link>
            < br />
            <button onClick={() => { createBuildingOnClick() }}>Créer un bâtiment</button>
            {showFormCreate && <CreateBuilding />}


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
                                    <button onClick={() => watchBuildingOnClick(batiment)}>Sélectionner</button>
                                </td>
                                <td>
                                    <button onClick={() => deleteBuildingOnClick(batiment)}>Supprimer</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {showFormBat && <UpdateBuilding batiment={selectedBatiment} />}
        </div>
    )
};

export default Batiments;