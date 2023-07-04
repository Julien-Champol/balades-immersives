import {Marker, Popup} from 'react-leaflet';
import iconLocation from "../Images/location.png";
import L from 'leaflet';
import {useState} from "react";

import Scene360 from "../Scene360";
import {Link} from "react-router-dom";

const Markers = (props) => {

    const batiments = props.buildings;

    const iconMarker = new L.Icon({
        iconUrl: iconLocation,
        iconSize: new L.Point(30, 30),
        className: 'leaflet-div-icon'
    });

    const hideHeader = () => {
        const header = document.querySelector("#root > div > header")
        if(header) {
            header.style.display = "none"
        }
    }


    return (
        <>
            {batiments.map((batiment) => (
                <Marker
                    key={batiment._id}
                    position={[batiment.latitude, batiment.longitude]}
                    icon={iconMarker}
                >
                    <Popup>
                        <img className="imgPopup" src={batiment.URLPhoto} alt="batiment vu de devant"/><br/>
                        {batiment.name}<br/>
                        <Link to={`/scene360/${batiment._id}`}>Rentrer dans le bâtiment</Link>
                        {batiment.url.length > 0 && <a href={batiment.url} target="_blank" rel="noreferrer">
                            consulter le site
                        </a>}

                    </Popup>
                </Marker>
            ))}
        </>
    );
};

export default Markers;