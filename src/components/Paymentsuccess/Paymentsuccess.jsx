import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxios from '../../Hooks/useAxios';

const Paymentsuccess = () => {

    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');

    const axiosInstance = useAxios();

    useEffect(()=>{
        axiosInstance.post(`/success_payment?session_id=${sessionId}`)
        .then(res => {

            console.log(res.data)
        })

    },[axiosInstance, sessionId])
    return (
        <div>
            payment success
        </div>
    );
};

export default Paymentsuccess;