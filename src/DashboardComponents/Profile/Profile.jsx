import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useContext } from 'react';
import { Contextapi } from '../../Authprovider/Authprovider';

const Profile = () => {
  const {user} = useContext(Contextapi);
   const axiosSecure = useAxiosSecure();
   const [currentUser, setCurrentUser] = useState([])
   const [isEditing, setIsEditing] = useState(false)

    useEffect(()=>{
      axiosSecure.get(`/users/profile/${user?.email}`)
      .then(data=>{
        console.log(data.data)
        setCurrentUser(data.data)
      })
      
    },[axiosSecure, user?.email])

    const onclickUpdate = (e)=>{
      e.preventDefault();

      setIsEditing(false);

      
    }
  return (
   
    <div>
     <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      
      {/* Top Edit Button */}
      <div className="flex justify-end mb-4">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Edit
          </button>
        )}
      </div>

      <form onSubmit={onclickUpdate} className="space-y-4">

        {/* Avatar */}
        <div className="flex justify-center">
          <img
             src={currentUser?.selectedurl}
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
            value={currentUser?.name}
            // onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 rounded disabled:bg-gray-100"
          />
        </div>

        {/* Email (always disabled) */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={currentUser?.email}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        {/* District */}
        <div>
          <label className="block font-medium">District</label>
          <input
            type="text"
            name="district"
            value={currentUser?.district}
            // onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 rounded disabled:bg-gray-100"
          />
        </div>

        {/* Upazila */}
        <div>
          <label className="block font-medium">Upazila</label>
          <input
            type="text"
            name="upazila"
            value={currentUser?.upazila}
            // onChange={handleChange}
            disabled={!isEditing}
            className="w-full border p-2 rounded disabled:bg-gray-100"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="block font-medium">Blood Group</label>
          <select
            name="bloodGroup"
            value={currentUser?.bloodgrp}
            // onChange={handleChange}
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
            className="w-full py-2 bg-green-600 text-white rounded"
          >
            Save
          </button>
        )}
      </form>
    </div>
    </div>
  );
};

export default Profile;