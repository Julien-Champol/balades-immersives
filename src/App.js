import React from "react";
import {Route, Routes} from "react-router-dom";
import './App.css';
import Menu from "./Components/Menu";
import Admin from "./Components/Admin";
import Batiments from "./Components/Batiments";
import Users from "./Components/Users";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div>header</div>
            </header>
            <div className="menu-wrapper">
                <React.StrictMode>
                    <Routes>
                        <Route path="/" element={<>
                            <div className="menu">test pour mes boutons radio</div>
                            <Menu/>
                        </>}/>
                        <Route path="/admin" element={<Admin/>}/>
                        <Route path="/admin/buildings" element={<Batiments/>}/>
                        <Route path="/admin/users" element={<Users/>}/>

                    </Routes>
                </React.StrictMode>
            </div>
        </div>
    );
}

export default App;