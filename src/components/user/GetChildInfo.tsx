// src/components/user/GetChildInfo.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUsers, User, ChildInfo } from '../../hooks/useUsers';

const GetChildInfo: React.FC = () => {
    const { childInfo, fetchChildInfo } = useUsers();
    const [searchUsername, setSearchUsername] = useState("");
    const [leftChildUsername, setLeftChildUsername] = useState<string | null>(null);
    const [rightChildUsername, setRightChildUsername] = useState<string | null>(null);
    const [leftGrandchildUsername, setLeftGrandchildUsername] = useState<string[]>([]);
    const [rightGrandchildUsername, setRightGrandchildUsername] = useState<string[]>([]);

    const handleFetchClick = () => {
        fetchChildInfo();
        console.log(childInfo);
    };

    const handleSearchClick = () => {
        fetchChildInfo(searchUsername);
        // Reset the left and right child usernames when performing a new search
        setLeftChildUsername(null);
        setRightChildUsername(null);
    };

    const findLeftAndRightChildren = (id: number | string) => {
        if (!id) return null;
    
        if (!childInfo || !childInfo.user) return null;
    
        let leftChildrenUsername: string | null = null;
        let rightChildrenUsername: string | null = null;
        let leftChildrenID: string | number | null = null;
        let rightChildrenID: string | number | null = null;
        let leftGrandchildrenUsernames: string[] = [];
        let rightGrandchildrenUsernames: string[] = [];
    
        if (childInfo.user.id === id) {
            if (childInfo.user !== null) {
                const leftChildren = childInfo.children.find(
                    (leftChild) => leftChild.id === childInfo.user?.leftChildId
                );
                const rightChildren = childInfo.children.find(
                    (rightChild) => rightChild.id === childInfo.user?.rightChildId
                );
                if (leftChildren) {
                    leftChildrenUsername = leftChildren.username;
                    leftChildrenID = leftChildren.id;
                }
                if (rightChildren) {
                    rightChildrenUsername = rightChildren.username;
                    rightChildrenID = rightChildren.id;
                }
            }
        }
    
        if (leftChildrenID !== null) {
            const leftGrandchildrenInfo = childInfo.grandchildren.filter(
                (grandchild) => grandchild.parentId === leftChildrenID
            );
            leftGrandchildrenUsernames = leftGrandchildrenInfo.map(
                (grandchild) => grandchild.username
            );
            setLeftGrandchildUsername(leftGrandchildrenUsernames);
        }
    
        if (rightChildrenID !== null) {
            const rightGrandchildrenInfo = childInfo.grandchildren.filter(
                (grandchild) => grandchild.parentId === rightChildrenID
            );
            rightGrandchildrenUsernames = rightGrandchildrenInfo.map(
                (grandchild) => grandchild.username
            );
            setRightGrandchildUsername(rightGrandchildrenUsernames);
        }
    
        // Update the state with the left and right child usernames
        setLeftChildUsername(leftChildrenUsername);
        setRightChildUsername(rightChildrenUsername);
    };

    // Call findLeftAndRightChildren when childInfo changes
    useEffect(() => {
        if (childInfo && childInfo.user) {
            findLeftAndRightChildren(childInfo.user.id);
            console.log("Call function effect");
        }
    }, [childInfo]);

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
            <div className="grid grid-rows-5 grid-cols-7">
                {childInfo?.user && (
                    <h3 className='text-slate-900 col-start-4 col-end-5 border border-black'>{childInfo.user.username}</h3>
                )}
                {/* Children part */}
                {/* Left Children */}
                <ul className="list-disc row-start-3 row-end-4 col-start-2 col-end-3">
                    {leftChildUsername !== null ? (
                        <div className='border border-black text-slate-900'>
                            {leftChildUsername}
                        </div>
                    ) : (
                        <div className='border border-black text-slate-900'>
                            null
                        </div>
                    )}
                </ul>
                {/* Right Children */}
                <ul className="list-disc row-start-3 row-end-4 col-start-6 col-end-7">
                    {rightChildUsername !== null ? (
                        <div className='border border-black text-slate-900'>
                            {rightChildUsername}
                        </div>
                    ) : (
                        <div className='border border-black text-slate-900'>
                            null
                        </div>
                    )}
                </ul>

                {/* Left Side */}
                {/* Left Grandchildren */}
                <ul className="list-disc row-start-4 row-start-5 col-start-1 col-end-2">
                    {leftGrandchildUsername.length > 0 ? (
                        <div className='border border-black text-slate-900'>
                            {leftGrandchildUsername[0]}
                        </div>
                    ) : (
                        <div className='border border-black text-slate-900'>
                            null
                        </div>
                    )}
                </ul>
                {/* Right Grandchildren */}
                <ul className="list-disc row-start-4 row-start-5 col-start-3 col-end-4">
                    {leftGrandchildUsername.length > 1 ? (
                        <div className='border border-black text-slate-900'>
                            {leftGrandchildUsername[1]}
                        </div>
                    ) : (
                        <div className='border border-black text-slate-900'>
                            null
                        </div>
                    )}
                </ul>

                {/* Right Side */}
                {/* Left Grandchildren */}
                <ul className="list-disc row-start-4 row-start-5 col-start-5 col-end-6">
                    {rightGrandchildUsername.length > 0 ? (
                        <div className='border border-black text-slate-900'>
                            {rightGrandchildUsername[0]}
                        </div>
                    ) : (
                        <div className='border border-black text-slate-900'>
                            null
                        </div>
                    )}
                </ul>
                {/* Right Grandchildren */}
                <ul className="list-disc row-start-4 row-start-5 col-start-7 col-end-8">
                    {rightGrandchildUsername.length > 1 ? (
                        <div className='border border-black text-slate-900'>
                            {rightGrandchildUsername[1]}
                        </div>
                    ) : (
                        <div className='border border-black text-slate-900'>
                            null
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default GetChildInfo;
