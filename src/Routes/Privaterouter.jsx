import React, { useContext } from 'react';
import { Contextapi } from '../Authprovider/Authprovider';
import { Navigate, useLocation } from 'react-router';

const Privaterouter = ({children}) => {
   const {user,loading, roleloading, userstatus}=useContext(Contextapi);
   

   const location=useLocation()
   console.log('location',location)

   if(loading || roleloading ){

    return <p>loading .........</p>
    
   }

   if(!user || !userstatus == 'active'){
   return <Navigate state={location.pathname} to='/login'></Navigate>
   }
   
    return children;
  


};

export default Privaterouter;