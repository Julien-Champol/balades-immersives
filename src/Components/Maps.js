import 'leaflet/dist/leaflet.css';
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";


const Maps = ({props}) => {
    const buildings = props;
    //console.log("my props" + props);
    const position = [44.79158, -0.61149]; // Coordonnées du centre de la carte

    return (
        <div className="maps">
            <MapContainer center={position} zoom={13} style={{height: "90vh"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/*<Markers buildings={buildings}/>*/}
            </MapContainer>
        </div>
    )
};

export default Maps;