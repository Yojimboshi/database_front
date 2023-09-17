// src/pages/CurrentUser.tsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, Route, Outlet } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import './CurrentUser.css';
import {User, Package } from '../hooks/useUsers';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const REFRESH_TIME = 5 * 60;

interface DecodedToken {
    exp: number;
    [key: string]: any;
}


const CurrentUser: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(() => sessionStorage.getItem('accessToken') || location.state?.accessToken);
    const refreshToken = location.state?.refreshToken;

    const handleLogout = () => {
        // Clear the tokens
        sessionStorage.removeItem('accessToken');
        Cookies.remove('refreshToken');
        setAccessToken(null);

        // Navigate to the homepage
        navigate('/');
    };

    
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
            navigate("/user"); 
            return;
        }

        const fetchCurrentUser = async () => {
            try {
                let headers: Record<string, string> = accessToken ? { Authorization: `${accessToken}` } : {};

                let response = await fetch(`${VITE_API_BASE_URL}/users/current`, { headers });

                if (response.status === 200) {
                    const data = await response.json();
                    setUser(data.user);
                    if (accessToken && isAccessTokenExpiring(accessToken)) {
                        const newAccessToken = await refreshAccessToken(refreshToken);
                        if (newAccessToken) {
                            headers = { Authorization: `${newAccessToken}` };
                            const response = await fetch(`${VITE_API_BASE_URL}/users/current`, { headers });
                            if (response.status === 200) {
                                const retryData = await response.json();
                                setUser(retryData.users);

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
                    console.error('Error fetching current user:', response.statusText);
                }

            } catch (error: any) {
                if (error.response && error.response.status === 401) {
                    console.error('Error: Token might be expired or invalid.');
                    navigate("/user");
                } else {
                    console.error('Error fetching current user:', error.message);
                }
            }
        };

        fetchCurrentUser();
    }, [accessToken]);

    return (
        <div className="user-page">
            {/* Header */}
            <header className="user-header">
                <h1>User Dashboard</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>

            {/* Sidebar */}
            <nav className="user-sidebar">
                <Link to="/user/current/childinfo">View Child Info</Link>
                <Link to="/user/current/registerUser">Register User</Link> {/* New link added */}
                <Link to="/user/current/currentPackage">Current Package</Link> {/* New link added */}
                {/* Add other user links here */}
            </nav>

            {/* Main Content */}
            <main className="user-content">
                <h2>Welcome {user ? user.username : 'Loading...'}</h2> {/* Use user instead of User */}
                <Outlet /> {/* Child routes defined in App will be rendered here */}
            </main>
        </div>
    );
}

export default CurrentUser;
