// src/components/testApi/CurrentPackage.tsx
import React, { useState, useEffect } from 'react';
import { useUsers , Package} from '../../hooks/useUsers';
import UpgradePackage from './UpgradePackage';


const CurrentPackage: React.FC = () => {
    const { packages, fetchPackages, currentUserPackage, fetchCurrentUserDetail, currentUser } = useUsers();

    // State to track the selected package for upgrading
    const [selectedPackageForUpgrade, setSelectedPackageForUpgrade] = useState<Package | null>(null);

    useEffect(() => {
        fetchPackages();
        fetchCurrentUserDetail();
    }, []);

    const upgradeablePackages = packages.filter(pkg => !currentUserPackage || Number(pkg.price) > currentUserPackage.price);

    return (
        <div className="listText"> {/* Applied listText for general color */}
            <h2 className="boldBlackText">Your Current Package</h2> {/* Applied boldBlackText for header */}
            {currentUserPackage && (
                <div>
                    <strong className="boldBlackText">Name:</strong> {currentUserPackage.packageName}
                    <br />
                    <strong className="boldBlackText">Price:</strong> ${Number(currentUserPackage.price)?.toFixed(2)}
                    {/* ... Add other package details if needed ... */}
                </div>
            )}

            <h2 className="boldBlackText">Available Upgrades</h2> {/* Applied boldBlackText for header */}
            {upgradeablePackages.map((pkg) => (
                <div key={pkg.id}>
                    <p>
                        <strong className="boldBlackText">Name:</strong> {pkg.packageName}
                        <br />
                        <strong className="boldBlackText">Price:</strong> ${Number(pkg.price)?.toFixed(2)}
                    </p>
                    <div className="formRow">
                        <button onClick={() => setSelectedPackageForUpgrade(pkg)}>Upgrade to this package</button>
                    </div>
                </div>
            ))}
            {selectedPackageForUpgrade && <UpgradePackage pkg={selectedPackageForUpgrade} user={currentUser} />}

        </div>
    );
}

export default CurrentPackage;