// src/hooks/useUsers.ts
import { useState } from 'react';
import axios from 'axios';

export interface User {
    id: string | number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    accountStatus: string;
    isEmpty: boolean;
}

export interface Package {
    id: string | number;
    packageName: string;
    price: number;
    sponsorBonusPercentage: number;
    matchingBonusPercentage: number;
    hierarchyBonusPercentage: number;
    maxHierarchyChildren: number;
}

export interface ChildInfo {
    user?: User;
    parent?: User;
    children: User[];
    grandchildren: User[];
}

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USER_URL = `${VITE_API_BASE_URL}/users`;

export function useUsers() {
    const [packages, setPackages] = useState<Package[]>([]);
    const [childInfo, setChildInfo] = useState<ChildInfo>({
        children: [],
        grandchildren: []
    });
    const [currentUser, setCurrentUser] = useState<User | null>(null);  // <--- Add this line
    const [currentUserPackage, setCurrentUserPackage] = useState<Package | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const headers = {
        Authorization: `${sessionStorage.getItem('accessToken')}`
    };

    const fetchCurrentUserDetail = async () => {
        try {
            const response = await axios.get(`${USER_URL}/current`, { headers });
            setCurrentUserPackage(response.data.package);
            setCurrentUser(response.data);  // <--- Set the current user here
        } catch (error) {
            console.error("Error fetching current user's package:", error);
        }
    };

    const fetchPackages = async () => {
        try {
            const response = await axios.get(`${USER_URL}/packages`, { headers });
            setPackages(response.data.packages);
        } catch (error) {
            console.error("Error fetching packages:", error);
        }
    };

    const requestUpgrade = async (userId: string | number, packageId: string | number) => {
        if (!userId) {
            console.error("No user is currently logged in.");
            return;
        }
    
        try {
            setLoading(true);
            const response = await axios.post(
                `${USER_URL}/upgrades`,
                { userId: userId, newPackageId: packageId },  // Use the passed userId here
                { headers }
            );
            return response.data; // You can handle the response as needed
        } catch (error) {
            console.error("Error requesting an upgrade:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const fetchChildInfo = async (username = "") => {
        const endpoint = `${USER_URL}/children`;
        const url = username ? `${endpoint}?search=${username}` : endpoint;

        try {
            const response = await axios.get(url, { headers });
            setChildInfo(response.data);
        } catch (error) {
            console.error('Error fetching child info:', error);
        }
    };

    const registerUser = async (userData: any) => {
        try {
            setLoading(true);
            const response = await axios.post(`${USER_URL}/child-package`, userData, { headers });
            return response.data;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        // Functions
        registerUser,
        fetchPackages,
        packages,
        requestUpgrade,
        fetchChildInfo,
        fetchCurrentUserDetail,
        currentUserPackage,
        currentUser, setCurrentUser,
        // States
        childInfo,
        loading,
        error,
    };
}