import React, { useState } from "react";
import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { Contextapi } from "../../Authprovider/Authprovider";

const Navbar = () => {
  const { user, signout } = useContext(Contextapi);
  const [active, setActive] = useState("");

  const [isChecked, setIsChecked]= useState(true);



  const handletheme=()=>{
    setIsChecked(!isChecked);
    // console.log(isChecked);

    if(isChecked){
      document.querySelector('html').setAttribute('data-theme', 'dark')
    }
    else{
            document.querySelector('html').setAttribute('data-theme', 'light')


    }

  }

  const handleclick = () => {
    setActive("logout");

    signout()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <nav>
      <NavLink to="/" className="mr-2 ">
        Home
      </NavLink>
      <NavLink to="/services" className="mr-2 ">
       Pets & Supplies
      </NavLink>
      {user && (
        <>
          {/* <NavLink to="/profile" className="mr-2  ">
            My Profile
          </NavLink> */}
          <NavLink to="/createlist" className="mr-2 ">
           Add Listing
          </NavLink>
          <NavLink to="/myservices" className="mr-2 ">
            My Listings
          </NavLink>
          <NavLink to="/myorders" className="mr-2 ">
            My Orders
          </NavLink>
        </>
      )}
    </nav>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
       <img className="h-[50px] hidden md:block rounded-4xl" src="https://img.freepik.com/premium-vector/vector-cute-dog-logo-design-pet-paw-logo-pet-care-pet-shop_729049-88.jpg" alt="" />
        <a className="btn btn-ghost text-xl font-bold">PetPaw</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <nav className="flex md:flex justify-center items-center gap-1">
          <label className="toggle text-base-content">
            <input
             onClick={handletheme}
              type="checkbox"
              value="synthwave"
              className="theme-controller"
            />

            <svg
              aria-label="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </g>
            </svg>

            <svg
              aria-label="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </g>
            </svg>
          </label>
          {user ? (
            <div className="flex items-center gap-3">
              <img
                src={user?.photoURL}
                alt="user"
                className="w-10 h-10 rounded-full border border-green-900"
              />

              <button
                onClick={handleclick}
                className={`btn mr-2 ${
                  active === "logout" ? " text-white" : ""
                }`}
              >
                Logout{" "}
                <p className="font-semibold  hidden md:block">
                  {user.displayName}
                </p>
              </button>
               <Link
              to="/dashboard/main"
              onClick={() => setActive("dashboard")}
              className={`btn mr-2 ${
                active === "dashboard" ? " text-white" : ""
              }`}
            >
              Dasboard
            </Link>
            </div>
          ) : (
            <div>
             
            <Link
              to="/login"
              onClick={() => setActive("login")}
              className={`btn mr-2 ${
                active === "login" ? " text-white" : ""
              }`}
            >
              Login
            </Link>

            </div>
            
          )}
          {/* {!user && (
            <Link
              to="/register"
              onClick={() => setActive("register")}
              className={`btn mr-2  ${
                active === "register" ? " text-white" : ""
              }`}
            >
              Register
            </Link>
          )} */}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
