// src/pages/AdminHome.tsx
import React, { useState, useEffect, FC } from 'react';
import { useLocation, useNavigate,Link ,Outlet} from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

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
const REFRESH_TIME = 2 * 60 ; // 20 minutes

const AdminHome: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);

    const [accessToken, setAccessToken] = useState<string | null>(() => sessionStorage.getItem('accessToken') || location.state?.accessToken);
    const refreshToken = Cookies.get('refreshToken') || '';


    const handleLogout = () => {
        // Clear the tokens
        sessionStorage.removeItem('accessToken');
        Cookies.remove('refreshToken');
        setAccessToken(null);
        // Navigate to the homepage
        navigate('/');
    };

    const refreshAccessToken = async (): Promise<string | null> => {
        try {
            const refreshResponse = await axios.post(
                `${VITE_API_BASE_URL}/admin/refreshToken`,
                {},
                {
                    headers: {
                        Authorization: `${accessToken}`
                    },
                    withCredentials: true,
                }
            );

            if (refreshResponse.status === 200) {
                return refreshResponse.data.accessToken;
            }
        } catch (error: any) {
            console.error('Error refreshing access token:', error.response?.data || error.message);
        }
        return null;
    };

    const isAccessTokenExpiring = (token: string): boolean => {
        const decodedToken: DecodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000; // Convert to UNIX timestamp (seconds)
        return (decodedToken.exp - currentTime) <= REFRESH_TIME;
    };

    const hasTokenExpired = (token: string): boolean => {
        const decodedToken: DecodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp <= currentTime;
    };
    
    useEffect(() => {
        if (!accessToken || hasTokenExpired(accessToken)) {
            console.log('Error: Token might be expired or invalid.');
            navigate('/');
        }
    }, [accessToken]);
    

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let currentToken = accessToken;

                if (currentToken && isAccessTokenExpiring(currentToken)) {
                    const newAccessToken = await refreshAccessToken();
                    if (newAccessToken) {
                        sessionStorage.setItem('accessToken', newAccessToken);
                        console.log("NEW TOKEN", newAccessToken);
                        setAccessToken(newAccessToken);
                        currentToken = newAccessToken;
                    } else {
                        console.error('Error refreshing access token: Unable to get new access token');
                    }
                }

                if (currentToken) {
                    const response = await fetch(`${VITE_API_BASE_URL}/admin/users?page=${page}`, {
                        headers: { Authorization: `${currentToken}` }
                    });
                    
                    if (response.status === 200) {
                        const data = await response.json();
                        setUsers(data.users);
                    } else {
                        console.error('Error fetching users:', response.statusText);
                    }
                }
            } catch (error: any) {
                if (error.response && error.response.status === 401) {
                    console.error('Error: Token might be expired or invalid.');
                    window.location.href = "/admin/login";
                } else {
                    console.error('Error fetching users:', error.message);
                }
            }
        };

        fetchUsers();
    }, [page, accessToken]);

    return (
        <div className="admin-page">

            {/* Header */}
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
                <button onClick={handleLogout}>Logout</button> {/* Replaced Link with a button */}
            </header>

            {/* Sidebar */}
            <nav className="admin-sidebar">
                <Link to="/admin/current">Current Admin Status</Link>
                <Link to="/adminHome/manageUsers">Manage Users</Link>
                <Link to="/adminHome/usersList">Users List</Link>
                <Link to="/adminHome/reports">View Reports</Link>
                <Link to="/adminHome/settings">Settings</Link>
                <Link to="/adminHome/packages">Manage Packages</Link>
                <Link to="/adminHome/upgrades">Manage Upgrades</Link>
                <Link to="/adminHome/announcement-tester">Announce Test</Link>
                <Link to="/adminHome/virtual-pool">Virtual Pool</Link>

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

            </main>
        </div>
    );
}

export default AdminHome;