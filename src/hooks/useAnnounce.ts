// src/hooks/useAnnounce.ts
import { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface announcementDatas {
    title: string;
    content: string;
    imageUrl: string;
    isPinned: boolean;
    expirationDate: Date;
    userId: number | null;
    category: string;
    language: string;
}

export interface userDetail {
    email: string;
    id: number;
    role: string;
    username: string;
}

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ADMIN_ANNOUNCE_URL = `${VITE_API_BASE_URL}/admin/announce`;
const USER_ANNOUNCE_URL = `${VITE_API_BASE_URL}/users/announce`;
const ANNOUNCE_URL = `${VITE_API_BASE_URL}/announce`;
const ADMIN_URL = `${VITE_API_BASE_URL}/admin`;

export function useAnnounce() {
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [currentUser, setCurrentUser] = useState<userDetail | null>(null);

    const headers = {
        Authorization: `${sessionStorage.getItem('accessToken')}`
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

    const createAnnouncement = async (announcementData: announcementDatas) => {
        try {
            const response = await axios.post(ADMIN_ANNOUNCE_URL, announcementData, { headers });
            return response.data;
        } catch (error) {
            handleError("creating announcement", error);
        }
    };

    const deleteAnnouncement = async (id: number) => {
        try {
            const response = await axios.delete(`${ADMIN_ANNOUNCE_URL}/${id}`, { headers });
            return response.data.message;
        } catch (error) {
            handleError("deleting announcement", error);
        }
    };

    const getAnnouncement = async (id: number) => {
        try {
            const response = await axios.get(`${ANNOUNCE_URL}/${id}`, { headers });
            return response.data;
        } catch (error) {
            handleError("fetching single announcement", error);
        }
    };

    const fetchAllAnnouncements = async () => {
        try {
            setLoading(true);
            const response = await axios.get(ANNOUNCE_URL, { headers });
            setAnnouncements(response.data);
        } catch (error) {
            handleError("fetching all announcements", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCurrentUserDetail = async () => {
        try {
            const response = await axios.get(`${ADMIN_URL}/current`, { headers });
            setCurrentUser(response.data);  // <--- Set the current user here
        } catch (error) {
            handleError("fetching current user detail", error);
        }
    };

    // Additional CRUD methods for admin (e.g., create, update, delete) and user interactions (e.g., acknowledge, comment) can be added here.

    return {
        announcements,
        loading,
        error,
        createAnnouncement,
        deleteAnnouncement,
        getAnnouncement,
        fetchAllAnnouncements,
        fetchCurrentUserDetail,

        currentUser,
    };
}
