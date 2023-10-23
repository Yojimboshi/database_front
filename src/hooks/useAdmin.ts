// src/hooks/useAdmin.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    id: string | number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    accountStatus: string;
    isEmpty: boolean;
}

interface AddUserFormData {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    packageId: string;
    parentId: string;
    retypePassword: string;
    isEmpty: boolean;
}

interface Package {
    id: string | number;
    packageName: string;
    price: number;
    sponsorBonusPercentage: number;
    matchingBonusPercentage: number;
    hierarchyBonusPercentage: number;
    maxHierarchyChildren: number;
}


interface APIError {
    message?: string;
    statusText?: string;
    // ... any other properties the error might have ...
}

export interface userDetail {
    email: string;
    id: number;
    role: string;
    username: string;
}

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ADMIN_URL = `${VITE_API_BASE_URL}/admin`;

function useAdmin() {
    const [users, setUsers] = useState<User[]>([]);
    const [reports, setReports] = useState([]);
    const [globalSettings, setGlobalSettings] = useState({});
    const [packages, setPackages] = useState<Package[]>([]);
    const [upgrades, setUpgrades] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<APIError | null>(null);
    const [currentUser, setCurrentUser] = useState<userDetail | null>(null);

    const headers = {
        Authorization: `${sessionStorage.getItem('accessToken')}`
    };

    const fetchPackages = async () => {
        try {
            const response = await axios.get(`${ADMIN_URL}/packages`, { headers });
            setPackages(response.data.packages);
        } catch (error) {
            console.error("Error fetching packages:", error);
        }
    };

    const fetchUsers = async (limit = 10, sortBy = 'createdAt', order = 'DESC', search = "") => {
        try {
            setLoading(true);
            const response = await axios.get(`${ADMIN_URL}/users`, {
                headers,
                params: { limit, sortBy, order, search }
            });
            console.log(response.data);
            setUsers(response.data);
        } catch (err: any) {
            setError(err.response ? err.response.data : err);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserByUsername = async (username: string) => {
        try {
            setLoading(true);
            const response = await axios.get(`${ADMIN_URL}/users/${username}`, {
                headers
            });
            console.log(response.data);
            return response.data; // Return the user data from the function
        } catch (err: any) {
            setError(err.response ? err.response.data : err);
            return null; // Return null if there's an error
        } finally {
            setLoading(false);
        }
    };

    const fetchReports = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${ADMIN_URL}/reports`, { headers });
            setReports(response.data);
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const addUser = async (userData: AddUserFormData): Promise<any> => {
        try {
            // Check if passwords match
            if (userData.password !== userData.retypePassword) {
                throw new Error("Passwords do not match");
            }
            setLoading(true);
            const response = await axios.post(`${ADMIN_URL}/users/child-package`, userData, { headers });

            if (response.data.message === "User added successfully") {
                // Handle success here
                console.log("User added successfully");
            } else {
                // Handle error here
                console.error("Error message from server:", response.data.message);
                throw new Error(response.data.message);
            }
            return response.data;
        } catch (err: any) {
            console.error("Error in addUser:", err);
            setError(err.response ? err.response.data : err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const toggleAccountStatus = async (userId: string, action: 'ban' | 'restrict' | 'activate') => {
        try {
            await axios.post(`${ADMIN_URL}/users/toggle-ban/${userId}?action=${action}`, {}, { headers });
            // Maybe update the users state here or refetch users to show the updated status
        } catch (err: any) {
            setError(err.response ? err.response.data : err);
        }
    };

    const handleError = (operation: string, error: any) => {
        let errorMessage;
    
        if (axios.isAxiosError(error)) {
            errorMessage = (error.response?.data as any)?.message || "An unknown error occurred.";
        } else {
            errorMessage = error.message || "An unknown error occurred.";
        }
    
        console.error(`Error ${operation}:`, errorMessage);
        setError(errorMessage);
    };

    const fetchCurrentUserDetail = async () => {
        try {
            const response = await axios.get(`${ADMIN_URL}/current`, { headers });
            setCurrentUser(response.data);  // <--- Set the current user here
        } catch (error) {
            handleError("fetching current user detail", error);
        }
    };

    // ... other action functions like updateSettings, addUserOrChild etc.

    return {
        // Functions
        fetchPackages,
        fetchUsers,
        fetchUserByUsername,
        fetchReports,
        addUser,
        toggleAccountStatus,
        fetchCurrentUserDetail,

        // State
        ADMIN_URL,
        users,
        reports,
        globalSettings,
        packages,
        upgrades,
        loading,
        error,
        currentUser,
    };
}

export default useAdmin;