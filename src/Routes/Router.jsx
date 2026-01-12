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
import Searchrequest from "../components/Search/Searchrequest";
import Profile from "../DashboardComponents/Profile/Profile";
import DashboardHome from "../DashboardComponents/DashboardHome/DashboardHome";
import EditReq from "../DashboardComponents/EditReq/EditReq";
import ViewReq from "../DashboardComponents/ViewReq/ViewReq";
import Blockstatus from "../DashboardComponents/Blockstatus/Blockstatus";





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
            element:<Privaterouter>
              <Donate></Donate>
            </Privaterouter>

        },
        {
            path:"/payment_success",
            Component:Paymentsuccess,

        },
        {
            path:"/search",
            Component:Searchrequest,

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
        index:true,
        // path:'dashboardhome',
        Component:DashboardHome,

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
      {
        path:'profile',
        Component:Profile,
      },
      {
        path:'edit/:id',
        Component:EditReq,
      },
      {
        path:'view/:id',
        Component:ViewReq,
      },
      {
        path:'block',
        Component:Blockstatus,
      },
     
      


    ]
  }
]);

export default router;