import React, { useEffect } from 'react';

import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Profile = () => {
  const axiosSecure=useAxiosSecure();

  useEffect(()=>{
    axiosSecure.get('/users/profile')
  .then(res=>{
    console.log(res);
  })
  .catch(err => console.log(err))

  },[axiosSecure])
  
  
  return (

    <div>
      hello
    </div>
  );
};

export default Profile;