// src/components/testApi/UpgradePackage.tsx
import { useUsers } from '../../hooks/useUsers';


interface Package {
    id: string | number;
    packageName: string;
    price: number;
    sponsorBonusPercentage: number;
    matchingBonusPercentage: number;
    hierarchyBonusPercentage: number;
    maxHierarchyChildren: number;
}

interface Props {
    pkg: Package;
}

const UpgradePackage: React.FC<Props> = ({ pkg }) => {
    const { requestUpgrade } = useUsers();

    const handleUpgrade = async () => {
        try {
            // Assuming requestUpgrade accepts the package ID for upgrading
            await requestUpgrade(pkg.id); // send the package ID to the backend
            alert('Upgrade requested!');
        } catch (error) {
            alert('Error requesting upgrade!');
        }
    };

    return (
        <div>
            <h3>{pkg.packageName}</h3>
            <p>Price: ${pkg.price.toFixed(2)}</p>
            {/* ... Display other package details if needed ... */}
            <button onClick={handleUpgrade}>Upgrade to this package</button>
        </div>
    );
}

export default UpgradePackage;