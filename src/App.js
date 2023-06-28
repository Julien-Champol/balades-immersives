import './App.css';
import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./Components/Home";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <React.StrictMode>
                    <div>test</div>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                    </Routes>
                </React.StrictMode>
            </header>
            {/*<body>*/}

            {/*</body>*/}
        </div>
    );
}

export default App;
