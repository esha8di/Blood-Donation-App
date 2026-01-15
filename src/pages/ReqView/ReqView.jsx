import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  FaUser,
  FaHospital,
  FaMapMarkerAlt,
  FaClock,
  FaTint,
} from "react-icons/fa";
import { Contextapi } from "../../Authprovider/Authprovider";
import toast from "react-hot-toast";

const ReqView = () => {
  const { id } = useParams();
  const { user } = useContext(Contextapi);
  const axiosSecure = useAxiosSecure();
  const [requestData, setRequestData] = useState(null);
  

  useEffect(() => {
    if (!id) return;
    axiosSecure
      .get(`/myrequest/view/${id}`)
      .then((res) => setRequestData(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure, id]);

  if (!requestData)
    return <p className="text-center mt-10">Loading request data...</p>;

  const donationDate = requestData.donationDateTime?.split("T")[0] || "";
  const donationTime =
    requestData.donationDateTime?.split("T")[1]?.slice(0, 5) || "";

  const openModal = () => {
  
    document.getElementById("my_modal_1").showModal();
  };

  const handledonateform = (e) =>{
    e.preventDefault()
    
    document.getElementById("my_modal_1").close();
  }

  const changeStatus = (id, newStatus)=>{
     console.log(id,newStatus)
  axiosSecure.patch(`/requests/status/${id}`,{status:newStatus})
  .then(res=>{
   
   setRequestData((prev) => ({ ...prev, donor_status: newStatus }));
  })
  }
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 md:px-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-black text-white p-6">
          <h2 className="text-xl md:text-2xl font-bold">
            {requestData.recipientName}'s Blood Request
          </h2>
          <p className="text-sm opacity-80 mt-1">
            Requested by {requestData.requesterName}
          </p>
        </div>

        <div className="p-5 md:p-6 space-y-4 text-gray-800">
          <div className="flex items-center gap-3">
            <FaUser />
            <div>
              <p className="text-sm text-gray-500">Recipient Name</p>
              <p className="font-semibold">{requestData.recipientName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold">
                {requestData.upazila}, {requestData.district}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaHospital />
            <div>
              <p className="text-sm text-gray-500">Hospital</p>
              <p className="font-semibold">{requestData.hospitalName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaTint />
            <div>
              <p className="text-sm text-gray-500">Blood Group</p>
              <p className="font-semibold">{requestData.bloodGroup}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaClock />
            <div>
              <p className="text-sm text-gray-500">Donation Date & Time</p>
              <p className="font-semibold">
                {donationDate} at {donationTime}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Full Address</p>
            <p className="font-semibold">{requestData.address}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Message</p>
            <p className="font-semibold">{requestData.message}</p>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <span className="px-4 py-1 rounded-full text-sm font-semibold border">
              {requestData.donor_status}
            </span>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Hello Donar!</h3>
                <p className="py-4">
                  Confirm Your Donation!
                </p>
                <div className="modal-action w-full space-y-4">
                  <form onSubmit={handledonateform}
                  method="dialog">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Donor Name
                      </label>
                      <input
                        type="text"
                        value={user?.displayName || ""}
                        readOnly
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Donor Email
                      </label>
                      <input
                        type="email"
                        value={user?.email || ""}
                        readOnly
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none"
                      />
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-3 sm:justify-end">
                      

                      <button
                      onClick={()=>changeStatus(requestData?._id,"inprogress")}
                        type="submit"
                        className="w-full sm:w-auto px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                      >
                        Confirm Donation
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </dialog>
            <button
              onClick={() => openModal()}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition w-full sm:w-auto"
            >
              Donate Blood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReqView;
