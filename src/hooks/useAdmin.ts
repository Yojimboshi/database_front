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
}

interface APIError {
  message?: string;
  statusText?: string;
  // ... any other properties the error might have ...
}

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = `${VITE_API_BASE_URL}/api/v1/admin`;

function useAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [reports, setReports] = useState([]);
  const [globalSettings, setGlobalSettings] = useState({});
  const [packages, setPackages] = useState([]);
  const [upgrades, setUpgrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<APIError | null>(null);

  const headers = {
    Authorization: `${sessionStorage.getItem('accessToken')}`
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/users`, { headers });
      console.log(response.data);
      setUsers(response.data);
    } catch (err: any) {
      // Check if axios response is available, otherwise use the whole error object
      setError(err.response ? err.response.data : err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Users state updated:", users);
}, [users]);


  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/reports`, { headers });
      setReports(response.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const banUser = async (userId: string) => {
    try {
      await axios.post(`${BASE_URL}/users/ban/${userId}`, {}, { headers });
      // Maybe update the users state here or refetch users to show the updated status
    } catch (err: any) {
      setError(err);
    }
  };

  const unbanUser = async (userId: string) => {
    try {
      await axios.post(`${BASE_URL}/users/unban/${userId}`, {}, { headers });
      // Maybe update the users state here or refetch users to show the updated status
    } catch (err: any) {
      setError(err);
    }
  };

  // ... other action functions like updateSettings, addUserOrChild etc.

  return {
    users,
    reports,
    globalSettings,
    packages,
    upgrades,
    loading,
    error,
    fetchUsers,
    fetchReports,
    banUser,
    unbanUser,
    // ... other returned states and actions ...
  };
}

export default useAdmin;
