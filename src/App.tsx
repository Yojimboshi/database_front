import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React from 'react';
import AdminLogin from './pages/AdminLogin';
import UserLogin from './pages/UserLogin';
import AdminRegister from './pages/AdminRegister';
import AdminHome from './pages/AdminHome';
import ManageUsersPage from './pages/ManageUsersPage';
import UsersList from './components/admin/UsersList';

import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-navigation">
        <Link to="/admin" className="app-link">Admin</Link>
        <Link to="/user" className="app-link">User</Link>
      </div>
      <Routes>
    <Route path="/admin" element={<AdminLogin />} />
    <Route path="/adminHome/*" element={<AdminHome />}>
        <Route path="manageUsers/*" element={<ManageUsersPage />} />
        <Route path="usersList" element={<UsersList />} />
        {/* Add other nested routes for AdminHome here */}
    </Route>
    <Route path="/adminRegister" element={<AdminRegister />} />
    <Route path="/user" element={<UserLogin />} />
    <Route path="*" element={<div>Select a page from above to navigate.</div>} />
</Routes>


    </Router>
  );
}

export default App;
