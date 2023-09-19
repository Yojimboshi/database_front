// src/components/testApi/CryptoDeposit.tsx

import React, { useEffect, useState } from 'react';
import { useUsers } from '../../hooks/useUsers';

function CryptoDeposit() {
    const { depositAddresses } = useUsers();
    const [addresses, setAddresses] = useState<any | null>(null);

    useEffect(() => {
        const fetchAddresses = async () => {
            const addrs = await depositAddresses();
            setAddresses(addrs);
        };

        fetchAddresses();
    }, [depositAddresses]);

    return (
        <div>
            <h2>Deposit</h2>
            {addresses ? (
                <>
                    <p>ERC20 Address: {addresses.erc20Address}</p>
                    <p>TRC20 Address: {addresses.trc20Address}</p>
                </>
            ) : (
                "Loading addresses..."
            )}
        </div>
    );
}

export default CryptoDeposit;
