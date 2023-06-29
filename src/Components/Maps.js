import React, {useEffect, useState} from "react";
import axios from "axios";
import {MapContainer, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import Markers from "./Markers";


const Maps = () => {
    const [buildings, setBuildings] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const position = [44.79158, -0.61149]; // Coordonnées du centre de la carte

    useEffect(() => {
        axios({
            method: 'get',
            //url: `http://185.212.225.152:3002/buildings`  // URL déployé
            url: `http://localhost:3002/buildings`          // localhost
        })
            .then((res) => {
                if (res.data.errors) {
                    console.log("infos non disponibles");
                } else {
                    setBuildings(res.data);
                    console.log(buildings);
                }
                setIsLoading(false);
            })
        // eslint-disable-next-line
    }, []);

    return (
        <div className="maps">
            {isLoading ? (
                <p> Loading ...</p>
            ) : (
                <MapContainer center={position} zoom={13} style={{height: "90vh"}}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Markers buildings={buildings}/>
                </MapContainer>
            )}
        </div>
    )
};

export default Maps;