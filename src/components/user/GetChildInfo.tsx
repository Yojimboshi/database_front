// src/components/user/GetChildInfo.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUsers, User, ChildInfo } from '../../hooks/useUsers';
import userIcon from '../../../images/user_icon.jpg';

const GetChildInfo: React.FC = () => {
    const { childInfo, fetchChildInfo } = useUsers();
    const [searchUsername, setSearchUsername] = useState("");
    const [leftChildUsername, setLeftChildUsername] = useState<string>(""); // Initialized to empty string
    const [rightChildUsername, setRightChildUsername] = useState<string>(""); // Initialized to empty string
    const [leftGrandchildUsername, setLeftGrandchildUsername] = useState<string[]>([]);
    const [rightGrandchildUsername, setRightGrandchildUsername] = useState<string[]>([]);
    const [selectedNodesHistory, setSelectedNodesHistory] = useState<string[]>([]);
    console.log("Not from the function: ",childInfo);

    const handleFetchClick = () => {
        console.log("Working on the fetch function....");
        fetchChildInfo();
    };

    const handleSearchClick = () => {
        console.log("Working on the search function...");
        setLeftChildUsername("");
        setRightChildUsername("");
        setLeftGrandchildUsername([]);
        setRightGrandchildUsername([]);

        // Now fetch new data
        fetchChildInfo(searchUsername);
    };

    const handleChildUsernameClick = (childUsername: string) => {
        console.log("Working on the username clicking function....");
        setLeftChildUsername("");
        setRightChildUsername("");
        setLeftGrandchildUsername([]);
        setRightGrandchildUsername([]);
        const newSelectedNodesHistory = [...selectedNodesHistory, childUsername];
    setSelectedNodesHistory(newSelectedNodesHistory);
        fetchChildInfo(childUsername);
        console.log("Can work");
    };

    const handleGoBackClick = () => {
        console.log("Woring on the go back function....");
        // Remove the last selected node from the history
        const newSelectedNodesHistory = selectedNodesHistory.slice(0, -1);
        setSelectedNodesHistory(newSelectedNodesHistory);
    
        // Get the previous node (if any) and fetch its child info
        const previousNode = newSelectedNodesHistory[newSelectedNodesHistory.length - 1];
        if (previousNode) {
            fetchChildInfo(previousNode);
        } else {
            // If the history is empty, fetch the top-level data (initial state)
            alert("There is no history member information! Please fetch the user information first.")
        }
    };

    const findLeftAndRightChildren = (id: number | string) => {
        console.log("Working on fetch information function...");
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
                console.log("Finding the children part...");
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

        if (leftChildrenID) {
            console.log("finding the left grandchildren...");
            const leftGrandchildrenInfo = childInfo.grandchildren.filter(
                (grandchild) => grandchild.parentId === leftChildrenID
            );
            leftGrandchildrenUsernames = leftGrandchildrenInfo.map(
                (grandchild) => grandchild.username
            );
            setLeftGrandchildUsername(leftGrandchildrenUsernames);
        }

        if (rightChildrenID) {
            console.log("finding the right grandchildren...");
            const rightGrandchildrenInfo = childInfo.grandchildren.filter(
                (grandchild) => grandchild.parentId === rightChildrenID
            );
            rightGrandchildrenUsernames = rightGrandchildrenInfo.map(
                (grandchild) => grandchild.username
            );
            setRightGrandchildUsername(rightGrandchildrenUsernames);
        }

        // Update the state with the left and right child usernames
        setLeftChildUsername(leftChildrenUsername || "");
        setRightChildUsername(rightChildrenUsername || "");
    };

    // Call findLeftAndRightChildren when childInfo changes
    useEffect(() => {
        if (childInfo && childInfo.user) {
            findLeftAndRightChildren(childInfo.user.id);
            // console.log(childInfo.user.id);
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
                    <div className="col-start-4 col-end-5">
                        <img src={userIcon} alt="User Icon" className="h-6 w-6 m-auto"/>
                        <h3 className='text-slate-900'>{childInfo.user.username}</h3>
                    </div>
                )}
                {/* Children part */}
                {/* Left Children */}
                <ul className="list-disc row-start-3 row-end-4 col-start-2 col-end-3">
                    {leftChildUsername !== null && leftChildUsername !== "" ? (
                        <>
                            <img src={userIcon} alt="User Icon" className="h-6 w-6 m-auto" />
                            <div className='text-slate-900 cursor-pointer' onClick={() => handleChildUsernameClick(leftChildUsername)}>
                                {leftChildUsername}
                            </div>
                        </>
                    ) : (
                        <div className='text-slate-900'>
                        </div>
                    )}
                </ul>
                {/* Right Children */}
                <ul className="list-disc row-start-3 row-end-4 col-start-6 col-end-7 relative">
                    {rightChildUsername !== null && rightChildUsername !== "" ? (
                    <>
                        <img src={userIcon} alt="User Icon" className="h-6 w-6 m-auto" />
                        <div className="text-slate-900 cursor-pointer" onClick={() => handleChildUsernameClick(rightChildUsername)}>
                            {rightChildUsername}
                        </div>
                    </>
                    ) : (
                    <div className="text-slate-900"></div>
                    )}
                </ul>

                {/* Left Side */}
                {/* Left Grandchildren */}
                <ul className="list-disc row-start-4 row-start-5 col-start-1 col-end-2">
                    {leftGrandchildUsername.length > 0 ? (
                        <>
                            <img src={userIcon} alt="User Icon" className="h-6 w-6 m-auto" />
                            <div className='text-slate-900 cursor-pointer' onClick={() => handleChildUsernameClick(leftGrandchildUsername[0])}>
                                {leftGrandchildUsername[0]}
                            </div>
                        </>
                    ) : (
                        <div className='text-slate-900'>
                        </div>
                    )}
                </ul>
                {/* Right Grandchildren */}
                <ul className="list-disc row-start-4 row-start-5 col-start-3 col-end-4">
                    {leftGrandchildUsername.length > 1 ? (
                        <>
                            <img src={userIcon} alt="User Icon" className="h-6 w-6 m-auto" />
                            <div className='text-slate-900 cursor-pointer' onClick={() => handleChildUsernameClick(leftGrandchildUsername[1])}>
                                {leftGrandchildUsername[1]}
                            </div>
                        </>
                    ) : (
                        <div className='text-slate-900'>
                        </div>
                    )}
                </ul>

                {/* Right Side */}
                {/* Left Grandchildren */}
                <ul className="list-disc row-start-4 row-start-5 col-start-5 col-end-6">
                    {rightGrandchildUsername.length > 0 ? (
                        <>
                            <img src={userIcon} alt="User Icon" className="h-6 w-6 m-auto" />
                            <div className='text-slate-900 cursor-pointer' onClick={() => handleChildUsernameClick(rightGrandchildUsername[0])}>
                                {rightGrandchildUsername[0]}
                            </div>
                        </>
                    ) : (
                        <div className='text-slate-900'>
                        </div>
                    )}
                </ul>
                {/* Right Grandchildren */}
                <ul className="list-disc row-start-4 row-start-5 col-start-7 col-end-8">
                    {rightGrandchildUsername.length > 1 ? (
                        <>
                            <img src={userIcon} alt="User Icon" className="h-6 w-6 m-auto" />
                            <div className='text-slate-900 cursor-pointer' onClick={() => handleChildUsernameClick(rightGrandchildUsername[1])}>
                                {rightGrandchildUsername[1]}
                            </div>
                        </>
                    ) : (
                        <div className='text-slate-900'>
                        </div>
                    )}
                </ul>
            </div>
            <button onClick={handleGoBackClick}>Go Back</button>
        </div>
    );
}

export default GetChildInfo;
