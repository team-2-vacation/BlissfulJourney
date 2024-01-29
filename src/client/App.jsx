import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Account from "./Components/Account.jsx"
import AllAttractions from "./Components/AllAttractions.jsx";
import AllDestinations from './Components/AllDestinations.jsx'
import SingleDestination from "./Components/SingleDestination.jsx";
import AllInterests from './Components/AllInterests.jsx'
import SingleInterest from "./Components/SingleInterest.jsx";
import Home from "./Components/Home.jsx";
import Login from "./Components/Login.jsx";
import Quiz from "./Components/Quiz.jsx";
import Navbar from "./Components/Navbar.jsx"
import Register from "./Components/Register.jsx";
import Wishlist from "./Components/Wishlist.jsx";


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
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/account' element={<Account setToken={setToken} setIsAdmin={setIsAdmin} setUserId={setUserId} />}/>
        <Route path='/attractions' element={<AllAttractions/>} />
        <Route path='/attractions/:id' element={<SingleAttraction/>} />  
        <Route path='/destinations' element={<AllDestinations />} />
        <Route path='/destinations/:id' element={<SingleDestination />} /> 
        <Route path='/interests' element={<AllInterests />} />
        <Route path='/interests/:id' element={<SingleInterest />} /> 
        <Route path='/login' element={<Login setIsAdmin={setIsAdmin} setToken={setToken} setUserId={setUserId} userId={userId} />} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/register' element={<Register setToken={setToken} />} />
        <Route path='/wishlist' element={<Wishlist token={token} />} />
      </Routes>
    </>
  );
};
export default App;