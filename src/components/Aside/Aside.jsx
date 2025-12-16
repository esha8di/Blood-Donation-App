import { NavLink } from "react-router";


const Aside = () => {
  return (
    <aside className="bg-white shadow-md p-4">
      <h2 className="text-xl font-semibold mb-6">Admin Set Product Page</h2>

      <nav className="space-y-3">
        <NavLink
          to="/dashboard/main"
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
          to="/dashboard/addproduct"
          className={({ isActive }) =>
            `block rounded-lg px-3 py-2 transition ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`
          }
        >
         Add Product
        </NavLink>
        <NavLink
          to="/dashboard/manageproduct"
          className={({ isActive }) =>
            `block rounded-lg px-3 py-2 transition ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`
          }
        >
        Manage Product
        </NavLink>
        <NavLink
          to="/dashboard/addproduct"
          className={({ isActive }) =>
            `block rounded-lg px-3 py-2 transition ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`
          }
        >
         Add Product
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `block rounded-lg px-3 py-2 transition ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`
          }
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Aside;
