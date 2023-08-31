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

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ADMIN_URL = `${VITE_API_BASE_URL}/api/v1/admin`;

function useAdmin() {
    const [users, setUsers] = useState<User[]>([]);
    const [reports, setReports] = useState([]);
    const [globalSettings, setGlobalSettings] = useState({});
    const [packages, setPackages] = useState<Package[]>([]);
    const [upgrades, setUpgrades] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<APIError | null>(null);

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

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            return response.data;
        } catch (err: any) {
            setError(err.response ? err.response.data : err);
            throw err;
        } finally {
            setLoading(false);
        }
    };


    const banUser = async (userId: string) => {
        try {
            await axios.post(`${ADMIN_URL}/users/ban/${userId}`, {}, { headers });
            // Maybe update the users state here or refetch users to show the updated status
        } catch (err: any) {
            setError(err);
        }
    };

    const unbanUser = async (userId: string) => {
        try {
            await axios.post(`${ADMIN_URL}/users/unban/${userId}`, {}, { headers });
            // Maybe update the users state here or refetch users to show the updated status
        } catch (err: any) {
            setError(err);
        }
    };

    // ... other action functions like updateSettings, addUserOrChild etc.

    return {
        ADMIN_URL,
        users,
        reports,
        globalSettings,
        fetchPackages,
        packages,
        upgrades,
        loading,
        error,
        fetchUsers,
        fetchUserByUsername,
        fetchReports,
        addUser,
        banUser,
        unbanUser,
    };
}

export default useAdmin;