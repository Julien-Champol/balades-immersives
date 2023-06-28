import React, {useEffect, useState} from "react";
import axios from "axios";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

const Home = () => {
    const [buildings, setBuildings] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const position = [46, 2]; // Coordonnées du centre de la carte


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
    }, []);

    return (
        <>
            {isLoading ? (
                <p> Loading ...</p>
            ) : (
                <div className="maps">
                    <MapContainer center={[44.7945, -0.6152]} zoom={13} style={{height: '100%', width: '100%'}}>
                        <TileLayer
                            //attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                            url="https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/%7Bz%7D/%7Bx%7D/%7By%7D@2x?access_token=pk.eyJ1IjoiZHJvcHkiLCJhIjoiY2xhOWN6eW51MGN0MjNubnZlcnp6cWNzZiJ9.YDH8e-3E2EzjBVfko__pjA"
                        />

                        {/*<Marker position={[44.7915537, -0.6162285]}>*/}
                        {/*    <Popup>*/}
                        {/*        Point d'intérêt*/}
                        {/*    </Popup>*/}
                        {/*</Marker>*/}
                    </MapContainer>
                </div>
            )}
        </>
    )
};

export default Home;