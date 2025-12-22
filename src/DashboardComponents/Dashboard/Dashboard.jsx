import React, { useContext } from 'react';
import { Contextapi } from '../../Authprovider/Authprovider';

const Dashboard = () => {
    const {user} = useContext(Contextapi);
    return (
        <div>
            This is dashboard{user?.displayName}
        </div>
    );
};

export default Dashboard;