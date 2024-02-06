import { useNavigate, Link } from "react-router-dom";
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
    <div className="flex flex-col items-center justify-center text-gray-200">
    <h1 className="text-4xl md:text-5xl font-semibold mt-4 mb-6">Profile Information</h1>
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <p className="text-2xl font-semibold mb-4">My Account</p>
          <div className="mb-6">
            <p className="text-lg font-base text-left">Name: {user.firstName} {user.lastName}</p>
            <p className="text-lg font-base text-left">Email: {user.email}</p>
            <p className="text-lg font-base text-left">Username: {user.username}</p>
          </div>
          <div className="flex justify-between">
            {!showUpdateForm && (
              <button onClick={() => setShowUpdateForm(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update Profile</button>
            )}
            <button onClick={logOut} className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${!showUpdateForm ? 'ml-4' : ''}`}>Log Out</button>
          </div>
          {showUpdateForm && (
            <div className="flex flex-col items-start">
          <form className="mt-4">
            <label className="block text-lg mb-2">
              Username: 
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-2 border-gray-300 px-4 py-2 w-center rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </label>
            <label className="block text-lg mb-2">
              First Name:  
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border-2 border-gray-300 px-4 py-2 w-center rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </label>
            <label className="block text-lg mb-2">
              Last Name: 
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border-2 border-gray-300 px-4 py-2 w-center rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </label>
            <label className="block text-lg mb-2">
              User Email: 
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
          </div>
        )}        
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <p className="text-2xl font-semibold mb-4">My Interests</p>
            {interests?.map((int) => (
              <div key={int.interestId} className="flex items-center mb-4 text-left" >
                <img src={int.Interest.imageURL} alt="" className="h-20 w-20 object-cover mr-4 rounded" />
                <div>
                  <Link className="font-base underline" to={`/interests/${int.interestId}`}>
                    <h2 className="text-xl font-base text-left">{int.Interest.name}</h2>
                  </Link>
                  <p className="text-base text-left">{int.Interest.description}</p>
                  <button className="text-base text-red-500" onClick={() => handleDelete(user.id, int.interestId)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
     </div>
  </div>

);

        }
export default Account;