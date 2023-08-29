import React from 'react';
import { useParams } from 'react-router-dom';

const UserDetails: React.FC = () => {
    const { userId } = useParams();

    // Use the `userId` to fetch user details from your backend, or any other logic.

    return (
        <div>
            <h3>User Details for User ID: {userId}</h3>
            {/* Display user details here */}
        </div>
    );
}

export default UserDetails;
