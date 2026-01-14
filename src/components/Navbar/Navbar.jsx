import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { Contextapi } from "../../Authprovider/Authprovider";

const Navbar = () => {
  const { user, signout } = useContext(Contextapi);

  const handleLogout = () => {
    signout().catch((error) => console.log(error));
  };

  
  const navLinks = (
    <>
    <NavLink
        to="/"
        className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Home
      </NavLink>
      <NavLink
        to="/donationReq"
        className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Donation Requests
      </NavLink>
      

      {user && (
        <>
          

          <NavLink
            to="/donate"
            className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Donate
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-red shadow-sm px-4 md:px-8">
      
      <div className="navbar-start flex items-center gap-2">
       
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
            {navLinks}
          </ul>
        </div>

       
        <img
          className="h-12 hidden md:block rounded-xl"
          src="https://www.nicepng.com/png/detail/364-3647802_blood-symbol-png-blood-donation-app-logo.png"
          alt="blood donation"
        />
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          DropBlood
        </Link>
      </div>

      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
      </div>

     
      <div className="navbar-end flex items-center gap-2">
        
        {!user && (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded border border-red-900 hover:bg-gray-100 transition"
            >
              Login
            </Link>
          
            {
              user && (
                <Link
              to="/dashboard"
              className="px-4 py-2 rounded border border-red-900 hover:bg-gray-100 transition"
            >
              Dashboard
            </Link>
              )
            }
          </>
        )}

      
        {user && (
          <div className="flex items-center gap-2">
            <img
              src={user?.photoURL}
              alt="user"
              className="w-10 h-10 rounded-full border border-red-900"
            />

            <Link
              to="/dashboard"
              className="px-4 py-2 rounded border border-red-900 hover:bg-gray-100 transition"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded border border-red-900 hover:bg-gray-100 transition"
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
