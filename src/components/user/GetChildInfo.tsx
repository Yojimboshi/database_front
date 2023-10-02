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

    // const renderBinaryTree = (node: ChildInfo | null) => {
    //     if (!node) return null;

    //     return (
    //         <div className="grid grid-cols-2 grid-rows-auto gap-2 mt-4 relative">
    //             <span className="col-span-2 border border-solid w-8 h-8 rounded-full flex items-center justify-center mx-auto">{node.username}</span>
    //             {node.children.map((child) => (
    //                 <div key={child.id} className="grid grid-cols-2 grid-rows-auto gap-2 mt-4 relative">
    //                     {renderBinaryTree(child)}
    //                 </div>
    //             ))}
    //         </div>
    //     );
    // };

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
            <h3 className="font-bold text-slate-900">Children</h3>
            <ul className="list-disc pl-4">
                {childInfo.children.map(child => (
                    <li key={child.id} className="mb-2 text-slate-900 list-none">{child.username}</li>
                ))}
            </ul>
            <h3 className="text-slate-900 font-bold mt-4">Grandchildren</h3>
            <ul className="list-disc pl-4">
                {childInfo.grandchildren.map(child => (
                    <li key={child.id} className="mb-2 text-slate-900 list-none">{child.username}</li>
                ))}
            </ul>
            <h3 className="text-slate-900 font-bold mt-4">Great Grandchildren</h3>
            <ul className="list-disc pl-4">
                {childInfo.greatGrandchildren.map(child => (
                    <li key={child.id} className="mb-2 text-slate-900 list-none">{child.username}</li>
                ))}
            </ul>
        </div>
    );
}

export default GetChildInfo;
