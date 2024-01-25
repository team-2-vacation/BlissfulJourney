import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Account = ({ setToken, setIsAdmin, setUserId }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [interests, setInterests] = useState();

  const logOut = () => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("Admin");
    localStorage.removeItem("Id");
    setToken(null);
    setIsAdmin(null);
    setUserId(null);
    navigate("/");
  };
  useEffect(() => {
    const userId = window.localStorage.getItem("Id") || null;
    const getUser = async () => {
      try {
        const data = await axios.get(`/api/users/${userId}`);
        setUser(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getInterests = async () => {
      try {
        const interestData = await axios.get(`/api/users_interests/${userId}`);
        setInterests(interestData.data);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
    getInterests();
  }, []);

  return (
    <>
      <h1>
        Name: {user.firstName} {user.lastName}
      </h1>
      <h1>Email: {user.email}</h1>
      <h1>Username: {user.username}</h1>
      <ul>
        My Interests
        <div>
          <br />
          {interests?.map((int) => (
            <div key={int.interestId}>
              <h2>{int.Interest.name}</h2>
              <h3>{int.Interest.description}</h3>
              <br />
            </div>
          ))}
        </div>
      </ul>
      <h1>Vacation Wishlist: </h1>
      <button onClick={logOut}>Log Out</button>
    </>
  );
};
export default Account;