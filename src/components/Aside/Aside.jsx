import { useContext, useState } from "react";
import { NavLink } from "react-router";
import { Contextapi } from "../../Authprovider/Authprovider";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Aside = () => {
 
  const { role } = useContext(Contextapi);
  const [open, setOpen] = useState(false);
  console.log(role)
console.log("ASIDE COMPONENT LOADED");

  

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md transition font-medium
     ${
       isActive
         ? "bg-gray-900 text-white"
         : "text-gray-700 hover:bg-gray-100"
     }`;

  return (
    <>
     
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h2 className="text-lg font-bold">Dashboard</h2>

        <button
          onClick={() => setOpen(!open)}
          className="px-3 py-1 border rounded-md text-sm"
        >
          Menu
        </button>
      </div>

     
      {open && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 space-y-2">
          <NavLink to="/dashboard" end className={linkClass} onClick={() => setOpen(false)}>
            Home 
          </NavLink>
           
               <NavLink to="/dashboard/addrequest" className={linkClass} onClick={() => setOpen(false)}>
            Add Request
          </NavLink>

            
         

          {role === "admin" && (
            
            <>
            <NavLink to="/dashboard/allusers" className={linkClass} onClick={() => setOpen(false)}>
              All Users
            </NavLink>
            <NavLink to="/dashboard/allrequests" className={linkClass} onClick={() => setOpen(false)}>
              All Requests
            </NavLink>
            </>
            
           
          )}


          {
            role!== "admin" && 
            (
               <NavLink to="/dashboard/myrequest" className={linkClass} onClick={() => setOpen(false)}>
            My Requests
          </NavLink>

            )
          }
         
         

          <NavLink to="/dashboard/profile" className={linkClass} onClick={() => setOpen(false)}>
            My Profile
          </NavLink>
        </div>
      )}

     
      <aside className="hidden md:block bg-white border-r border-gray-200 w-64 min-h-screen p-5">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-500 capitalize">{role}</p>
        </div>

        <nav className="flex flex-col space-y-2">
          <NavLink to="/dashboard" end className={linkClass}>
            Home
          </NavLink>



          
          <NavLink to="/dashboard/addrequest" className={linkClass}>
            Add Request
          </NavLink>

          {role === "admin" && (
            <>
            <NavLink to="/dashboard/allusers" className={linkClass}>
              All Users
            </NavLink>
            <NavLink to="/dashboard/allrequests" className={linkClass}>
             All Requests
            </NavLink>
            </>
          )}

          {
            role!== "admin" && (
              <NavLink to="/dashboard/myrequest" className={linkClass}>
            My Requests
          </NavLink>

            )
          }
          

          <NavLink to="/dashboard/profile" className={linkClass}>
            My Profile
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Aside;
