// src/pages/UserLogin.tsx

import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import './User.css';

type FormData = {
    email: string;
    password: string;
};

type ResponseData = {
    accessToken: string;
    // Add other properties that might be present in your API response
};

type AxiosError = {
    response: {
        data: any;
    };
};

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UserLogin: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });

    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response: AxiosResponse<ResponseData> = await axios.post(`${VITE_API_BASE_URL}/api/v1/users/login`,
                formData,
                {
                    withCredentials: true,
                });

            const { accessToken } = response.data;
            const refreshTokenFromCookie = Cookies.get('refreshToken');
            if (!refreshTokenFromCookie) throw new Error('Refresh token not found in cookies');

            setAccessToken(accessToken);
            setRefreshToken(refreshTokenFromCookie);

            navigate('/user/current', { state: { accessToken, refreshToken: refreshTokenFromCookie } });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error logging in user:', (error as AxiosError).response.data);
            } else {
                console.error('Other error:', error);
            }
            // Handle the error, e.g., display an error message to the user
        }

        setFormData({
            email: '',
            password: ''
        });
    };

    return (
        <div>
            <h2>User Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Login</button>
            </form>
            <div className="mt-3">
                <Link to="/">Go to Home</Link>
            </div>
        </div>
    );
};

export default UserLogin;
