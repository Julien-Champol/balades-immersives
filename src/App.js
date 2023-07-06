import React from "react";
import {Link, Route, Routes} from "react-router-dom";
import './App.css';
import Admin from "./Components/Admin";
import Batiments from "./Components/Batiments";
import Menu from "./Components/Menu";
import Users from "./Components/Users";
import Scene360 from "./Components/Scene360";
import Login from "./Components/Login"

function App() {

    const deleteCanvasAndShowHeader = () => {
        const canvasElement = document.querySelector('canvas');
        document.body.style.overflow = "auto"
        if (canvasElement) {
            // Supprimez l'élément <canvas> de votre DOM
            canvasElement.remove();
        }

        const header = document.querySelector("#root > div > header")
        if (header) {
            header.style.display = "block"
        }
    };

    return (
        <div className="App">
            <div className="menu-wrapper">
                <React.StrictMode>
                    <Routes>
                        <Route path="/" element={<>
                            <Menu/>
                        </>}/>
                        <Route path="/admin" element={<Admin/>}/>
                        <Route path="/admin/buildings" element={<Batiments/>}/>
                        <Route path="/admin/users" element={<Users/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/scene360/:batimentId" element={
                            <>
                                <div className="enteteScene360">
                                    <Link className="btn btn-primary" onClick={deleteCanvasAndShowHeader}
                                          to="/">Retour</Link>
                                    <div className="titreScene360"></div>
                                </div>
                                <Scene360/>
                            </>}/>
                    </Routes>
                </React.StrictMode>
            </div>
        </div>
    );
}

export default App;