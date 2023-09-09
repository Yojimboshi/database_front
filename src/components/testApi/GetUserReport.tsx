import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const GetUserReport: React.FC = () => {
    const [report, setReport] = useState({
        package: {},
        depositsHistory: [],
        withdrawalHistory: [],
        transactionalHistory: []
    });

    useEffect(() => {
        axios.get(`${VITE_API_BASE_URL}/api/v1/users/report`)
            .then(response => setReport(response.data))
            .catch(error => console.error('Error fetching user report:', error));
    }, []);

    return (
        <div>
            <h2>User Report</h2>
            <h3>Package</h3>
            <p>Package Name: {report.package.name}</p>
            <h3>Deposits History</h3>
            <ul>
                {report.depositsHistory.map(deposit => (
                    <li key={deposit.id}>Amount: {deposit.amount}</li>
                ))}
            </ul>
            {/* ... similar structure for withdrawal and transactional history */}
        </div>
    );
}

export default GetUserReport;
