import React from "react";
import {Route, Routes,useNavigate} from "react-router-dom";
import './App.css';
import Menu from "./Components/Menu";
import Admin from "./Components/Admin";
import Batiments from "./Components/Batiments";
import Users from "./Components/Users";
import Login from "./Components/Login";

function App() {
    const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

    return (
        <div className="App">
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
                        <Route path= "/login" element={<Login />}/>
                    </Routes>
                </React.StrictMode>
            </div>
        </div>
    );
}

export default App;