import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../components/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboardlayout from "../Dashboardlayout/Dashboardlayout";

import Addrequest from "../DashboardComponents/Addrequest/Addrequest";
import Dashboard from "../DashboardComponents/Dashboard/Dashboard";
import Allusers from "../DashboardComponents/Allusers/Allusers";
import Privaterouter from "./Privaterouter";
import Myrequest from "../DashboardComponents/Myrequest/Myrequest";
import Donate from "../components/Donate/Donate";
import Paymentsuccess from "../components/Paymentsuccess/Paymentsuccess";




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
        {
            path:"/donate",
            Component:Donate,

        },
        {
            path:"/payment_success",
            Component:Paymentsuccess,

        },

    ]
  },
  {
    path:'/dashboard',
    element:<Privaterouter>
      <Dashboardlayout></Dashboardlayout>
    </Privaterouter>,
    children:[
      {
        path:'/dashboard',
        Component:Dashboard,

      },
     
      {
        path:'addrequest',
        Component:Addrequest,
      },
      
      {
        path:'allusers',
        Component:Allusers,
      },
      {
        path:'myrequest',
        Component:Myrequest,
      },


    ]
  }
]);

export default router;