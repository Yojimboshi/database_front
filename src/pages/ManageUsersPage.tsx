// ManageUsersPage.tsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AddUser, UserDetails, UpdateUser, BanUser } from '../components/admin/ManageUsersForm';

const ManageUsersPage: React.FC = () => {
    console.log("Rendering ManageUsersPage");

    const users = [
        // Dummy data, replace with API call to get real data
        {
            id: 1,
            username: "john",
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            role: "member",
            accountStatus: "active"
        },
        // ... add more users as required
    ];
    return (
        <div className="manage-users-page">
            <h2>Manage Users</h2>
            <div className="admin-buttons">
                <Link to="/add"><button>Add User</button></Link>
                <Link to="/details"><button>User Details</button></Link>
                <Link to="/update"><button>Update User Info</button></Link>
                <Link to="/ban"><button>Ban/Unban User</button></Link>
            </div>

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
                    {users.map(user => (
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

            <Routes>
                <Route path="/add" element={<AddUser />} />
                <Route path="/details/:userId" element={<UserDetails />} />
                <Route path="/ban/:userId" element={<UpdateUser />} />
                <Route path="/unban/:userId" element={<BanUser />} />
              <Route path="/" element={<div></div>} />
            </Routes>
        </div>
    );
}

export default ManageUsersPage;
