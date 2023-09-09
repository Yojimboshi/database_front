import React, { useState } from 'react';
import axios from 'axios';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
    const [childInfo, setChildInfo] = useState<ChildInfo>({
        children: [],
        grandchildren: []
    });
    const [searchUsername, setSearchUsername] = useState("");

    const fetchChildInfo = (username = "") => {
        const endpoint = `${VITE_API_BASE_URL}/api/v1/users/children`;
        const url = username ? `${endpoint}?search=${username}` : endpoint;

        axios.get(url)
            .then(response => {
                setChildInfo(response.data);
            })
            .catch(error => {
                console.error('Error fetching child info:', error);
            });
    };

    const handleFetchClick = () => {
        fetchChildInfo();
    };

    const handleSearchClick = () => {
        fetchChildInfo(searchUsername);
    };

    return (
        <div>
            <h2>Child Info</h2>
            <div>
                <button onClick={handleFetchClick}>Fetch</button>
                <input 
                    type="text" 
                    placeholder="Search username..."
                    value={searchUsername}
                    onChange={e => setSearchUsername(e.target.value)}
                />
                <button onClick={handleSearchClick}>Search</button>
            </div>
            <h3>Children</h3>
            <ul>
                {childInfo.children.map(child => (
                    <li key={child.id}>{child.username}</li>
                ))}
            </ul>
            <h3>Grandchildren</h3>
            <ul>
                {childInfo.grandchildren.map(child => (
                    <li key={child.id}>{child.username}</li>
                ))}
            </ul>
        </div>
    );
}

export default GetChildInfo;
