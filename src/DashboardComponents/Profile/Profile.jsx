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
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      {/* Edit Button */}
      <div className="flex justify-end mb-4">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Edit
          </button>
        )}
      </div>

      <form onSubmit={onclickUpdate} className="space-y-4">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={currentUser.selectedurl}
            alt="avatar"
            className="w-24 h-24 rounded-full"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 rounded disabled:bg-gray-100"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={currentUser.email}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        {/* District */}
        <div>
          <label className="block font-medium">District</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 rounded disabled:bg-gray-100"
          >
            <option value="">Select District</option>
            {districts.map((d, index) => (
              <option key={index} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Upazila */}
        <div>
          <label className="block font-medium">Upazila</label>
          <select
            name="upazila"
            value={formData.upazila}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 rounded disabled:bg-gray-100"
          >
            <option value="">Select Upazila</option>

            {upazilas
             
              .map((u, index) => (
                <option key={index} value={u.name}>
                  {u.name}
                </option>
              ))}
          </select>
        </div>

        {/* Blood Group */}
        <div>
          <label className="block font-medium">Blood Group</label>
          <select
            name="bloodgrp"
            value={formData.bloodgrp}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 rounded disabled:bg-gray-100"
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        {/* Save Button */}
        {isEditing && (
          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded"
          >
            Save
          </button>
        )}
      </form>
    </div>
  );
};

export default Profile;
