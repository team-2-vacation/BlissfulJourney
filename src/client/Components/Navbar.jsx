import { Link } from "react-router-dom";
import logo from "../assets/blissful_journey_logo.jpeg"
import { useState } from 'react';

const Navbar = ({ token, isAdmin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav class="bg-white">
      <div class="mx-auto px-3">
        <div class="flex justify-between">
          <div class="flex space-x-4">
            <Link to="/" class="flex items-center py-4 px-2 text-gray-700 hover:text-gray-900">
              <img src={logo} alt="Blissful Journey Logo" class="h-10 w-10 mr-3 md:h-20 md:w-20" />
              <span class="hidden md:inline">Home</span>
            </Link>
            <div class="hidden md:flex items-center space-x-1">
              <Link class="py-4 px-2 text-gray-700  hover:text-gray-900 " to="/destinations">Destinations</Link>
              <Link class="py-4 px-2 text-gray-700  hover:text-gray-900" to="/interests">Browse By Interest</Link>
              <Link class="py-4 px-2 text-gray-700  hover:text-gray-900" to="/quiz">Take Our Vacation Quiz</Link>
            </div>
          </div>
          <div class="hidden md:flex items-center space-x-1 ">
            {token ? (<Link class="py-4 px-2" to="/account">Account</Link>) : (
              <Link class="py-4 px-2 text-gray-700" to="/login">Login</Link>)}
            {!token ? <Link class="py-2 px-2 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300" to="/register">Register</Link> : ""}
            {token ? (<Link class="py-4 px-2 " to="/wishlist">My Wishlist</Link>) : ""}
          </div>
        </div>
        <div class="md:hidden flex items-center">
          <button class="mobile-menu-button" onClick={toggleMenu}>
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className={`mobile-menu ${isMenuOpen ? '' : 'hidden'} md:hidden`}>
          <Link class="block py-2 px-4 text-sm hover:bg-gray-200" to="/">Home</Link>
          <Link class="block py-2 px-4 text-sm hover:bg-gray-200" to="/destinations">Destinations</Link>
          <Link class="block py-2 px-4 text-sm hover:bg-gray-200" to="/interests">Browse By Interest</Link>
          <Link class="block py-2 px-4 text-sm hover:bg-gray-200" to="/quiz">Take Our Vacation Quiz</Link>
          {token ? (<Link class="block py-2 px-4 text-sm hover:bg-gray-200" to="/account">Account</Link>) : (
            <Link class="block py-2 px-4 text-sm hover:bg-gray-200" to="/login">Login</Link>)}
          {!token ? <Link class="block py-2 px-4 text-sm  hover:bg-gray-200" to="/register">Register</Link> : ""}
          {token ? (<Link class="block py-2 px-4 text-sm hover:bg-gray-200" to="/wishlist">My Wishlist</Link>) : ""}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;