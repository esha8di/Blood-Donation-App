import React, { useContext, useEffect, useState} from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Contextapi } from '../../Authprovider/Authprovider';

const AllVarUsers = () => {
    const axiosSecure=useAxiosSecure();
    const {user,loading} =useContext(Contextapi)
    const [users,setUsers] = useState([]);


    const fetchdata = () =>{
      axiosSecure.get('/users')
        .then(res=>{
           setUsers(res.data);
        })
        .catch(err=>{
            console.log(err);
        })

    }
    useEffect(()=>{
        
        fetchdata()
    },[axiosSecure,user,loading])

    const handleStatusChange= (email, status)=>{

      axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
      .then(res=>{
        console.log(res.data)
        fetchdata()
      })

    }
    return (
      <div className="overflow-x-auto">
  <table className="min-w-full border border-gray-200">
    <thead className="">
      <tr>
        <th className="px-4 py-2 border">Avatar</th>
        <th className="px-4 py-2 border">Email</th>
        <th className="px-4 py-2 border">Name</th>
        <th className="px-4 py-2 border">Role</th>
        <th className="px-4 py-2 border">Status</th>
        <th className="px-4 py-2 border">Actions</th>
      </tr>
    </thead>

    <tbody>
      {users.map((u) => (
        <tr key={u._id} className="text-center">
          <td className="px-4 py-2 border">
            <img
              src={u?.selectedurl}
              alt="avatar"
              className="w-10 h-10 rounded-full mx-auto"
            />
          </td>

          <td className="px-4 py-2 border">{u.email}</td>
          <td className="px-4 py-2 border">{u.name}</td>
          <td className="px-4 py-2 border">{u.role}</td>

          <td className="px-4 py-2 border">
            <span
              className={`px-2 py-1 rounded text-sm ${
                u.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {u.status}
            </span>
           
          </td>

          <td className="px-4 py-2 border relative">
            {
              u?.status == 'active'? 
               <button onClick={()=>handleStatusChange(u?.email, 'blocked')} className='btn btn-error'>Block</button>
               :
               <button onClick={()=>handleStatusChange(u?.email, 'active')} className='btn '>Unblock</button>
            }
           
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>



    );
};

export default AllVarUsers;