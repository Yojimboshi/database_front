// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import UserLogin from './pages/UserLogin';
import AdminRegister from './pages/AdminRegister';
import AdminHome from './pages/AdminHome';
import ManageUsersPage from './pages/ManageUsersPage';
import UsersList from './components/admin/UsersList';
import RegisterUser from './components/testApi/RegisterUser';
import CurrentPackage from './components/testApi/CurrentPackage';
import AppLayout from './pages/AppLayout';
import './App.css';
import CurrentUser from './pages/CurrentUser';
import GetChildInfo from './components/testApi/GetChildInfo';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<div>Select a page from above to navigate.</div>} />
                    <Route path="admin" element={<AdminLogin />} />
                    <Route path="adminRegister" element={<AdminRegister />} />
                    <Route path="user" element={<UserLogin />} />
                    {/* ... other nested routes within AppLayout */}
                </Route>
                <Route path="/adminHome/*" element={<AdminHome />}>
                    <Route index element={<div>Admin Home Dashboard</div>} />
                    <Route path="manageUsers/*" element={<ManageUsersPage />} />
                    <Route path="usersList" element={<UsersList />} />
                    {/* ... other nested routes within AdminHome */}
                </Route>
                <Route path="/user/current/*" element={<CurrentUser />}>
                    <Route index element={<div>User Dashboard</div>} />
                    <Route path="childinfo" element={<GetChildInfo />} />
                    <Route path="registerUser" element={<RegisterUser />} />
                    <Route path="currentPackage" element={<CurrentPackage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;