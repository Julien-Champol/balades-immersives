import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import Menu from "./Components/Menu";

function App() {
    return (
        <div className="App">   
            <div className="menu-wrapper">
                <React.StrictMode>
                    <Routes>
                        <Route path="/" element={<Menu />} />
                    </Routes>
                </React.StrictMode>
            </div>
        </div>
    );
}

export default App;