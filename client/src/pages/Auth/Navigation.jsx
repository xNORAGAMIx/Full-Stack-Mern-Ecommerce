import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

//icons
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
  AiOutlineLogin,
} from "react-icons/ai";

import { FaHeart } from "react-icons/fa";

//css
import "./Navigation.css";

const Navigation = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const closeSideBar = () => {
    setShowSideBar(false);
  };

  return (
    <div
      className={`${
        showSideBar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <NavLink
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome size={30} className="mr-2 mt-[3rem]" />
          <span className="hidden nav-item-name mt-[3rem]">Home</span>
        </NavLink>
        <NavLink
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping size={30} className="mr-2 mt-[3rem]" />
          <span className="hidden nav-item-name mt-[3rem]">Shop</span>
        </NavLink>
        <NavLink
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart size={30} className="mr-2 mt-[3rem]" />
          <span className="hidden nav-item-name mt-[3rem]">Cart</span>
        </NavLink>
        <NavLink
          to="/favourite"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaHeart size={30} className="mr-2 mt-[3rem]" />
          <span className="hidden nav-item-name mt-[3rem]">Favourite</span>
        </NavLink>
      </div>

      <ul>
        <li>
          <NavLink
            to="/login"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineLogin size={30} className="mr-2 mt-[3rem]" />
            <span className="hidden nav-item-name mt-[3rem]">Login</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineUserAdd size={30} className="mr-2 mt-[3rem]" />
            <span className="hidden nav-item-name mt-[3rem]">Register</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
