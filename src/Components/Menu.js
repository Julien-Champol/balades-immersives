import axios from "axios";
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import utils from '../Utils/utils.json';
import Markers from "./Markers";
import ZoomController from "./ZoomController";

const Menu = () => {

    const positionBordeaux = [44.79158, -0.61149];
    const defaultZoom = 13;
    
    const [searchValue] = useState();
    const [buildings, setBuildings] = useState([]);
    const [zoomedBuilding, setZoomedBuilding] = useState({});
    const [position, setPosition] = useState(positionBordeaux);
    const [zoom, setZoom] = useState(defaultZoom);

    const increasedZoom = 17;

    useEffect(() => {
        axios({
            method: 'get', url: utils.api.baladesImmersives.getBuildings // Récupération de tous les bâtiments depuis l'api
        }).then((res) => {
            setBuildings(res.data);
        })
        // eslint-disable-next-line
    }, []);

    const handleOnClick = (id) => {
        if (id !== null) {
            const selectedBuilding = buildings.find(building => building._id === id);
            setPosition([selectedBuilding.latitude, selectedBuilding.longitude]);
            setZoomedBuilding(selectedBuilding);
            setZoom(increasedZoom);
        } else if (id === null) {
            setPosition(positionBordeaux);
            setZoom(defaultZoom);
            setZoomedBuilding({});
        }
    };

    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase()
        const regex = new RegExp(searchValue, 'i');
        const batiments = document.querySelectorAll(".building-card")
        batiments.forEach((batiment) => {
            const data = batiment.getAttribute('data-batiment').toLowerCase()
            if (regex.test(data)) {
                batiment.style.display = 'block';
            } else {
                batiment.style.display = "none"
            }
        })
    }

    return (
        <>
            <div className="buildings-container">
                <div className="titrePage">Bienvenue sur balades immersives !</div>
                <div><Link className="btn btn-primary mb-1" to="/login">Se connecter</Link></div>
                <label htmlFor="inputRechercheBatiment">Rechercher un bâtiment :</label>
                <input type="search" value={searchValue} onChange={handleSearch} className="form-control"
                    id="inputRechercheBatiment"></input>
                {position[0] !== positionBordeaux[0] || position[1] !== positionBordeaux[1] ? (
                    <button className="btn btn-primary" onClick={() => handleOnClick(null)}>Recentrer sur
                        Bordeaux</button>
                ) : ('')}
                <div className="list-buildings">
                    {
                        buildings.map((building) => (
                            <div className="building-card" data-batiment={building.name + " " + building.address}
                                key={building._id} onClick={() => handleOnClick(building._id)}>
                                <h2>{building.name}</h2>
                                <p>{building.address}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="maps">
                <MapContainer center={position} zoom={zoom} style={{ height: "90vh" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Markers buildings={buildings} zoomedBuilding={zoomedBuilding} />
                    <ZoomController position={position} zoom={zoom} />
                </MapContainer>
            </div>
        </>)
}

export default Menu;