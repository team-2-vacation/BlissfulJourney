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
    e.preventDefault();
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
      setInterests((prevInterests) =>
        prevInterests.filter((int) => int.interestId !== interestId)
      );
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
        <h1 className="text-4xl md:text-5xl text-gray-700 font-semibold mb-3">
          Name: {user.firstName} {user.lastName}
        </h1>
        <h1 className="text-4xl md:text-5xl text-gray-700 font-semibold mb-3">
          Email: {user.email}
        </h1>
        <h1 className="text-4xl md:text-5xl text-gray-700 font-semibold mb-3">
          Username: {user.username}
        </h1>
        <ul className="text-2xl">
          My Interests
          <div className="mb-4">
            <br />
            {interests?.map((int) => (
              <div key={int.interestId} className="mb-4">
                <h2 className="text-3xl">{int.Interest.name}</h2>
                <h3 className="text-lg">{int.Interest.description}</h3>
                <button
                  className="text-lg text-red-500"
                  onClick={() => handleDelete(user.id, int.interestId)}
                >
                  X
                </button>
                <br />
              </div>
            ))}
          </div>
        </ul>
        <button
          onClick={logOut}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Log Out
        </button>
        <br />
        <button
          onClick={() => setShowUpdateForm(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Update Profile
        </button>
        {showUpdateForm && (
          <form className="mt-4">
            <label className="block text-lg mb-2">
              Username |
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-2 border-gray-300 px-4 py-2 w-center rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </label>
            <label className="block text-lg mb-2">
              First Name |
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border-2 border-gray-300 px-4 py-2 w-center rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </label>
            <label className="block text-lg mb-2">
              Last Name |
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border-2 border-gray-300 px-4 py-2 w-center rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </label>
            <label className="block text-lg mb-2">
              User Email |
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-gray-300 px-4 py-2 w-center rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </label>
            <br />
            <button
              onClick={() => setShowUpdateForm(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <br />
            <button
              onClick={updateUserHandle}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default Account;