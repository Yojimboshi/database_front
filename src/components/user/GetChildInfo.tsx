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

        if(!childInfo || !childInfo.user) return null;

        const userID = childInfo.user.id;

        if(userID === id){
            const left = childInfo.user.leftChildId;
            const right = childInfo.user.rightChildId;
            const leftChildrenInfo = childInfo.children.find((c) => c.id === left);
            const rightChidrenInfo = childInfo.children.find((r) => r.id === right);
            console.log("Before Find: ",left);
            console.log("After Find: ",leftChildrenInfo);
        }else{
            console.log("Cannot Work");
        }

        // const child = childInfo.children.filter((c) => c.parentId === id);
        // const usernames = child.map((child) => child.username);
        
        // if(usernames){
        //     return usernames;
        // }

        console.log('Child not found.');
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

            {/* Data showing */}
            <div className="grid grid-rows-4 grid-cols-7 border border-sky-400">
                {childInfo?.user && (
                    <h3 className='text-slate-900 col-start-4 col-end-5'>{childInfo.user.username}</h3>
                )}
                {/* Children part */}
                <ul className="list-disc border border-black">
                    {childInfo?.user ? (
                        <div className='text-slate-900'>
                            {findChildren(childInfo.user.id)}
                        </div>
                    ) : null}
                </ul>
            </div>
        </div>
    );
}

export default GetChildInfo;
