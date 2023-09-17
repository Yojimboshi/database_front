// src/components/testApi/UpgradePackage.tsx
import React from 'react';
import {useUsers, User, Package } from '../../hooks/useUsers';

interface Props {
    pkg: Package;
    user: User | null;  // You might need to define the User type
}

const UpgradePackage: React.FC<Props> = ({ pkg, user }) => {
    const { requestUpgrade } = useUsers();

    const handleUpgrade = async () => {
        if (!user) {
            alert('User information is missing.');
            return;
        }
        try {
            await requestUpgrade(user.id, pkg.id);
            alert('Upgrade requested!');
        } catch (error) {
            alert('Error requesting upgrade!');
        }
    };

    return (
        <button onClick={handleUpgrade}>
            Confirm Upgrade
        </button>
    );
}

export default UpgradePackage;