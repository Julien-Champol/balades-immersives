import {Marker, Popup} from 'react-leaflet';
import iconLocation from "../Images/location.png";
import L from 'leaflet';

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
                        <img className="imgPopup" src={batiment.URLPhoto} alt="batiment vu de devant"/><br />
                        {batiment.name}<br />
                        {/*<a href="">Entrer dans le batiment</a>*/}
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