
import React, { useEffect, useState, useContext } from 'react';
// import toast from 'react-hot-toast';
import useAxios from "../../Hooks/useAxios";
import { Contextapi } from '../../Authprovider/Authprovider';

const Manageproduct = () => {
    const { user } = useContext(Contextapi);
    const [products,setProducts]= useState([]);

    const axiosintance=useAxios();

    console.log(user?.email)
    useEffect(()=>{
        if (!user?.email) return;
        axiosintance.get(`/manager/products/${user?.email}`)
        .then(res => {
            setProducts(res.data)
            
        })
        .catch(err=>{
            console.log(err)
        })

    },[ user?.email])


    

    

   

    return (
        <div className="w-[95%] md:w-[90%] mx-auto my-10 overflow-x-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">My Orders</h2>
           
            <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-black text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">Product Name</th>
                        <th className="py-3 px-4 text-left">Buyer Name</th>
                        <th className="py-3 px-4 text-left">Price</th>
                        <th className="py-3 px-4 text-left">Quantity</th>
                        <th className="py-3 px-4 text-left">Address</th>
                        <th className="py-3 px-4 text-left">Phone</th>
                        <th className="py-3 px-4 text-left">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(order => (
                        <tr key={order._id} className="border-b">
                            <td className="py-2 px-4">{order?.productName}</td>
                            <td className="py-2 px-4">{order?.
description}</td>
                            <td className="py-2 px-4">{order?.price} BDT</td>
                            <td className="py-2 px-4">{order?.quantity}</td>
                         
                            <td className="py-2 px-4">{order?.selectedurl}</td>
                            <td className="py-2 px-4">{new Date(order?.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Manageproduct;
