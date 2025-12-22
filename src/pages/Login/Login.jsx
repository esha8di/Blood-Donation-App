import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate} from "react-router";
import { Contextapi } from "../../Authprovider/Authprovider";
import toast from "react-hot-toast";
// import  { Contextapi } from "../../Authprovider/Authprovider";
// import toast from "react-hot-toast";




const Login = () => {
const {signinwithemailpass,signinwithgoogle,setUser}=useContext(Contextapi)

const [email,setEmail]=useState('')
const navigate=useNavigate();

const location=useLocation(null);
console.log(location)


   const handlesubmit=(e)=>{
    e.preventDefault()

    const email=e.target.email.value;
    const password=e.target.password.value;

    // console.log('emailpass',signinwithemailpass)
    
    
if (!email || !password) {
  alert("Please enter both email and password!");
  return;
}
    

    signinwithemailpass(email,password)
    .then(result=>{
      setUser(result.user)
    //    toast('Logged in successfully')
      console.log('log',result.user)
      navigate(location.state || '/')
     
    })
    .catch(error=>{
      console.log('logineroor',error.message);
    //    toast('error')
    })
    
    

   
    
  }

  const handlegooglesignin=()=>{
    signinwithgoogle()
    .then((result)=>{
      const user=result.user;
      console.log('uer',user)
      setUser(user);
      toast('Logged in successfully hihi')
     
      navigate(location.state?.from  || '/')
      
       
      

    })
    .catch((error)=>{
      console.log(error);
       toast('error')

    })
  }

  const handleforgot=()=>{
    // console.log('email',email);

    navigate(`/forgot/${email}`)


  }




  return (
    <div className="flex flex-col justify-center items-center my-32">
      <title>Login</title>
     
        <form onSubmit={handlesubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        

        <label className="label">Email</label>
        <input onChange={(e)=>setEmail(e.target.value)} name='email' type="email" required className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input name='password' type="password" required className="input" placeholder="Password"  />

        <p>Forgot Password? <button type='button' onClick={()=>handleforgot()} className="text-red-400">Reset
          </button></p>

        <button  className="btn btn-neutral mt-4">Login</button>
        {/* <button type='button' onClick={()=>handlegooglesignin()} className="btn">Sign in with google</button> */}
        
         <p>Don't have an Account? <Link className='text-green-900' to='/register'>Register </Link></p>
      </fieldset>
    </form>

    </div>
    
  );
};

export default Login;
