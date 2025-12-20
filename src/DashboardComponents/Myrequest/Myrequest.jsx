import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Myrequest = () => {
    const axiosSecure=useAxiosSecure();
    const [myrequest,setMyrequest] = useState([])
    const [totalrequest, setTotalrequest] = useState(0)
    const [itemperpage, setItemperpage] = useState(10)
    const [currentpage, setCurrentpage] = useState(1)

    useEffect(()=>{
        axiosSecure.get(`/myrequest?page=${currentpage-1}&size=${itemperpage}`)
        .then(res=>{
           
            setMyrequest(res.data.request);
            setTotalrequest(res.data.totalRequest);

        })
    }, [axiosSecure, currentpage, itemperpage])

    const numberOfPages= Math.ceil(totalrequest/itemperpage)

    const pages= [...Array(numberOfPages).keys()].map(e => e+1)

 console.log('myrequestdata',numberOfPages ,pages)

 const onlcickpre = () =>{
  if(currentpage>1)
  setCurrentpage(currentpage-1)
 }
 const onlcicknext = () =>{
  if(currentpage<pages.length)
  setCurrentpage(currentpage+1)
 }
    
    return (
        <div>
           
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        myrequest.map((my, index) =>
             <tr>
        <th>{(currentpage*10) + (index+1)-10}</th>
        <td>{my?.requesterName}</td>
        <td>{my?.hospitalName}</td>
        <td>Blue</td>
      </tr>

        )
      }
     
     
     
    </tbody>
  </table>
</div>

<div className='flex-1 justify-center items-center'>
    <button className='btn  hover:bg-black hover:text-white'
   onClick={()=>onlcickpre()} >pre</button>
    {
        pages.map( page =>{
           return <button 
           className={`btn mr-2 ${currentpage == page ? 'bg-black text-white' : ''}`}
           onClick={()=>setCurrentpage(page)}
            >{page}</button>
        })
    }
    <button
  onClick={onlcicknext}
  className='btn  hover:bg-black hover:text-white'
>
  Next
</button>

</div>

               
        </div>
    );
};

export default Myrequest;