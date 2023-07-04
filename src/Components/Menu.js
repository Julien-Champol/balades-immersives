import axios from "axios";
import {useEffect, useState} from "react";
import Maps from "./Maps";

const Menu = () => {
    const [buildings, setBuildings] = useState([]);
    const [building, setBuilding] = useState({});

    const messageErreur = 'Infos non disponibles';

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://185.212.225.152/buildings'
        }).then((res) => {
            if (res.data.errors) {
                console.log(messageErreur);
            } else {
                setBuildings(res.data);
            }
        })
        // eslint-disable-next-line
    }, []);

    const handleRadioChange = (e) => {
        if (e.target.checked) {
            let selectedBuilding = buildings.find(building => building._id === e.target.value);
            setBuilding(selectedBuilding);
        }
    };

    return (
        <>
            <>
                {
                    buildings.map((building) => (
                        <div key={building._id}>
                            <input type="radio" name="myCheckbox" id="myCheckbox" value={building._id}
                                   onChange={handleRadioChange}/>
                            <label htmlFor="myCheckbox">{building.name}</label>
                        </div>
                    ))
                }
            </>
            {{building} != null ? <Maps buildings={buildings} building={building}/> :
                <Maps buildings={buildings}/>}
        </>
    )


}

export default Menu;