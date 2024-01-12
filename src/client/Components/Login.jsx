import React from "react"; 
import{ useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({setIsAdmin, setToken}) => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginHandle = async(event) => {
        event.preventDefault()
        try {
        const userData = await axios.post("/auth/login", 
        {identifier,
        password}
        )
        const token = userData.data.token
        const admin = userData.data.admin

        localStorage.setItem("TOKEN", token);
        localStorage.setItem("Admin", admin);
        setToken(window.localStorage.getItem("TOKEN") || null);
        setIsAdmin(window.localStorage.getItem("Admin") || null);
        navigate("/")
        } 
        catch (error) {
            console.log(error)
        }};

    return (
        <>
    <h1>Login</h1>
    <section id="login_page">
        <form>
            <input placeholder="username or email" value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}/>
            <br />
            <input type="password" placeholder="password" value={password}
            onChange={(event) => setPassword(event.target.value)}/>
            <br />
            <button onClick={loginHandle}>Log In</button>
        </form>
    </section>
    </>
)};

export default Login