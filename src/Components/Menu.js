import {useEffect, useState} from "react";
import axios from "axios";

const Menu = () => {
    const [buildings, setBuildings] = useState({});
    const [isLoading, setIsLoading] = useState(true);

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
        <>

        </>
    )


}