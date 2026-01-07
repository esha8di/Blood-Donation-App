import React, { useContext, useState } from "react";
import { Contextapi } from "../../Authprovider/Authprovider";
import auth from "../../firebase/firebase.init";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const { user, setUser } = useContext(Contextapi);
  
  const [isEdit, setIsEdit] = useState(false);
  console.log('user from profile', user)

  const handleupdate = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const url = e.target.photourl.value;

    console.log(name, url);
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: url,
    })
      .then(() => {
        console.log("hello", auth.currentUser);
        setUser({
          ...auth.currentUser,
          displayName: name,
          photoURL: url,
        });
      })
      .catch((error) => {
        console.log(error);
      });
     
  };

  return (
   <>
   <form onSubmit={handleupdate} className="space-y-3">
        <input
          type="text"
          name="name"
          
          className="w-full border p-2 rounded"
          placeholder="Name"
        />
        

        <input
          type="email"
          defaultValue={user?.displayName}
        
          
          className="w-full border p-2 rounded bg-gray-100"
        />

        <input
          type="text"
          name="district"
          
          className="w-full border p-2 rounded"
          placeholder="District"
        />

        <input
          type="text"
          name="upazila"
          
          className="w-full border p-2 rounded"
          placeholder="Upazila"
        />

        <select
          name="bloodGroup"
          
          className="w-full border p-2 rounded"
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        {isEdit && (
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Save Changes
          </button>
        )}
      </form>
   </>
  );
};

export default Profile;
