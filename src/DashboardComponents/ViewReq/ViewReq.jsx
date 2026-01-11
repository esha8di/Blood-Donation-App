import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaUser, FaHospital, FaMapMarkerAlt, FaClock, FaTint } from 'react-icons/fa';

const ViewReq = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [requestData, setRequestData] = useState(null);

  useEffect(() => {
    if (!id) return;

    axiosSecure.get(`/myrequest/view/${id}`)
      .then(res => setRequestData(res.data))
      .catch(err => console.error(err));
  }, [axiosSecure, id]);

  if (!requestData) return <p className="text-center mt-10">Loading request data...</p>;

  const donationDate = requestData.donationDateTime ? requestData.donationDateTime.split('T')[0] : '';
  const donationTime = requestData.donationDateTime ? requestData.donationDateTime.split('T')[1]?.slice(0,5) : '';

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 md:px-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-6">
          <h2 className="text-2xl font-bold">{requestData.recipientName}'s Blood Request</h2>
          <p className="text-sm mt-1">Requested by {requestData.requesterName}</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Recipient Info */}
          <div className="flex items-center gap-3">
            <FaUser className="text-red-500 text-xl" />
            <div>
              <p className="text-gray-500 text-sm">Recipient Name</p>
              <p className="font-semibold">{requestData.recipientName}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-red-500 text-xl" />
            <div>
              <p className="text-gray-500 text-sm">Location</p>
              <p className="font-semibold">{requestData.upazila}, {requestData.district}</p>
            </div>
          </div>

          {/* Hospital */}
          <div className="flex items-center gap-3">
            <FaHospital className="text-red-500 text-xl" />
            <div>
              <p className="text-gray-500 text-sm">Hospital</p>
              <p className="font-semibold">{requestData.hospitalName}</p>
            </div>
          </div>

          {/* Blood Group */}
          <div className="flex items-center gap-3">
            <FaTint className="text-red-500 text-xl" />
            <div>
              <p className="text-gray-500 text-sm">Blood Group</p>
              <p className="font-semibold text-red-600">{requestData.bloodGroup}</p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-3">
            <FaClock className="text-red-500 text-xl" />
            <div>
              <p className="text-gray-500 text-sm">Donation Date & Time</p>
              <p className="font-semibold">{donationDate} at {donationTime}</p>
            </div>
          </div>

          {/* Address */}
          <div>
            <p className="text-gray-500 text-sm">Full Address</p>
            <p className="font-semibold">{requestData.address}</p>
          </div>

          {/* Message */}
          <div>
            <p className="text-gray-500 text-sm">Message</p>
            <p className="font-semibold">{requestData.message}</p>
          </div>

          {/* Status */}
          <div className="text-right">
            <span className={`px-4 py-1 rounded-full font-semibold 
              ${requestData.donor_status === 'Done' ? 'bg-green-100 text-green-700' :
                requestData.donor_status === 'Cancel' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'}`}>
              {requestData.donor_status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReq;
