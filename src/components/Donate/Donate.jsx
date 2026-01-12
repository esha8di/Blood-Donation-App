import React, { useContext } from 'react';
import useAxios from '../../Hooks/useAxios';
import { Contextapi } from '../../Authprovider/Authprovider';

const Donate = () => {
    const axiosInstance= useAxios();
    const {user} = useContext(Contextapi);

    const handlesubmit = (e) =>{
        e.preventDefault();

        const donation= Number(e.target.donation.value);
        const donationEmail = user?.email;
        const donorName = user?.displayName;

        const formData = {
            
            donationEmail,
            donation,
            donorName

            
        }

        axiosInstance.post('/create-payment-checkout',formData)
        .then(res=>{
           window.location.href = (res.data.url)
        })
    }
   return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 px-4">
    <form
      onSubmit={handlesubmit}
      className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6"
    >
      <h2 className="text-3xl font-bold text-center text-red-600">
        Support Blood Donation
      </h2>

      <p className="text-center text-gray-600 text-sm">
        Your contribution can help save lives
      </p>

      <input
        name="donation"
        type="number"
        required
        placeholder="Enter donation amount"
        className="w-full px-4 py-3 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
      />

      <button className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
        Donate Now
      </button>
    </form>
  </div>
);

};

export default Donate;