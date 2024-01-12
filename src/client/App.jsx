import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(
    window.localStorage.getItem("Admin") || null
  );
  const [token, setToken] = useState(
    window.localStorage.getItem("TOKEN") || null
  );
  return (
    <main>
      <h1>Home Page</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setIsAdmin={setIsAdmin} setToken={setToken} />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Link to="/login">Login</Link>
    </main>
  );
};

export default App;
