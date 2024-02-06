import { Link } from "react-router-dom";
import logo from '../assets/blissful_journey_logo.png';
import { useState } from 'react';

const Navbar = ({ token, isAdmin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav className="bg-white">
      <div className="container mx-auto px-3">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <Link to="/" className="flex items-center py-4 px-2 text-gray-700 hover:text-gray-900">
              <img src={logo} alt="Blissful Journey Logo" className="h-10 w-10 mr-3 md:h-20 md:w-20" />
              <span className="hidden md:inline">Home</span>
            </Link>
            <div className="hidden md:flex items-center space-x-1">
              <Link className="py-4 px-2 text-gray-700  hover:text-gray-900 " to="/destinations">Destinations</Link>
              <Link className="py-4 px-2 text-gray-700  hover:text-gray-900 " to="/attractions">Attractions</Link>
              <Link className="py-4 px-2 text-gray-700  hover:text-gray-900" to="/interests">Browse By Interest</Link>
              <Link className="py-4 px-2 text-gray-700  hover:text-gray-900" to="/quiz">Take Our Vacation Quiz</Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1 ">
            {isAdmin === "true" ? (<Link className="py-4 px-2 text-gray-700  hover:text-gray-900" to="/users">Users</Link>) : ""}
            {token ? (<Link className="py-4 px-2 text-gray-700  hover:text-gray-900" to="/account">Account</Link>) : (
              <Link className="py-4 px-2 text-gray-700  hover:text-gray-900" to="/login">Login</Link>)}
            {!token ? <Link className="py-2 px-2 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300" to="/register">Register</Link> : ""}
            {token ? (<Link className="py-4 px-2  text-gray-700  hover:text-gray-900" to="/wishlist">My Wishlist</Link>) : ""}
          </div>
        </div>
        <div className="md:hidden flex items-center">
          <button className="mobile-menu-button" onClick={toggleMenu}>
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className={`mobile-menu ${isMenuOpen ? '' : 'hidden'} md:hidden`}>
          <Link className="block py-2 px-4 text-sm hover:bg-gray-200" to="/">Home</Link>
          <Link className="block py-2 px-4 text-sm hover:bg-gray-200" to="/destinations">Destinations</Link>
          <Link className="block py-2 px-4 text-sm hover:bg-gray-200" to="/interests">Browse By Interest</Link>
          <Link className="block py-2 px-4 text-sm hover:bg-gray-200" to="/quiz">Take Our Vacation Quiz</Link>
          {isAdmin === "true" ? (<Link className="block py-2 px-4 text-sm hover:bg-gray-200" to="/users">Users</Link>) : ""}
          {token ? (<Link className="block py-2 px-4 text-sm hover:bg-gray-200" to="/account">Account</Link>) : (
            <Link className="block py-2 px-4 text-sm hover:bg-gray-200" to="/login">Login</Link>)}
          {!token ? <Link className="block py-2 px-4 text-sm  hover:bg-gray-200" to="/register">Register</Link> : ""}
          {token ? (<Link className="block py-2 px-4 text-sm hover:bg-gray-200" to="/wishlist">My Wishlist</Link>) : ""}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;