import { Link } from "react-router-dom";
//import "../App.css"
import logo from "../assets/blissful_journey_logo.jpeg"


const Navbar = ({ token, isAdmin }) => {
  return (
    <nav
    class="flex-no-wrap relative flex w-full items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4 .sticky .top-0">
    <div class="flex w-full flex-wrap items-center justify-between px-3">
      <div>
        <img src={logo} alt="Blissful Journey Logo"/>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/destinations">Destinations</Link>
        {/* <Link to="/interests">Browse By Interest</Link>
        <Link to="/quiz">Take Our Vacation Quiz</Link>
        search bar */}
        {token ? (<Link to="/account">Account</Link>) : (
          <Link to="/login">Login</Link>)}
        {!token ? <Link to="/register">Register</Link>: ""}
      </div>
    </div>
    </nav>
  );
};

export default Navbar;
