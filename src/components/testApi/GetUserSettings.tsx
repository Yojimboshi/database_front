import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const GetUserSettings: React.FC = () => {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        axios.get(`${VITE_API_BASE_URL}/users/settings`)
            .then(response => setSettings(response.data))
            .catch(error => console.error('Error fetching user settings:', error));
    }, []);

    return (
        <div>
            <h2>User Settings</h2>
            {settings && <p>Theme: {settings.theme}</p>}
            {/* ... other settings details */}
        </div>
    );
}

export default GetUserSettings;
