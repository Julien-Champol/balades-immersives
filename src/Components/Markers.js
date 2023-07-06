import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { Link } from "react-router-dom";
import iconLocation from "../Images/location.png";
import zoomedIconLocation from "../Images/zoomedLocation.png";

const Markers = (props) => {

    const batiments = props.buildings;

    const zoomedBuilding = props.zoomedBuilding;

    const iconMarker = new L.Icon({
        iconUrl: iconLocation,
        iconSize: new L.Point(30, 30),
        className: 'leaflet-div-icon'
    });

    const zoomedIconMarker = new L.Icon({
        iconUrl: zoomedIconLocation,
        iconSize: new L.Point(30, 30),
        className: 'leaflet-div-icon'
    })

    return (
        <>
            {batiments.map((batiment) => (
                <Marker
                    key={batiment._id}
                    position={[batiment.latitude, batiment.longitude]}
                    icon={batiment === zoomedBuilding ? zoomedIconMarker : iconMarker}
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