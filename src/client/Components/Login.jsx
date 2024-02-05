import React from "react"; 
import{ useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({setIsAdmin, setToken, setUserId}) => {
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
        const id = userData.data.id

        localStorage.setItem("TOKEN", token);
        localStorage.setItem("Admin", admin);
        localStorage.setItem("Id", id);
        setToken(window.localStorage.getItem("TOKEN") || null);
        setIsAdmin(window.localStorage.getItem("Admin") || null);
        setUserId(window.localStorage.getItem("Id") || null)
        navigate("/")
        } 
        catch (error) {
            console.log(error)
        }};
    
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
                <h1 className="mt-5 text-center text-4xl font-bold leading-9 text-white">Sign In</h1>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-4">
                <input className="rounded-md w-2/3 leading-loose" placeholder="Username or Email" value={identifier} onChange={(event) => setIdentifier(event.target.value)}/>
                <br />
                <input className="rounded-md w-2/3 leading-loose" type="password" id="password" placeholder="Password" value={password}onChange={(event) => setPassword(event.target.value)}/>
                <br />
                <label className="text-md font-medium leading-loose text-gray-200">Show Password
                    <input type="checkbox" onClick={showPass}/>
                </label>
            </form>
                <button className="rounded-lg w-1/2 mt-10 text-center text-xl font-bold leading-normal text-black bg-white" onClick={loginHandle}>Log In</button>
        </div>
        </>
)};
export default Login;