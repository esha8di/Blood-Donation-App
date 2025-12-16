import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../components/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboardlayout from "../Dashboardlayout/Dashboardlayout";
import Dashboard from "../components/Dashboard/Dashboard";
import Addproduct from "../components/Addproduct/Addproduct";
import Manageproduct from "../components/Manageproduct/Manageproduct";



const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    children:[
        {
            index:true,
            Component:Home,
        },
        {
            path:"/login",
            Component:Login,

        },
        {
            path:"/register",
            Component:Register,

        },

    ]
  },
  {
    path:'/dashboard',
    element:<Dashboardlayout></Dashboardlayout>,
    children:[
      {
        path:'main',
        Component:Dashboard,

      },
      {
        path:'addproduct',
        Component:Addproduct,

      },
      {
        path:'manageproduct',
        Component:Manageproduct,

      },

    ]
  }
]);

export default router;