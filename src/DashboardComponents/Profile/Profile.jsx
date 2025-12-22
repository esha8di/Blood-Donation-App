import React, { useContext, useState } from "react";
import { Contextapi } from "../../Authprovider/Authprovider";
import auth from "../../firebase/firebase.init";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const { user, setUser } = useContext(Contextapi);
  const [update, setUpdate] = useState(false);

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
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-10">
      <div className="bg-green-900 py-6 text-center">
        <h2 className="text-white text-2xl font-semibold">My Profile</h2>
      </div>

      <div className="p-6 text-center">
        <div className="flex flex-col items-center">
          <img
            src={user?.photoURL}
            alt="Avatar"
            className="w-28 h-28 rounded-full border shadow-md"
          />

          <h3 className="text-xl font-bold mt-4">{user?.displayName}</h3>
          <p className="text-gray-600">{user?.email}</p>

          <button
            onClick={() => setUpdate(!update)}
            className="mt-4 px-5 py-2 bg-green-800 text-white rounded hover:bg-green-900 transition"
          >
            {update ? "Close" : "Update Profile"}
          </button>
        </div>
      </div>

      {update && (
        <div className="px-6 pb-6">
          <form onSubmit={handleupdate} className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-700">Name</label>
              <input
                name="name"
                type="text"
                defaultValue={user?.displayName}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700">Photo URL</label>
              <input
                name="photourl"
                type="text"
                defaultValue={user?.photoURL}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <button className="w-full py-2 bg-green-800 text-white rounded hover:bg-green-900 transition">
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
