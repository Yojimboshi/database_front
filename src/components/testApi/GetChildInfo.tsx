// src/components/testApi/GetChildInfo.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useUsers } from '../../hooks/useUsers';
import './style.css';

interface User {
    id: number;
    username: string;
    // ... other properties
}

interface ChildInfo {
    user?: User;
    parent?: User;
    children: User[];
    grandchildren: User[];
}

const GetChildInfo: React.FC = () => {
    const { childInfo, fetchChildInfo } = useUsers();
    const [searchUsername, setSearchUsername] = useState("");


    const handleFetchClick = () => {
        fetchChildInfo();
    };

    const handleSearchClick = () => {
        fetchChildInfo(searchUsername);
    };

    return (
        <div>
            <h2>Child Info</h2>
            <div className="formRow">
                <button onClick={handleFetchClick}>Fetch</button>
                <input
                    type="text"
                    placeholder="Search username..."
                    value={searchUsername}
                    onChange={e => setSearchUsername(e.target.value)}
                />
                <button onClick={handleSearchClick}>Search</button>
            </div>
            <h3 className="boldBlackText">Children</h3>
            <ul className="listText">
                {childInfo.children.map(child => (
                    <li key={child.id}>{child.username}</li>
                ))}
            </ul>
            <h3 className="boldBlackText">Grandchildren</h3>
            <ul className="listText">
                {childInfo.grandchildren.map(child => (
                    <li key={child.id}>{child.username}</li>
                ))}
            </ul>

        </div>
    );
}

export default GetChildInfo;
