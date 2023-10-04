// src/components/testApi/GetChildInfo.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUsers, User, ChildInfo } from '../../hooks/useUsers';
import './style.css';

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
            <h3 className="boldBlackText">Great Grandchildren</h3>
            <ul className="listText">
                {childInfo.greatGrandchildren.map(child => (
                    <li key={child.id}>{child.username}</li>
                ))}
            </ul>

        </div>
    );
}

export default GetChildInfo;

{/*
// src/components/user/GetChildInfo.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useUsers, User, ChildInfo } from '../../hooks/useUsers';

const GetChildInfo: React.FC = () => {
    const { childInfo, fetchChildInfo } = useUsers();
    const [searchUsername, setSearchUsername] = useState("");

    const handleFetchClick = () => {
        fetchChildInfo();
        console.log(childInfo);
    };

    const handleSearchClick = () => {
        fetchChildInfo(searchUsername);
    };

    const findChildren = (id: number | string) => {
        console.log(`Searching for children with ID: ${id}`);
        if (!id) return null;

        const child = childInfo.children.find((c) => c.id === id);
        if (child) {
            console.log(`Child found with username: ${child.username}`);
            return child.username;
        }

        console.log('Child not found.');
        return null;
    };

    const findGrandchild = (id: number | null) => {
        console.log(`Searching for grandchild with ID: ${id}`);
        if (!id) return null;

        const grandchild = childInfo.grandchildren.find((g) => g.id === id);
        if (grandchild) {
            console.log(`Grandchild found with username: ${grandchild.username}`);
            return grandchild.username;
        }

        console.log('Grandchild not found.');
        return null;
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Child Info</h2>
            <div className="flex items-center space-x-2 mb-4">
                <button onClick={handleFetchClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Fetch</button>
                <input
                    type="text"
                    placeholder="Search username..."
                    value={searchUsername}
                    onChange={e => setSearchUsername(e.target.value)}
                    className="border rounded py-2 px-4 w-64"
                />
                <button onClick={handleSearchClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button>
            </div>

            <div className="grid grid-rows-4 grid-cols-7 border border-sky-400">
                {childInfo?.user && (
                    <h3 className='text-slate-900 col-start-4 col-end-5'>{childInfo.user.username}</h3>
                )}
                
                <ul className="list-disc border border-black">
                    {childInfo?.user ? (
                        <>
                            <p>{childInfo.user.id}</p>
                            {findChildren(childInfo.user.id)}
                        </>
                    ) : null}
                </ul>
                
                <ul className="list-disc pl-4">
                    {childInfo.children?.map((child) => {
                        const leftChildName = findGrandchild(child.leftChildId);
                        const rightChildName = findGrandchild(child.rightChildId);
                        return (
                            <React.Fragment key={child.id}>
                                <li key={`left-${child.id}`} className="mb-2 mr-6 text-slate-900 list-none">
                                    <div>
                                        {leftChildName || "NULL"}
                                    </div>
                                </li>
                                <li key={`right-${child.id}`} className="mb-2 mr-6 text-slate-900 list-none">
                                    <div>
                                        {rightChildName || "NULL"}
                                    </div>
                                </li>
                            </React.Fragment>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default GetChildInfo;

*/}