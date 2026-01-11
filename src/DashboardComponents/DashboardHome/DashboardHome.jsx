import React, { useContext, useEffect, useState } from "react";
import { Contextapi } from "../../Authprovider/Authprovider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";

const DashboardHome = () => {
  const { user } = useContext(Contextapi);
  const axiosSecure = useAxiosSecure();
  const [currentUser, setCurrentUser] =useState([]);

  const fetchData = () =>{
     axiosSecure.get(`/myrequest/${user?.email}`).then((res) => {
      console.log(res.data);
      setCurrentUser(res.data)
    });

  }
  useEffect(() => {
    fetchData()
   
  }, [axiosSecure, user]);

  const handlestatus =(_id, status)=>{
    console.log(_id)
    
    axiosSecure.patch(`/update/request/status?id=${_id}&status=${status}`)
      .then(res=>{
        console.log(res.data)
        fetchData()
       
      })
  }
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Welcome Section */}
     <div className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
  {/* Left content */}
  <div>
    <h2 className="text-xl md:text-2xl font-semibold">
      Welcome, {user?.displayName}
    </h2>
    <p className="text-gray-500 text-sm">
      Manage your blood donation requests here
    </p>
  </div>

  {/* Right aligned Back button */}
  <Link
    to="/"
    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium
               rounded-lg border border-gray-300 text-gray-700
               hover:bg-gray-100 hover:border-gray-400
               transition w-fit"
  >
    ← Back
  </Link>
</div>

      {/* Recent Donation Requests */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Donation Requests</h3>

        {/* Donation Request Card */}
        {currentUser.map((u) => (
          <div
            key={u?._id}
            className="bg-white rounded-xl shadow p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {/* Recipient Info */}
            <div>
              <p className="text-sm text-gray-500">Recipient Name</p>
              <p className="font-medium">{u?.recipientName}</p>

              <p className="text-sm text-gray-500 mt-2">Location</p>
              <p className="font-medium">{u?.address}</p>
            </div>

            {/* Donation Info */}
            <div>
              <p className="text-sm text-gray-500">Donation Date and Time</p>
              <p className="font-medium">{u?.donationDateTime}</p>

              <p className="text-sm text-gray-500 mt-2">Hospital Name</p>
              <p className="font-medium">{u?.hospitalName}</p>
            </div>

            {/* Blood & Status */}
            <div>
              <p className="text-sm text-gray-500">Blood Group</p>
              <span className="inline-block mt-1 px-3 py-1 text-sm rounded-full bg-red-100 text-red-600 font-semibold">
                {u?.bloodGroup}
              </span>

              <p className="text-sm text-gray-500 mt-3">Status</p>
              <span className="inline-block px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-600">
                {u?.donor_status}
              </span>
            </div>

            {/* Donor Info (shown only in progress – UI only) */}

            
            <div className="md:col-span-2 lg:col-span-3 border-t pt-3">
              <p className="text-sm text-gray-500">Donor Information</p>
              <p className="text-sm">
                Name: <span className="font-medium">{user?.displayName}</span>
              </p>
              <p className="text-sm">
                Email: <span className="font-medium">{user?.email}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="md:col-span-2 lg:col-span-3 flex flex-wrap gap-2 justify-end">
              {
                u?.donor_status == "inprogress"
                && 
                (<>
                <button onClick={()=>handlestatus(u?._id, "Done")} className="px-3 py-1 text-sm rounded bg-green-500 text-white hover:bg-green-600">
                Done
              </button>
              <button onClick={()=>handlestatus(u?._id, "Cancel")} className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600">
                Cancel
              </button></>)
              }
             
              

              {/* CRUD Buttons */}
              <button className="px-3 py-1 text-sm rounded border border-blue-500 text-blue-500 hover:bg-blue-50">
               <Link to={`/dashboard/view/${u?._id}`}>View</Link> 
              </button>
              <button className="px-3 py-1 text-sm rounded border border-yellow-500 text-yellow-500 hover:bg-yellow-50">
               <Link to={`/dashboard/edit/${u?._id}`}>Edit</Link>
              </button>
              <button className="px-3 py-1 text-sm rounded border border-red-500 text-red-500 hover:bg-red-50">
               <Link to="/dashboard/delete">Delete</Link>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View All Requests Button */}
      <div className="text-center">
        <button className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90">
          View My All Requests
        </button>
      </div>
    </div>
  );
};

export default DashboardHome;
