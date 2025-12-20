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
       <div>
         <form onSubmit={handlesubmit} className='flex justify-center items-center min-h-screen'>
             <input 
             name='donation'
             className="search border" required placeholder="Search" type='number' />
            <button className='btn'>Donate</button>
        </form>
       </div>
    );
};

export default Donate;