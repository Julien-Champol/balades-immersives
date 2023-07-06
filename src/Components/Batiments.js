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

    const showBuildingOnClick = (batiment) => {
        if(batiment !== selectedBatiment) {
            setSelectedBatiment(batiment);
            setShowFormBat(true);
        } else {
            setShowFormBat(!showFormBat);
        }

    };

    const showCreateBuildingOnClick = () => {
        setShowFormCreate(!showFormCreate);
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
            <Link className="btn btn-primary mt-1" to="/admin">Retour</Link>
            < br />
            <button className="btn btn-outline-success my-1" onClick={() => { showCreateBuildingOnClick() }}>Créer un bâtiment</button>
            {showFormCreate && <CreateBuilding />}


            <table className="adminTable" id="tableauBatiments">
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
                                    <button className="btn btn-success" onClick={() => showBuildingOnClick(batiment)}>Modifier</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteBuildingOnClick(batiment)}>Supprimer</button>
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