import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

type FormData = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: string; // Optional: We can provide a default role in the backend
}

type ResponseData = {
    _id: string;
    email: string;
    token: string;
}

type AxiosError = {
    response: {
        data: any,
    }
}

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminRegister: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

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
            console.log('Submitting form data:', formData); // Log form data before making the request
            const response: AxiosResponse<ResponseData> = await axios.post(
                `${VITE_API_BASE_URL}/admin/register`,
                formData
            );
            const { email } = response.data;
            alert(`Admin with email: ${email} registered successfully!`);
            // Navigate to the admin login page after successful registration
            navigate('/admin');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error registering the admin:', (error as AxiosError).response.data);
            } else {
                console.error('Other error:', error);
            }
        }

        // Optionally reset the form data after submission
        setFormData({
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        });
    };

    return (
        <div>
            <h2>Admin Registration</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                <button type="submit">Register</button>
            </form>
            <div className="mt-3">
                <Link to="/">Go to Home</Link>
            </div>
            <div>
                <Link to="/admin">Go to Admin Login</Link>
            </div>
        </div>
    );
};

export default AdminRegister;
