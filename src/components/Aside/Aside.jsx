import { useContext} from "react";
import { NavLink } from "react-router";
import { Contextapi } from "../../Authprovider/Authprovider";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Aside = () => {
  const { role } = useContext(Contextapi);
  // const axiosSecure = useAxiosSecure();
  // const [users, setUsers]=useState([]);

//   useEffect(()=>{
//     axiosSecure.get('/users')
//   .then(data=>{
//     console.log(data);
//     setUsers(data.data);

//   })
//   .catch(err => console.log(err));

//   },[axiosSecure])
//  console.log(role)


  return (
    <aside className="bg-white border-r border-gray-300 p-4 w-60 min-h-screen">
      <h2 className="text-lg font-bold mb-6 text-gray-900">
        Dashboard ({role})
      </h2>

      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `px-3 py-2 rounded transition ${
              isActive
                ? "bg-gray-900 text-white"
                : "text-gray-800 hover:bg-gray-100"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/dashboard/addrequest"
          className={({ isActive }) =>
            `px-3 py-2 rounded transition ${
              isActive
                ? "bg-gray-900 text-white"
                : "text-gray-800 hover:bg-gray-100"
            }`
          }
        >
          Add Request
        </NavLink>

        {role == "admin" && (
          <NavLink
            to="/dashboard/allusers"
            className={({ isActive }) =>
              `px-3 py-2 rounded transition ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-800 hover:bg-gray-100"
              }`
            }
          >
            All Users
          </NavLink>
        )}

        <NavLink
          to="/dashboard/myrequest"
          className={({ isActive }) =>
            `px-3 py-2 rounded transition ${
              isActive
                ? "bg-gray-900 text-white"
                : "text-gray-800 hover:bg-gray-100"
            }`
          }
        >
          My Request
        </NavLink>

        <NavLink
        to="/dashboard/profile"
          className={({ isActive }) =>
            `px-3 py-2 rounded transition ${
              isActive
                ? "bg-gray-900 text-white"
                : "text-gray-800 hover:bg-gray-100"
            }`
          }
        >
          My Profile
        </NavLink>
      </nav>
    </aside>
  );
};

export default Aside;
