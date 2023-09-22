// src/components/testApi/CryptoWallet.tsx
import React, { useEffect, useState } from 'react';
import { useUsers } from '../../hooks/useUsers';
import './style.css';
import Toast from './Toast';


function CryptoWallet() {
    const { fetchDepositData, generateNewAddress } = useUsers();
    const [addresses, setAddresses] = useState<{ erc20Address?: string, trc20Address?: string } | null>(null);
    const [hasAddress, setHasAddress] = useState<boolean | null>(null);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchDepositData();
                setHasAddress(data.hasAddresses);
                if (data.hasAddresses) {
                    setAddresses({
                        erc20Address: data.erc20Address,
                        trc20Address: data.trc20Address
                    });
                }
            } catch (error) {
                // Handle or log the error as you see fit
                console.error("Failed to fetch deposit data:", error);
            }
        };
        fetchData();
    }, []);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000); // Toast will disappear after 3 seconds
        }).catch(err => {
            console.error("Could not copy text: ", err);
        });
    };
    

    const handleGenerateAddressClick = async () => {
        // Call the API to generate a new crypto address for the user
        const newAddresses = await generateNewAddress();

        // Check if the API call was successful (addresses were generated and returned)
        if (newAddresses.erc20Address && newAddresses.trc20Address) {
            // Set the new addresses in the local state
            setAddresses(newAddresses);

            // Update the hasAddress state to true
            setHasAddress(true);
        }
    };

    return (
        <div className="CryptoWalletContainer">
            <h2>Deposit Addresses</h2>
            {hasAddress === null ?
                'Checking...' :
                hasAddress ? (
                    addresses && addresses.erc20Address && addresses.trc20Address ? (
                        <table className="CryptoWalletTable">
                            <thead>
                                <tr>
                                    <th className="boldBlackText">Network</th>
                                    <th className="boldBlackText">Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <select className="listText">
                                            <option value="ERC20">ERC20</option>
                                            <option value="BEP20">BEP20</option>
                                            <option value="MATIC">MATIC</option>
                                        </select>
                                    </td>
                                    <td className="listText clickable" onClick={() => addresses.erc20Address && copyToClipboard(addresses.erc20Address)}>
                                        {addresses.erc20Address}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="boldBlackText">TRC20</td>
                                    <td className="listText clickable" onClick={() => addresses.trc20Address && copyToClipboard(addresses.trc20Address)}>
                                        {addresses.trc20Address}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        "Loading addresses..."
                    )
                ) : (
                    <button className="formRow button" onClick={handleGenerateAddressClick}>Generate Crypto Wallet</button>
                )
            }
            <Toast message="Address copied!" visible={showToast} />
        </div>
    );
}

export default CryptoWallet;
