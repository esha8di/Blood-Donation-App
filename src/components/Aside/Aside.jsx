import { useContext } from "react";
import { NavLink } from "react-router";
import { Contextapi } from "../../Authprovider/Authprovider";


const Aside = () => {
  const {role}=useContext(Contextapi);
  return (
    <aside className="bg-white shadow-md p-4">
      <h2 className="text-xl font-semibold mb-6">Admin Set Product Page</h2>

      <nav className="space-y-3">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `block rounded-lg px-3 py-2 transition ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/dashboard/addrequest"
          className={({ isActive }) =>
            `block rounded-lg px-3 py-2 transition ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`
          }
        >
         Add Request
        </NavLink>
        {
          role == 'admin' &&
          (
            <NavLink
          to="/dashboard/allusers"
          className={({ isActive }) =>
            `block rounded-lg px-3 py-2 transition ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`
          }
        >
       All Users
        </NavLink>
          )
        }
       
        

        <NavLink
          to="/dashboard/myrequest"
          className={({ isActive }) =>
            `block rounded-lg px-3 py-2 transition ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`
          }
        >
         My Request
        </NavLink>
      </nav>
    </aside>
  );
};

export default Aside;
