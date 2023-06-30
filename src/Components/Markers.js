import {Marker, Popup} from 'react-leaflet';
import iconLocation from "../images/location.png";
import L from 'leaflet';

const Markers = ({buildings}) => {

    const iconMarker = new L.Icon({
        iconUrl: iconLocation,
        iconSize: new L.Point(30, 30),
        className: 'leaflet-div-icon'
    });


    return (
        <>
            {buildings.map((building) => (
                <Marker
                    key={building.id}
                    position={[building.latitude, building.longitude]}
                    icon={iconMarker}
                >
                    <Popup>
                        <img className="imgPopup" src={building.URLPhoto} alt="batiment vu de devant"/><br />
                        {building.name}<br />
                        {/*<a href="">Entrercdans le batiment</a>*/}
                        {building.url.length > 0 && <a href={building.url} target="_blank" rel="noreferrer">
                            consulter le site
                        </a>}

                    </Popup>
                </Marker>
            ))}
        </>
    );
};

export default Markers;