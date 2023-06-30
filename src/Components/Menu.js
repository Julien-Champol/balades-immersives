import {useEffect, useState} from "react";
import axios from "axios";
import Maps from "./Maps";

const Menu = () => {
    const [buildings, setBuildings] = useState({});
    const [checked, setChecked] = useState(false);
    console.log("test 1")
    useEffect(() => {
        console.log("test 2")
        axios({
            method: 'get',
            url: `http://185.212.225.152:3002/buildings`  // URL déployé
            //url: `http://localhost:3002/buildings`      // localhost
        }).then((res) => {
            console.log(res)
            if (res.data.errors) {
                console.log("infos non disponibles");
            } else {
                setBuildings(res.data);
                console.log("then: " + res);
            }

        })
        // eslint-disable-next-line
    }, []);
    console.log("menu: " + buildings);

    return (
        <>
            <>
                {
                    buildings.map((building) => (
                        <div key={building.id}>

                            {/*<input type="checkbox" id="myCheckbox" checked={checked}/>
                        <label htmlFor="myCheckbox">{building.name}</label>*/}
                        </div>
                    ))
                }
            </>

            <Maps props={buildings}/>
        </>
    )


}

export default Menu;