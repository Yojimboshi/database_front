// src/components/testApi/UserSetting.tsx
import React, { useEffect } from 'react';
import { useUsers } from '../../hooks/useUsers';
import './style.css';

const UserSetting: React.FC = () => {
    const { currentUserSetting, fetchUserSettings } = useUsers();

    useEffect(() => {
        fetchUserSettings();
    }, [fetchUserSettings]);

    return (
        <div className="CryptoWalletContainer">
            <h2>User Settings</h2>
            {currentUserSetting && (
                <dl className="settingsList">
                    <dt className="boldBlackText">Notification Preference:</dt>
                    <dd className="listText">{currentUserSetting.notificationPreference}</dd>

                    <dt className="boldBlackText">Privacy Setting:</dt>
                    <dd className="listText">{currentUserSetting.privacySetting}</dd>

                    <dt className="boldBlackText">Items Per Page:</dt>
                    <dd className="listText">{currentUserSetting.itemsPerPage}</dd>

                    <dt className="boldBlackText">Language:</dt>
                    <dd className="listText">{currentUserSetting.language}</dd>

                    <dt className="boldBlackText">Dark Mode:</dt>
                    <dd className="listText">{currentUserSetting.darkMode ? "Enabled" : "Disabled"}</dd>

                    <dt className="boldBlackText">Integration:</dt>
                    <dd className="listText">{currentUserSetting.integration}</dd>

                    <dt className="boldBlackText">API Key:</dt>
                    <dd className="listText">{currentUserSetting.apiKey || "Not set"}</dd>
                </dl>
            )}
        </div>
    );
}

export default UserSetting;
