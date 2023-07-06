import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import iconLocation from "../Images/location.png";

import { Link } from "react-router-dom";

const Markers = (props) => {

    const batiments = props.buildings;

    const iconMarker = new L.Icon({
        iconUrl: iconLocation,
        iconSize: new L.Point(30, 30),
        className: 'leaflet-div-icon'
    });

    return (
        <>
            {batiments.map((batiment) => (
                <Marker
                    key={batiment._id}
                    position={[batiment.latitude, batiment.longitude]}
                    icon={iconMarker}
                >
                    <Popup>
                        <div className="popupCarte">
                            <div className="titrePopup">{batiment.name}</div>
                            <img className="imgPopup" src={batiment.URLPhoto} alt="batiment vu de devant" />

                            <Link className="btn btn-success" id="boutonRentrerBatiment" to={`/scene360/${batiment._id}`}>Rentrer dans le
                                bâtiment</Link>
                            {batiment.url.length > 0 && <a className="linkPopup" href={batiment.url} target="_blank" rel="noreferrer">
                                Consulter le site
                            </a>}
                        </div>

                    </Popup>
                </Marker>
            ))}
        </>
    );
};

export default Markers;