import { useState, useEffect } from 'react';
import axios from 'axios';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useUserManagement = () => {
    const [newUserForm, setNewUserForm] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        packageId: '',
        parentId: ''
    });

    const [isFormEmpty, setIsFormEmpty] = useState(true);

    useEffect(() => {
        const checkFormEmpty = Object.values(newUserForm).some(value => value === "");
        setIsFormEmpty(checkFormEmpty);
    }, [newUserForm]);

    const handleCreateUser = async () => {
        try {
            const response = await axios.post(`${VITE_API_BASE_URL}/api/users`, newUserForm, {
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.status === 201 || response.status === 200) {
                // Handle success
                console.log("User successfully created", response.data);
            } else {
                // Handle other response codes
                console.error("Error creating user:", response.data);
            }
        } catch (error: any) {
            console.error("Error creating user:", error.response?.data || error.message);
        }
    };

    return {
        newUserForm,
        setNewUserForm,
        handleCreateUser,
        isFormEmpty
    };
};
