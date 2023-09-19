// src/components/testApi/SubmitReport.tsx
import React, { useState } from 'react';
import { useUsers } from '../../hooks/useUsers';
import './style.css';

const SubmitReport: React.FC = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const { submitReport, loading, error } = useUsers(); // Including submitReport from useUsers hook

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (title && message) {
            try {
                await submitReport(title, message);
                setTitle('');
                setMessage('');
                alert("Report submitted successfully!"); // You might want a more elegant feedback system
            } catch (e) {
                console.error("Error submitting the report:", e);
            }
        } else {
            alert("Both title and message are required!");
        }
    }

    return (
        <div className="listText">
            <h2 className="boldBlackText">Submit Report</h2>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="boldBlackText">Title:</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    <label className="boldBlackText">Message:</label>
                    <textarea value={message} onChange={e => setMessage(e.target.value)}></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default SubmitReport;