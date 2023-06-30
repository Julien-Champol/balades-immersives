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

    console.log("batiment choisi " + selectedBatiment)
    return (
        <div className="adminPage">
            <h2>Espace administration</h2>
            <p>Vous êtes dans l'espace de gestion des bâtiments et photos associées.</p>

            <table>
                <caption>Bâtiments</caption>
                <thead>
                <tr>
                    <th colSpan="1">Nom</th>
                    <th>Adresse</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                </tr>
                </thead>
                <tbody>
                {
                    batiments.map((batiment) => (
                        <tr key={batiment._id}>
                            <td>{batiment.name}</td>
                            <td>{batiment.address}</td>
                            <td>{batiment.latitude}</td>
                            <td>{batiment.longitude}</td>
                            <td>
                                <button onClick={() => handleEntrerClick(batiment)}>Entrer</button>
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