// src/components/testApi/CurrentPackage.tsx
import React, { useState } from 'react';
import { useUsers } from '../../hooks/useUsers';
import UpgradePackage from './UpgradePackage';

interface Package {
    id: string | number;
    packageName: string;
    price: number;
    sponsorBonusPercentage: number;
    matchingBonusPercentage: number;
    hierarchyBonusPercentage: number;
    maxHierarchyChildren: number;
}

const CurrentPackage: React.FC = () => {
    const { packages, fetchPackages, currentUserPackage, fetchCurrentUserPackage } = useUsers();

    // State to track the selected package for upgrading
    const [selectedPackageForUpgrade, setSelectedPackageForUpgrade] = useState<Package | null>(null);

    React.useEffect(() => {
        fetchPackages();
        fetchCurrentUserPackage();
    }, []);



    const upgradeablePackages = packages.filter(pkg => !currentUserPackage || Number(pkg.price) > currentUserPackage.price);
    
    // Log the filtered upgradeable packages
    console.log("Upgradeable Packages:", upgradeablePackages);

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

            {selectedPackageForUpgrade && <UpgradePackage pkg={selectedPackageForUpgrade} />}
        </div>
    );
}

export default CurrentPackage;