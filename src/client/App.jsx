import "./App.css";
import Login from "./Components/Login.jsx";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register.jsx";
import Home from "./Components/Home.jsx";
import AllDestinations from './Components/AllDestinations.jsx'
import SingleDestination from "./Components/SingleDestination.jsx";
import Navbar from "./Components/Navbar.jsx"
import Account from "./Components/Account.jsx"
import Attractions from "./Components/Attractions.jsx";
import Wishlist from "./Components/Wishlist.jsx";
import Quiz from "./Components/Quiz.jsx";


const App = () => {
  const [isAdmin, setIsAdmin] = useState(
    window.localStorage.getItem("Admin") || null);
  const [token, setToken] = useState(
    window.localStorage.getItem("TOKEN") || null);
  const [userId, setUserId] = useState(
    window.localStorage.getItem("Id") || null);

  return (
    <>
      <Navbar token={token} isAdmin={isAdmin} />
      <h1>Home Page</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/destinations' element={<AllDestinations />} />
        <Route path='/destinations/:id' element={<SingleDestination />} /> 
        <Route path='/attractions/:id' element={<Attractions/>} /> 
        <Route path="/login" element={<Login setIsAdmin={setIsAdmin} setToken={setToken} setUserId={setUserId} userId={userId} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/account" element={<Account setToken={setToken} setIsAdmin={setIsAdmin} setUserId={setUserId} />}/>
        <Route path="/wishlist" element={<Wishlist token={token} />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </>
  );
};
export default App;