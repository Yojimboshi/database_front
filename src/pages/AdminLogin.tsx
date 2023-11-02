// src/pages/AdminLogin.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import './Admin.css';

type FormData = {
    email: string;
    password: string;
}
type ResponseData = {
    accessToken: string;
}
type AxiosError = {
    response: {
        data: any,
    }
}

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AdminLogin: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            const response: AxiosResponse<ResponseData> = await axios.post(`${VITE_API_BASE_URL}/admin/login`,
                formData,
                {
                    withCredentials: true, // Allow cookies to be sent
                }); // Send data to the server's register API

            const { accessToken } = response.data; // Access the accessToken from the response data
            sessionStorage.setItem('accessToken', accessToken);
            setAccessToken(accessToken);
            const isAdmin = true;
            navigate('/adminHome');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error logging in user:', (error as AxiosError).response.data);
            } else {
                console.error('Other error:', error);
            }
            // Handle the error, e.g., display an error message to the user
        }

        // Reset the form after submission (optional)
        setFormData({
            email: '',
            password: ''
        });
    };

    
    return (
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <div className="mt-3">
                <Link to="/">Go to Home</Link>
            </div>
            <div className="mt-3"> {/* Added margin for visual spacing */}
                <Link to="/adminRegister">Admin Registration</Link> {/* Added link to the Admin Registration page */}
            </div>
        </div>
    );
};

export default AdminLogin;