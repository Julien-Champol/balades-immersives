import './App.css';
import React from "react";
import {Routes, Route} from "react-router-dom";
import Maps from "./Components/Maps";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div>header</div>
            </header>
            <body>
            <div className="menu">test</div>
            <React.StrictMode>
                <Routes>
                    <Route path="/" element={<Maps/>}/>
                </Routes>
            </React.StrictMode>
            </body>
        </div>
    );
}

export default App;
