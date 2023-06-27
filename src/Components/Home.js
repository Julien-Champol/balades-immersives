import React, {useEffect, useState} from "react";
import axios from "axios";

const Home = () => {
    const [buildings, setBuildings] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://185.212.225.152:3002/buildings`
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
    },[]);

    return (
        <>
            {isLoading ? (
                <p> Loading ...</p>
            ) : (
                <div>
                    <ul>
                        {buildings.map(
                            item => (
                                <li key={item.id}>{item.name}</li>
                            )
                        )}
                    </ul>
                </div>
            )}
        </>
    )
};

export default Home;