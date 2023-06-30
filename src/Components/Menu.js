import axios from "axios";
import { useEffect, useState } from "react";
import Maps from "./Maps";

const Menu = () => {
    const [buildings, setBuildings] = useState([]);

    const messageErreur = 'Infos non disponibles';

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://185.212.225.152:3002/buildings'
        }).then((res) => {
            if (res.data.errors) {
                console.log(messageErreur);
            } else {
                setBuildings(res.data);
            }

        })
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <>
                {
                    buildings.map((building) => (
                        <div key={building._id}>

                            {/*<input type="checkbox" id="myCheckbox" checked={checked}/>
                        <label htmlFor="myCheckbox">{building.name}</label>*/}
                        </div>
                    ))
                }
            </>

            <Maps props={buildings} />
        </>
    )


}

export default Menu;