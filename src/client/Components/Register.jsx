import React, { useEffect, useState } from "react";
import axios from "axios";
// import { createUser } from "../../../prisma/users";

function Register( {setToken} ) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");


  console.log("username", username);
  console.log("password", password);
  console.log("email", email);
  console.log("firstname", firstName);
  console.log("lastname", lastName);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data: token } = await axios.post("/auth/register", {
        email,
        username,
        password,
        firstName,
        lastName
      })
      console.log(token.token)
      localStorage.setItem("TOKEN", token.token);
      setToken(window.localStorage.getItem("TOKEN") || null);
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div>
      <h2>Register</h2>
      <form>
        <label>Username:
          <input type="text" value={username} onChange={(e => setUsername(e.target.value))}/>
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <br />
        <button onClick={handleRegister} type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
