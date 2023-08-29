import React, { useState, useEffect, FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Routes, Route, Outlet } from 'react-router-dom';
import ManageUsersForm from './ManageUsersPage';

interface User {
    id: number;
    username: string;
    // add other user attributes as needed
}

interface DecodedToken {
    exp: number;
    [key: string]: any;
}

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminHome: FC = () => {
    const location = useLocation();

    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);

    const [accessToken, setAccessToken] = useState<string | null>(() => sessionStorage.getItem('accessToken') || location.state?.accessToken);
    const refreshToken = location.state?.refreshToken;

    const refreshAccessToken = async (refreshToken: string): Promise<string | null> => {
        try {
            const refreshResponse = await axios.post(
                `${VITE_API_BASE_URL}/users/refreshToken`,
                { refreshToken }
            );

            if (refreshResponse.status === 200) {
                return refreshResponse.data.accessToken;
            } else {
                console.error('Error refreshing access token:', refreshResponse.data);
                return null;
            }
        } catch (error: any) {
            console.error('Error refreshing access token:', error.response?.data || error.message);
            return null;
        }
    };

    const isAccessTokenExpiring = (token: string): boolean => {
        const REFRESH_TIME = 1200; // 1200 seconds (20 minutes)
        try {
            const decodedToken: DecodedToken = jwt_decode(token);
            const currentTime = Date.now() / 1000; // Convert to UNIX timestamp (seconds)
            return (decodedToken.exp - currentTime) <= REFRESH_TIME;
        } catch (error: any) {
            console.error("Error decoding the access token:", error.message);
            return false; // Treat any decoding error as an expired token
        }
    };

    const hasTokenExpired = (token: string): boolean => {
        try {
            const decodedToken: DecodedToken = jwt_decode(token);
            const currentTime = Date.now() / 1000; // Convert to UNIX timestamp (seconds)
            return decodedToken.exp <= currentTime;
        } catch (error: any) {
            console.error("Error decoding the access token:", error.message);
            return true; // Treat any decoding error as an expired token
        }
    };
    

    useEffect(() => {
        console.log("Checking token expiration...");
        if (!accessToken || hasTokenExpired(accessToken)) {
            console.log('Error: Token might be expired or invalid.');
            window.location.href = "/admin/login"; // Adjust to your route structure
        }
    }, [accessToken]);
    

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let headers: Record<string, string> = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

                let response = await fetch(`/api/admin/users?page=${page}`, { headers });

                if (response.status === 200) {
                    const data = await response.json();
                    setUsers(data.users);
                    setTotalPages(data.totalPages);

                    if (accessToken && isAccessTokenExpiring(accessToken)) {
                        const newAccessToken = await refreshAccessToken(refreshToken);
                        if (newAccessToken) {
                            headers = { Authorization: `Bearer ${newAccessToken}` };

                            response = await fetch(`/api/admin/users?page=${page}`, { headers });
                            if (response.status === 200) {
                                const retryData = await response.json();
                                setUsers(retryData.users);
                                setTotalPages(retryData.totalPages);

                                setAccessToken(newAccessToken);
                                sessionStorage.setItem('accessToken', newAccessToken);
                                console.log("NEW TOKEN", newAccessToken);
                            } else {
                                console.error('Error fetching users after token refresh:', response.statusText);
                            }
                        } else {
                            console.error('Error refreshing access token: Unable to get new access token');
                        }
                    }
                } else {
                    console.error('Error fetching users:', response.statusText);
                    // Handle error, maybe redirect to login page if token is invalid
                }
            } catch (error: any) {
                if (error.response && error.response.status === 401) {
                    console.error('Error: Token might be expired or invalid.');
                    window.location.href = "/admin/login";
                } else {
                    console.error('Error fetching users:', error.message);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [page, accessToken]);


    return (
        <div className="admin-page">

            {/* Header */}
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
                <Link to="/admin/logout">Logout</Link>
            </header>

            {/* Sidebar */}
            <nav className="admin-sidebar">
                <Link to="/admin/current">Current Admin Status</Link>
                <Link to="/adminHome/manageUsers">Manage Users</Link>
                <Link to="/adminHome/usersList">Users List</Link>
                <Link to="/admin/reports">View Reports</Link>
                <Link to="/admin/settings">Settings</Link>
                <Link to="/admin/packages">Manage Packages</Link>
                <Link to="/admin/upgrades">Manage Upgrades</Link>
            </nav>

            <div className="pagination-controls">
                <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>Previous</button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>Next</button>
            </div>

            {/* Main Content */}
            <main className="admin-content">
                <h2>Welcome [Admin Name]</h2> {/* You might replace [Admin Name] with actual admin name fetched from the API */}
                <Outlet /> {/* Child routes defined in App will be rendered here */}

                {/* Other sections like reports, settings, etc. would go here. 
             You can structure them similar to the Manage Users section. */}
            </main>
        </div>
    );
}

export default AdminHome;