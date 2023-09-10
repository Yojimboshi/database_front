// hooks/useUsers.ts
import { useState } from 'react';
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

interface ChildInfo {
    user?: User;
    parent?: User;
    children: User[];
    grandchildren: User[];
}

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USER_URL = `${VITE_API_BASE_URL}/users`;

export function useUsers() {
    const [childInfo, setChildInfo] = useState<ChildInfo>({
        children: [],
        grandchildren: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const headers = {
        Authorization: `${sessionStorage.getItem('accessToken')}`
    };

    const fetchChildInfo = async (username = "") => {
        const accessToken = sessionStorage.getItem('accessToken');
        const endpoint = `${USER_URL}/children`;
        const url = username ? `${endpoint}?search=${username}` : endpoint;

        try {
            const response = await axios.get(url, { headers });
            setChildInfo(response.data);
        } catch (error) {
            console.error('Error fetching child info:', error);
        }
    };

    return { childInfo, fetchChildInfo, loading, error };
}
