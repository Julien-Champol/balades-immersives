import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import Menu from "./Components/Menu";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div>header</div>
            </header>
            <div className="menu-wrapper">
                <div className="menu">test</div>
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