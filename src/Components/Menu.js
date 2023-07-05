import axios from "axios";
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Markers from "./Markers";
import ZoomController from "./ZoomController";

const Menu = () => {

    const positionBordeaux = [44.79158, -0.61149];
    const defaultZoom = 13;

    const [buildings, setBuildings] = useState([]);
    const [position, setPosition] = useState(positionBordeaux);
    const [zoom, setZoom] = useState(defaultZoom);

    const messageErreur = 'Infos non disponibles';

    /**
     * Récupération de tous les bâtiments depuis l'api
     */
    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://balades-immersives.tech/buildings'
        }).then((res) => {
            if (res.data.errors) {
                console.log(messageErreur);
            } else {
                setBuildings(res.data);
            }
        })
        // eslint-disable-next-line
    }, []);

    /**
     * Gestion du click sur les div des bâtiments
     * 
     * @param {*} e événement de changement de l'état du bouton radio 
     */
    const handleOnClick = (id) => {
        if (id !== null) {
            const selectedBuilding = buildings.find(building => building._id === id);
            setPosition([selectedBuilding.latitude, selectedBuilding.longitude]);
            setZoom(15);
        } else if (id === null) {
            setPosition(positionBordeaux);
            setZoom(defaultZoom);
        }
    };

    return (
        <>
            <div className="buildings-container">
                <div className="titrePage">Bienvenue sur balades immersives !</div>
                {position[0] !== positionBordeaux[0] || position[1] !== positionBordeaux[1] ? (
                    <button className="btn btn-primary" onClick={() => handleOnClick(null)}>Recentrer sur Bordeaux</button>
                ) : ('')}
                {
                    buildings.map((building) => (
                        <div className="building-card" key={building._id} onClick={() => handleOnClick(building._id)}>
                            <h2>{building.name}</h2>
                            <p>{building.address}</p>
                        </div>
                    ))
                }
            </div>
            <div className="maps">
                <MapContainer center={position} zoom={zoom} style={{ height: "90vh" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Markers buildings={buildings} />
                    <ZoomController position={position} zoom={zoom} />
                </MapContainer>
            </div>
        </>
    )
}

export default Menu;