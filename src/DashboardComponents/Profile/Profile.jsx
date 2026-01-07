import React, { useEffect } from 'react';

import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Profile = () => {
  const axiosSecure=useAxiosSecure()
  useEffect(()=>{
    axiosSecure.get('/users')
   .then(res=>console.log(res))
   .then(data=>console.log(data))
  })
  return (

    <div>
      hello
    </div>
  );
};

export default Profile;