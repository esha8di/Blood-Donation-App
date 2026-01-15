import React, {useEffect, useState } from "react";
import { Contextapi } from "../../Authprovider/Authprovider";
import {
  FaHospital,
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaClock,
  FaTint,
} from "react-icons/fa";
import useAxios from "../../Hooks/useAxios";
import { Link } from "react-router";

const DonationReq = () => {
  const axiosIntance = useAxios();
  const [requests, setMyrequests] = useState([]);
//   const { user } = useContext(Contextapi);

  
  useEffect(() => {
   
    axiosIntance.get("/status").then((res) => {
        const remainingReq = res.data.filter(request=>request.donor_status == "pending")
      setMyrequests(remainingReq);
      console.log(remainingReq);
    });
  }, [axiosIntance]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-black">
          Blood Donation Requests (Pending)
        </h1>
        
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => (
          <div
            key={req._id}
            className="group bg-white text-black rounded-2xl p-6
            border border-gray-200 shadow-sm
            hover:shadow-lg 
            "
          >
            {/* Top Row */}
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs uppercase tracking-wide text-gray-500">
                {req.donor_status}
              </span>

              <div className="flex items-center gap-1 border border-black px-3 py-1 rounded-full">
                <FaTint className="text-sm" />
                <span className="text-lg font-bold">
                  {req.bloodGroup}
                </span>
              </div>
            </div>

            {/* Recipient */}
            <h2 className="text-xl font-semibold mb-1">
              {req.recipientName}
            </h2>

            <p className="text-gray-600 text-sm flex items-center gap-2 mb-4">
              <FaUser className="text-gray-500" />
              Requested by {req.requesterName}
            </p>

            {/* Details */}
            <div className="space-y-3 text-sm text-gray-700">
              <p className="flex items-start gap-2">
                <FaHospital className="mt-1 text-gray-500" />
                <span>
                  <span className="font-medium text-black">Hospital:</span>{" "}
                  {req.hospitalName}
                </span>
              </p>

              <p className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 text-gray-500" />
                <span>
                  {req.address}, {req.upazila}, {req.district}
                </span>
              </p>

              <p className="italic text-gray-600">
                “{req.message}”
              </p>
            </div>

            {/* Footer */}
            {/* Footer */}
<div className="mt-6 pt-4 border-t border-gray-200 space-y-2 text-xs text-gray-500">
  <p className="flex items-center gap-2">
    <FaClock />
    {new Date(req.donationDateTime).toLocaleString()}
  </p>
  <p className="flex items-center gap-2">
    <FaEnvelope />
    {req.requesterEmail}
  </p>
</div>

{/* View Button */}
<div className="mt-4 flex justify-end">
  <Link to={`/viewRequest/${req?._id}`}>
  <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-red-400 transition">
    View
  </button>
  </Link>
  
</div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationReq;
