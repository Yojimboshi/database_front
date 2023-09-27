// src/components/admin/ManageUsersPage.tsx
import React, { useState,useEffect } from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import { AddUser, UserDetails, UpdateUser, BanUser } from './UserActions';
import useAdmin from '../../hooks/useAdmin';
import Modal from '../modal/Modal';
import './Admin.css';


const ManageUsersPage: React.FC = () => {
    const { users, fetchUsers, fetchUserByUsername } = useAdmin();
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [detailedUserInfo, setDetailedUserInfo] = useState<any | null>(null);

    const openAddUserModal = () => {
        setModalContent(<AddUser onClose={closeModal} />); 
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    
    const openUserDetailsModal = async (username: string) => {
        const userInfo = await fetchUserByUsername(username);
        setModalContent(<UserDetails user={userInfo} />);
        setModalOpen(true);
    };

    const handleSearch = () => {
        fetchUsers(10, 'createdAt', 'DESC', searchTerm);
    };

    return (
        <div className="manage-users-page">
            <h2>Manage Users</h2>
            <div className="admin-buttons">
                <input
                    type="text"
                    placeholder="Search by userID, username, name, role"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <button onClick={openAddUserModal}>Add User</button>
                <Link to="/adminHome/manageUsers/update"><button>Update User Info</button></Link>
                <Link to="/adminHome/manageUsers/ban"><button>Ban/Unban User</button></Link>
            </div>

            <Routes>
                {/* This route will display the table */}
                <Route path="/" element={
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>IsEmpty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>
                                            <button className="username-btn" onClick={() => openUserDetailsModal(user.username)}>
                                                {user.username}
                                            </button>
                                        </td>
                                        <td>{user.firstName} {user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>{user.accountStatus}</td>
                                        <td>{user.isEmpty ? 'true' : 'false'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                } />

                <Route path="/ban/:userId" element={<UpdateUser />} />
                <Route path="/unban/:userId" element={<BanUser />} />
            </Routes>

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                {modalContent}
            </Modal>
        </div>
    );
}

export default ManageUsersPage;