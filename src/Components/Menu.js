import axios from "axios";
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import ZoomController from "./ZoomController";
import Markers from "./Markers";

const Menu = () => {

    const [buildings, setBuildings] = useState([]);
    const [position, setPosition] = useState([44.79158, -0.61149]);

    const messageErreur = 'Infos non disponibles';

    const mapsZoom = 13;

    /**
     * Récupération de tous les bâtiments depuis l'apu
     */
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://185.212.225.152:3002/buildings'
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
     *
     * 
     * @param {*} e événement de changement de l'état du bouton radio 
     */
    const handleRadioChange = (e) => {
        if (e.target.checked) {
            let selectedBuilding = buildings.find(building => building._id === e.target.value);
            setPosition([selectedBuilding.latitude, selectedBuilding.longitude]);
        }
    };

    return (
        <>
            <>
                {
                    buildings.map((building) => (
                        <div key={building._id}>
                            <input type="radio" name="myCheckbox" id="myCheckbox" value={building._id}
                                onChange={handleRadioChange} />
                            <label htmlFor="myCheckbox">{building.name}</label>
                        </div>
                    ))
                }
            </>
            {/* {{building} != null ? <Maps buildings={buildings} building={building}/> :
                <Maps buildings={buildings}/>} */}
            <div className="maps">
                <MapContainer center={position} zoom={mapsZoom} style={{ height: "90vh" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Markers buildings={buildings} />
                    <ZoomController position={position} zoom={16} />
                </MapContainer>
            </div>
        </>
    )


}

export default Menu;