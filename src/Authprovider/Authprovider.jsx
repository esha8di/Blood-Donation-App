import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.init';
import axios from 'axios';
// eslint-disable-next-line react-refresh/only-export-components
export const Contextapi=createContext(null)



const Authprovider = ({children}) => {
    const googleprovider=new GoogleAuthProvider();
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const [roleloading,setRoleLoading]=useState(true);
    const [role,setRole]=useState('')
    const [userstatus, setUserstatus] = useState('')


    const registerwithemailpass=(email,password)=>{
        setLoading(false)
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const signinwithemailpass=(email,password)=>{
         setLoading(false)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const signout=()=>{
        return signOut(auth);
    }


    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            if(currentUser){
               
                setUser(currentUser)
                 setLoading(false)
                
                console.log("if", currentUser);

            }
           else{
            setUser(null)
            console.log('else',currentUser);
           }
            
        })
        return ()=> unsubscribe()

    },[])

    useEffect(()=>{
        if(!user) return;

        axios.get(`http://localhost:5173/users/role/${user.email}`)
        .then(res=>{
            setRole(res.data.role)
            setUserstatus(res.data.status)
            setLoading(false);
            setRoleLoading(false);
            // console.log(res.data.role)
        })
    },[user])

    

    const signinwithgoogle=()=>{
        setLoading(false);
        return signInWithPopup(auth,googleprovider);
    }


    const userinfo={
    name:'Esha ',
    registerwithemailpass,
    signinwithemailpass,
    setUser,
    signout,
    loading,
    setLoading,
    signinwithgoogle,
    user,
    role,
    roleloading,
    userstatus



}
    return (
        <Contextapi value={userinfo}>
            {children}
        </Contextapi>
    );
};

export default Authprovider;