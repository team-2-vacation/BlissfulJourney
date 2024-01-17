import { useNavigate } from "react-router-dom";

const Account = ({setToken, setIsAdmin}) => {
    const navigate = useNavigate()
    const logOut = () => {

        localStorage.removeItem("TOKEN");
        localStorage.removeItem("Admin");
        setToken(null);
        setIsAdmin(null);
        navigate("/");
  };

  return <button onClick={logOut}>Log Out</button>;
};
  export default Account