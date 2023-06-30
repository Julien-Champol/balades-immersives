import 'leaflet/dist/leaflet.css';
import React from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import Markers from "./Markers";


const Maps = (props) => {
    const batiments = props.buildings;
    const batiment = props.building;
    let position = [44.79158, -0.61149]; // Coordonnées du centre de la carte
    let mapsZoom = 13;

    if (batiment._id) {
        position = [batiment.latitude, batiment.longitude];
        mapsZoom = 45;

        return (
            <div className="maps">
                <MapContainer center={position} zoom={mapsZoom} style={{height: "90vh"}}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Markers buildings={batiments}/>
                </MapContainer>
            </div>
        )
    }

    return (
        <div className="maps">
            <MapContainer center={position} zoom={mapsZoom} style={{height: "90vh"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Markers buildings={batiments}/>
            </MapContainer>
        </div>
    )
};

export default Maps;