
import "./App.css";
import Login from "./Components/Login.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register.jsx";
import Home from "./Components/Home.jsx";
import AllDestinations from './Components/AllDestinations.jsx'
import SingleDestination from "./Components/SingleDestination.jsx";
import Attractions from "./Components/Attractions.jsx";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(
    window.localStorage.getItem("Admin") || null
  );
  const [token, setToken] = useState(
    window.localStorage.getItem("TOKEN") || null
  );
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/destinations' element={<AllDestinations />} />
        <Route path='/destinations/:id' element={<SingleDestination />} /> 
        <Route path='/attractions/:id' element={<Attractions/>} /> 
        <Route
          path="/login"
          element={<Login setIsAdmin={setIsAdmin} setToken={setToken} />}
        />
        <Route path="/register" element={<Register setToken={setToken} />} />
      </Routes>
      {/* <Link to="/login">Login</Link> */}
    </main>
  );
};

export default App;