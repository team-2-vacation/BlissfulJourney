import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Account = ({ setToken, setIsAdmin, setUserId }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [interests, setInterests] = useState();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const logOut = () => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("Admin");
    localStorage.removeItem("Id");
    setToken(null);
    setIsAdmin(null);
    setUserId(null);
    navigate("/");
  };

  const updateUserHandle = async (e) => {
    e.preventDefault()
    const userId = window.localStorage.getItem("Id");
    try {
      const response = await axios.patch(`/api/users/${userId}`,{
        data:{
          username,
          firstName,
          lastName,
          email
        }
      })
    window.alert("Account Updated")
    setUsername("");
    setFirstName("")
    setLastName("")
    setEmail("")
    setShowUpdateForm(false)
    setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (userId, interestId) => {
    try {
      const response = await axios.delete(`/api/users_interests`, {
        data: { userId, interestId },
      });
      setInterests((prevInterests) => prevInterests.filter((int) => int.interestId !== interestId));
    } catch (e) {
      console.error(e);
    }
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
              <button className="delete-button" onClick={() => handleDelete(user.id, int.interestId)}>
                X
              </button>
              <br />
            </div>
          ))}
        </div>
      </ul>
      <button onClick={logOut}>Log Out</button>
      <br/>
      <button onClick={() => setShowUpdateForm(true)}>Update Profile</button>
          {showUpdateForm && (
              <form>
                <label>
                  Username
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label>
                  First Name
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </label>
                <label>
                  Last Name
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </label>
                <label>
                  Email
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
            <br/>
            <button onClick={() => setShowUpdateForm(false)}>Cancel</button>
            <br/>
            <button onClick={updateUserHandle}>Update</button>
              </form>
          )}
    </>
  );
};
export default Account;