import React from "react";
import { Outlet } from "react-router";
import Aside from "../components/Aside/Aside";

const Dashboardlayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="hidden md:block w-60">
        <Aside />
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-6 bg-gray-50">
        {/* For mobile: show sidebar at top */}
        <div className="md:hidden mb-4">
          <Aside />
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Dashboardlayout;
