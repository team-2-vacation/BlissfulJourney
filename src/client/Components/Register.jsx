import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = ({ setToken, setIsAdmin, setUserId }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/register", {
        email,
        username,
        password,
        firstName,
        lastName
      });
      localStorage.setItem("TOKEN", data.token);
      localStorage.setItem("Admin", data.admin);
      localStorage.setItem("Id", data.id);
      setToken(window.localStorage.getItem("TOKEN") || null);
      setIsAdmin(window.localStorage.getItem("Admin") || null);
      setUserId(window.localStorage.getItem("Id") || null);
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  };

  const showPass = () => {
    const pass = document.getElementById('password')
    if (pass.type === "password"){
      pass.type = "text"
    }
    else {
      pass.type = "password"
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center pt-10 pb-1 lg:px-8">
        <h1 className="mt-5 text-center text-4xl font-bold leading-9 text-white">Create an Account</h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="my-10 space-y-10" onSubmit={handleRegister}>
          <label className="text-md font-medium leading-loose text-gray-200">
            Username:
            <br/>
            <input className="rounded-md w-2/3" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
          </label>
            <br/>

          <label className="text-md font-medium leading-loose text-gray-200">
            Password:
            <br/>
            <input className="rounded-md w-2/3" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </label>
          <br/>

          <label className="text-md font-medium leading-loose text-gray-200">
            Show Password
          <input type="checkbox" onClick={showPass}/>
          </label>
            <br/>

          <label className="text-md font-medium leading-loose text-gray-200">
            Email:
            <br/>
            <input className="rounded-md w-2/3" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </label>
            <br/>

          <label className="text-md font-medium leading-loose text-gray-200">
            First Name:
            <br/>
            <input className="rounded-md w-2/3" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
          </label>
            <br/>

          <label className="text-md font-medium leading-loose text-gray-200">
            Last Name:
            <br/>
            <input className="rounded-md w-2/3" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
          </label>
            <br/>

          <button className="rounded-lg w-1/2 text-center text-xl font-bold leading-normal text-black bg-white" type="submit">Create Account</button>
        </form>
      </div>
    </>
  );
};
export default Register;
