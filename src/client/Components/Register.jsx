import React, { useState } from "react";
import axios from "axios";

const Register = async ( {setToken} ) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
      localStorage.setItem("TOKEN", token.token);
      setToken(window.localStorage.getItem("TOKEN") || null);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
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
    </>
  );
}
export default Register;