import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Account = ({setToken, setIsAdmin, setUserId, userId}) => {
    const navigate = useNavigate()
    const [user, setUser] = useState({})

    const logOut = () => {

        localStorage.removeItem("TOKEN");
        localStorage.removeItem("Admin");
        localStorage.removeItem("Id")
        setToken(null);
        setIsAdmin(null);
        setUserId(null);
        navigate("/");
  };
  useEffect(() => {
  const userId = (window.localStorage.getItem("Id") || null)

  const getUser = async() => {
    try {
      const data = await axios.get(`/api/users/${userId}`)
      setUser(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  getUser();
}, []);
console.log("user", user)

  return (
  <div>
      <h1>Name: {user.firstName} {user.lastName}</h1>
      <h1>Email: {user.email}</h1>
      <h1>Username: {user.username}</h1>
      <ul>My Interests</ul>
        {/* <li>{interest}</li> */}
      <h1>Vacation Wishlist: </h1>
      <button onClick={logOut}>Log Out</button>
  </div>
)};
  export default Account