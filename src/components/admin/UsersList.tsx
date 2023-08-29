import React, { useState } from 'react';
import useAdmin from '../../hooks/useAdmin';
import '../../pages/Admin.css';


interface User {
    id: string | number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    accountStatus: string;
}

const UsersList: React.FC = () => {
    const { fetchUsers, users, error, loading } = useAdmin();
    const [fetched, setFetched] = useState(false);

    const handleFetchClick = async () => {
        await fetchUsers();
        setFetched(true);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        const errorMessage = error.message || error.statusText || 'An error occurred';
        return <div>Error: {errorMessage}</div>;
    }

    return (
        <div>
            <h2>Users List</h2>

            {!fetched ? (
                <button onClick={handleFetchClick}>Fetch Users</button>
            ) : users.length === 0 ? (
                <p>No users found</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: User) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.accountStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default UsersList;
