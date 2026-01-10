import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Contextapi } from "../../Authprovider/Authprovider";

const Profile = () => {
  const { user } = useContext(Contextapi);
  const axiosSecure = useAxiosSecure();

  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    district: "",
    upazila: "",
    bloodgrp: "",
  });

  
  useEffect(() => {
    axios.get("/district.json").then((res) => {
      setDistricts(res.data.districts);
    });

    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });
  }, []);

 
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure.get(`/users/profile/${user.email}`).then((res) => {
      setCurrentUser(res.data);
    });
  }, [axiosSecure, user?.email]);

  
  useEffect(() => {
    if (currentUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: currentUser.name || "",
        district: currentUser.district || "",
        upazila: currentUser.upazila || "",
        bloodgrp: currentUser.bloodgrp || "",
      });
    }
  }, [currentUser]);

  /* ---------------- Handle Change ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ---------------- Save Profile ---------------- */
  const onclickUpdate = (e) => {
    e.preventDefault();

    axiosSecure
      .put(`/profile/update/${user.email}`, formData)
      .then((res) => {
        console.log(res)
        setIsEditing(false);
      });
  };

  if (!currentUser) return <p className="text-center">Loading...</p>;

 return (
  <div className="min-h-screen bg-gray-100 p-4 md:p-8">
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          My Profile
        </h2>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm rounded-lg bg-black text-white hover:bg-gray-800 transition"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Body */}
      <form onSubmit={onclickUpdate} className="p-6 space-y-6">
        
       
        <div className="flex flex-col items-center gap-2">
          <img
            src={currentUser.selectedurl}
            alt="avatar"
            className="w-24 h-24 md:w-28 md:h-28 rounded-full border object-cover"
          />
          <p className="text-sm text-gray-500">
            Profile Photo
          </p>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={currentUser.email}
              disabled
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>

          {/* District */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              District
            </label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100"
            >
              <option value="">Select District</option>
              {districts.map((d, i) => (
                <option key={i} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Upazila
            </label>
            <select
              name="upazila"
              value={formData.upazila}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100"
            >
              <option value="">Select Upazila</option>
              {upazilas.map((u, i) => (
                <option key={i} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Blood Group */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Blood Group
            </label>
            <select
              name="bloodgrp"
              value={formData.bloodgrp}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100"
            >
              <option value="">Select Blood Group</option>
              {["A+","A-","B+","B-","O+","O-","AB+","AB-"].map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="pt-4">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  </div>
);

};

export default Profile;
