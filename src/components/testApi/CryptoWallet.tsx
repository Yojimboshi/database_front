// src/components/testApi/CryptoWallet.tsx
import React, { useEffect, useState } from 'react';
import { useUsers } from '../../hooks/useUsers';
import './style.css';
import Toast from './Toast';

function CryptoWallet() {
    // deposit hook
    const { fetchDepositData, generateNewAddress, loading, setLoading, withdraw ,transfer} = useUsers();
    const [addresses, setAddresses] = useState<{ erc20Address?: string, trc20Address?: string } | null>(null);
    const [hasAddress, setHasAddress] = useState<boolean | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'transfer'>('deposit');
    // withdraw hook
    const [amount, setAmount] = useState<number | null>(null);
    const [address, setAddress] = useState<string>('');
    const [network, setNetwork] = useState<'ERC20' | 'TRC20' | 'BEP20' | 'MATIC'>('ERC20');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    //transfer hook
    const [recipient, setRecipient] = useState<string>('');
    const [tokenSymbol, setTokenSymbol] = useState<'ETH' | 'TRX'>('ETH');


    // Deposit View
    const renderDeposit = () => (
        <div className="CryptoWalletContainer">
            <h2>Deposit</h2>
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

    // Withdraw View (placeholder, replace with actual component)
    const renderWithdraw = () => {
        const handleWithdraw = async () => {
            if (!amount) {
                setErrorMessage("Please provide an amount.");
                return;
            }

            // Call to your API to process the withdrawal
            const response = await withdraw(amount, address, 'ETH', network); // Assuming 'ETH' as default currency for now, adjust accordingly

            if (!response.success) {
                setErrorMessage(response.message);
            } else {
                // Handle success, maybe reset form, and show success message
                // You can set a success message or handle it as per your requirements
                setAmount(null);
                setAddress('');
                setNetwork('ERC20');
            }
        };

        return (
            <div>
                <h2>Withdraw</h2>
                <div className="withdraw-form">
                    <input type="number" value={amount || ''} onChange={e => setAmount(Number(e.target.value))} placeholder="Amount" />
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
                    <select value={network} onChange={e => setNetwork(e.target.value as any)}>
                        <option value="ERC20">ERC20</option>
                        <option value="BEP20">BEP20</option>
                        <option value="MATIC">MATIC</option>
                        <option value="TRC20">TRC20</option>
                    </select>
                    <button onClick={handleWithdraw} disabled={loading}>
                        {loading ? "Processing..." : "Withdraw"}
                    </button>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </div>
            </div>
        );
    }

    const renderTransfer = () => {
        const handleTransfer = async () => {
            if (!amount || !recipient) {
                setErrorMessage("Please provide a recipient and amount.");
                return;
            }

            // Call to your API to process the transfer
            const response = await transfer(amount, recipient, tokenSymbol);

            if (!response.success) {
                setErrorMessage(response.message);
            } else {
                // Handle success, maybe reset form, and show success message
                setAmount(null);
                setRecipient('');
                setTokenSymbol('ETH');  // Assuming 'ETH' as default tokenSymbol for now, adjust accordingly
            }
        };

        return (
            <div>
                <h2>Transfer</h2>
                <div className="transfer-form">
                    <input type="text" value={recipient || ''} onChange={e => setRecipient(e.target.value)} placeholder="Recipient (Username/Address)" />
                    <input type="number" value={amount || ''} onChange={e => setAmount(Number(e.target.value))} placeholder="Amount" />
                    <select value={tokenSymbol} onChange={e => setTokenSymbol(e.target.value as any)}>
                        <option value="ETH">ETH</option>
                        <option value="TRX">TRX</option>
                        {/* Add other tokens as required */}
                    </select>
                    <button onClick={handleTransfer} disabled={loading}>
                        {loading ? "Processing..." : "Transfer"}
                    </button>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </div>
            </div>
        );
    };


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
            <div className="actionsWrapper">
                <button className={`formRow button ${activeTab === 'deposit' ? 'active' : ''}`} onClick={() => setActiveTab('deposit')}>DEPOSIT</button>
                <button className={`formRow button ${activeTab === 'withdraw' ? 'active' : ''}`} onClick={() => setActiveTab('withdraw')}>WITHDRAW</button>
                <button className={`formRow button ${activeTab === 'transfer' ? 'active' : ''}`} onClick={() => setActiveTab('transfer')}>TRANSFER</button>
            </div>

            {activeTab === 'deposit' && renderDeposit()}
            {activeTab === 'withdraw' && renderWithdraw()}
            {activeTab === 'transfer' && renderTransfer()}
            <Toast message="Address copied!" visible={showToast} />
        </div>
    );
}

export default CryptoWallet;