import './App.css';
import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./Components/Home";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div>header</div>
            </header>
            <body>
            <div>test</div>
            <React.StrictMode>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                </Routes>
            </React.StrictMode>
            </body>
        </div>
    );
}

export default App;
