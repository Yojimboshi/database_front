// src/hooks/useUsers.ts
import { useState } from 'react';
import axios, { AxiosError } from 'axios';

export interface User {
    id: string | number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    accountStatus: string;
    isEmpty: boolean;
    parentId: number;
    leftChildId: number;
    rightChildId: number;
    leftCarryForward: number;
    rightCarryForward: number;
    packageId: number;
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
    greatGrandchildren: User[];
}

export interface UserSettingData {
    userId: number | string;
    notificationPreference: 'email' | 'push' | 'both' | 'none';
    privacySetting: 'public' | 'private' | 'friends_only';
    itemsPerPage: number;
    language: string;
    darkMode: boolean;
    integration: 'slack' | 'other_integration'; // Adjust based on your possible integrations
    apiKey: string;
    billingPreference: 'monthly' | 'annually';
}

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USER_URL = `${VITE_API_BASE_URL}/users`;

export function useUsers() {
    const [packages, setPackages] = useState<Package[]>([]);
    const [childInfo, setChildInfo] = useState<ChildInfo>({
        children: [],
        grandchildren: [],
        greatGrandchildren: []
    });
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [currentUserPackage, setCurrentUserPackage] = useState<Package | null>(null);
    const [currentUserSetting, setCurrentUserSetting] = useState<UserSettingData | null>(null);
    const [loading, setLoadingState] = useState(false); // Keep just this loading state
    const [error, setError] = useState<string>('');

    // Sample empty loading animation function
    const showLoadingAnimation = (show: boolean) => {
        if (show) {
            // Placeholder: Code to display the loading animation
            console.log("Loading animation started"); // Just for demonstration purposes
        } else {
            // Placeholder: Code to hide the loading animation
            console.log("Loading animation stopped"); // Just for demonstration purposes
        }
    };

    const setLoading = (state: boolean) => {
        // Updating the loading state with the provided value
        setLoadingState(state);

        // Toggle the loading animation based on the state
        showLoadingAnimation(state);
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

    const headers = {
        Authorization: `${sessionStorage.getItem('accessToken')}`
    };

    const fetchCurrentUserDetail = async () => {
        try {
            const response = await axios.get(`${USER_URL}/current`, { headers });
            setCurrentUserPackage(response.data.package);
            setCurrentUser(response.data);  // <--- Set the current user here
            console.log(response.data);
        } catch (error) {
            handleError("fetching current user detail", error);
        }
    };

    const fetchPackages = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${USER_URL}/packages`, { headers });
            setPackages(response.data.packages);
        } catch (error) {
            handleError("fetching packages", error);
        } finally {
            setLoading(false);  // Stop loading animation and reset loading state
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
            handleError("requesting an upgrade", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchChildInfo = async (username = "") => {
        const endpoint = `${USER_URL}/children`;
        const url = username ? `${endpoint}?search=${username}` : endpoint;

        try {
            setLoading(true)
            const response = await axios.get(url, { headers });
            setChildInfo(response.data);
        } catch (error) {
            handleError("fetching child info", error);
        } finally {
            setLoading(false);  // Stop loading animation and reset loading state
        }
    };

    const registerUser = async (userData: any) => {
        try {
            setLoading(true);
            const response = await axios.post(`${USER_URL}/child-package`, userData, { headers });
            console.log(response.data);
            return response.data;
        } catch (error) {
            handleError("registering user", error);
        } finally {
            setLoading(false);
        }
    };

    const submitReport = async (title: string, message: string) => {
        try {
            setLoading(true);
            const response = await axios.post(
                `${USER_URL}/reports`,
                { title, message },
                { headers }
            );
            return response.data; // Handle the response as needed
        } catch (error) {
            handleError("submitting report", error);
        }
        finally {
            setLoading(false);
        }
    };

    const generateNewAddress = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${USER_URL}/generate-deposit-address`, {}, { headers });
            return {
                erc20Address: response.data.erc20Address,
                trc20Address: response.data.trc20Address
            };
        } catch (error) {
            handleError("generating new address", error);
            return {};
        } finally {
            setLoading(false);  // Stop loading animation and reset loading state
        }
    };

    const fetchDepositData = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${USER_URL}/deposit`, { headers });
            const { hasAddresses, erc20Address, trc20Address } = response.data;

            return {
                hasAddresses,
                erc20Address,
                trc20Address
            };
        } catch (error) {
            handleError("fetching deposit data", error);
            return {
                hasAddresses: false
            };
        } finally {
            setLoading(false);  // Stop loading animation and reset loading state
        }
    };

    const withdraw = async (
        amount: number,
        address: string,
        currency: 'ETH' | 'TRX',
        network: 'ERC20' | 'TRC20' | 'BEP20' | 'MATIC'
    ) => {
        try {
            setLoading(true);
            const response = await axios.post(`${USER_URL}/withdraw`,
                {
                    amount: amount,
                    address: address,
                    currency: currency,
                    network: network  // Passing the network to the backend
                },
                { headers }
            );

            return {
                success: true,
                message: response.data.message,
                txHash: response.data.txHash ? response.data.txHash : null
            };
        } catch (error: any) {
            handleError("processing withdrawal", error);
            return {
                success: false,
                message: error.response && error.response.data ? error.response.data.message : "An error occurred"
            };
        } finally {
            setLoading(false);
        }
    };

    const transfer = async (
        amount: number,
        recipient: string,
        tokenSymbol: 'ETH' | 'TRX'
    ) => {
        try {
            setLoading(true);
            const response = await axios.post(`${USER_URL}/transfer`,
                {
                    amount: amount,
                    recipient: recipient,
                    tokenSymbol: tokenSymbol
                },
                { headers }
            );
    
            return {
                success: true,
                message: response.data.message,
                txHash: response.data.txHash ? response.data.txHash : null
            };
        } catch (error: any) {
            handleError("processing transfer", error);
            return {
                success: false,
                message: error.response && error.response.data ? error.response.data.message : "An error occurred"
            };
        } finally {
            setLoading(false);
        }
    };

    const updateUserSettings = async (newSettings: UserSettingData) => {
        try {
            const response = await axios.put(`${USER_URL}/settings`, newSettings, { headers });
            if (response.data.success) {
                setCurrentUserSetting(newSettings); // If you want to update the state only when the backend update is successful.
            }
            return response.data; // You can return the response or a custom message based on your needs.
        } catch (error) {
            console.error('Error updating user settings:', error);
            throw error; // This allows you to handle the error in the component if needed.
        }
    };

    const fetchUserSettings = async () => {
        try {
            const response = await axios.get(`${USER_URL}/settings`, { headers });
            setCurrentUserSetting(response.data.data);
        } catch (error) {
            console.error('Error fetching user settings:', error);
        }
    };
    
    
    return {
        // Functions
        registerUser,
        fetchPackages,
        requestUpgrade,
        fetchChildInfo,
        fetchCurrentUserDetail,
        setCurrentUser,
        submitReport, generateNewAddress,
        fetchDepositData,
        withdraw,transfer,
        updateUserSettings,
        fetchUserSettings,
        setLoading,
        // States
        currentUser,
        currentUserPackage,
        packages,
        childInfo,
        error,
        loading,
        currentUserSetting
    };
}