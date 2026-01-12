import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router";
import { Contextapi } from "../../Authprovider/Authprovider";

const Navbar = () => {
  const { user, signout } = useContext(Contextapi);
  const [active, setActive] = useState("");

  const handleclick = () => {
    setActive("logout");
    signout()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const linksBeforeLogin = (
    <>
      <NavLink
        to="/"
        className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Donation Requests
      </NavLink>
      <Link
        to="/login"
        className={`block px-3 py-2 rounded btn ${
          active === "login" ? "text-white" : ""
        }`}
        onClick={() => setActive("login")}
      >
        Login
      </Link>
      <Link
        to="/dashboard"
        className={`block px-3 py-2 rounded btn ${
          active === "dashboard" ? "text-white" : ""
        }`}
        onClick={() => setActive("dashboard")}
      >
        Dashboard
      </Link>
    </>
  );

  const linksAfterLogin = (
    <>
      <NavLink
        to="/"
        className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Donation Requests
      </NavLink>
      
      <NavLink
        to="/search"
        className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Search
      </NavLink>
      <NavLink
        to="/donate"
        className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Donate
      </NavLink>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-8">
      {/* Navbar Start */}
      <div className="navbar-start flex items-center gap-2">
        {/* Mobile Dropdown Menu */}
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            {user ? linksAfterLogin : linksBeforeLogin}
          </ul>
        </div>

        {/* Logo */}
        <img
          className="h-12 hidden md:block rounded-xl"
          src="https://www.nicepng.com/png/detail/364-3647802_blood-symbol-png-blood-donation-app-logo.png"
          alt="blood donation"
        />
        <Link className="btn btn-ghost text-xl font-bold">DropBlood</Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {user ? linksAfterLogin : linksBeforeLogin}
        </ul>
      </div>

      {/* Navbar End */}
     <div className="navbar-end flex items-center gap-2">
  {user && (
    <div className="flex items-center gap-2">
      {/* Avatar */}
      <img
        src={user?.photoURL}
        alt="user"
        className="w-10 h-10 rounded-full border border-red-900 cursor-pointer"
      />

      {/* Dashboard button */}
      <Link
        to="/dashboard"
        onClick={() => setActive("dashboard")}
        className="px-4 py-2 rounded border border-red-900 hover:bg-gray-100  transition-colors"
      >
        Dashboard
      </Link>

      {/* Logout button */}
      <button
  onClick={handleclick}
  className="px-4 py-2 rounded border border-red-900 hover:bg-gray-100 "
>
  Logout
</button>

    </div>
  )}
</div>

    </div>
  );
};

export default Navbar;
