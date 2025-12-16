import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../components/Aside/Aside';

const Dashboardlayout = () => {
    return (
        <div className="min-h-screen grid grid-cols-[30%_70%]  ">
            <Aside></Aside>
            <div className='flex justify-center'>
                   <Outlet></Outlet>

            </div>
         
        </div>
    );
};

export default Dashboardlayout;