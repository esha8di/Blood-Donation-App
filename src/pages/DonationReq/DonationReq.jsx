import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Contextapi } from '../../Authprovider/Authprovider';

const DonationReq = () => {
    const axiosSecure = useAxiosSecure();
    const [requests, setMyrequests] = useState([]);
    const {user} =useContext(Contextapi)
    useEffect(()=>{
        if (!user) return;
        axiosSecure.get('/getrequest')
        .then(res =>{
            console.log(res.data)
            setMyrequests(res.data)
        })
        
    },[axiosSecure, user])
    return (
        <div>
            this is donation request {requests.length}
        </div>
    );
};

export default DonationReq;