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
  const [isValidEmail, setIsValidEmail] = useState(true);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    e.preventDefault();

    // Validate email before submitting
    if (!emailRegex.test(email)) {
      setIsValidEmail(false);
      return;
    }

    // Reset validation state
    setIsValidEmail(true);

    const userId = window.localStorage.getItem("Id");
    try {
      const response = await axios.patch(`/api/users/${userId}`, {
        data: {
          username,
          firstName,
          lastName,
          email,
        },
      });
      window.alert("Account Updated");
      setUsername("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setShowUpdateForm(false);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
    <div className="md:h-full flex items-center text-gray-600">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl md:text-5xl text-gray-700 font-semibold mb-3">Profile Information</h1>
        <div className="mb-6">
          <p className="text-lg font-semibold">
            Name: {user.firstName} {user.lastName}
          </p>
          <p className="text-lg font-semibold">Email: {user.email}</p>
          <p className="text-lg font-semibold">Username: {user.username}</p>
        </div>
        <div className="mb-6">
          <p className="text-2xl font-semibold">My Interests</p>
          {interests?.map((int) => (
            <div key={int.interestId} className="mb-4">
              <h2 className="text-xl font-semibold">{int.Interest.name}</h2>
              <p className="text-base">{int.Interest.description}</p>
              <button className="text-base text-red-500" onClick={() => handleDelete(user.id, int.interestId)}>
                Remove
              </button>
            </div>
          ))}
        </div>
        <button onClick={logOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Log Out
        </button>
        <button
          onClick={() => setShowUpdateForm(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Update Profile
        </button>
        {showUpdateForm && (
          <form className="mt-4">
            <label className="block text-lg mb-2">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input-field" />
            <label className="block text-lg mb-2">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input-field"
            />
            <label className="block text-lg mb-2">Last Name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input-field" />
            <label className="block text-lg mb-2">User Email</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
            <div className="mt-4">
              <button onClick={() => setShowUpdateForm(false)} className="cancel-button">
                Cancel
              </button>
              <button onClick={updateUserHandle} className="update-button">
                Update
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};


export default Account;
