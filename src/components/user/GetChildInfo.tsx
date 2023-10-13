// src/components/user/GetChildInfo.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegisterNewUser from './RegisterNewUser';
import { useUsers, User, ChildInfo } from '../../hooks/useUsers';
import userIcon from '../../../images/user_icon.jpg';
import Modal from '../modal/Modal';
import './style.css';

const GetChildInfo: React.FC = () => {
    const { childInfo, fetchChildInfo } = useUsers();
    const [searchUsername, setSearchUsername] = useState("");
    const [leftChildInfo, setLeftChildInfo] = useState<User | null>(null);
    const [rightChildInfo, setRightChildInfo] = useState<User | null>(null);
    const [leftGrandchildUsername, setLeftGrandchildUsername] = useState<User[]>([]);
    const [rightGrandchildUsername, setRightGrandchildUsername] = useState<User[]>([]);
    const [selectedNodesHistory, setSelectedNodesHistory] = useState<string[]>([]);
    const shouldShowGoBackButton = selectedNodesHistory.length > 0;
    const [hasChildren, setHasChildren] = useState(false); // State variable to track children
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
    // console.log(childInfo);

    const openAddUserModal = () => {
        const parentID = childInfo.user?.id ? parseInt(childInfo.user.id as string, 10) : null;
        setModalContent(
            <RegisterNewUser onClose={closeModal} parentID={parentID} />
        );
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalContent(null); // clear modal content on close
    };

    const handleFetchClick = () => {
        console.log("Working on the fetch function....");
        fetchChildInfo();
    };

    const handleChildUsernameClick = (childUsername: string) => {
        console.log("Working on the username clicking function....");
    
        // Clear multiple state variables
        setLeftGrandchildUsername([]);
        setRightGrandchildUsername([]);
        setLeftChildInfo(null); // Clear leftChildInfo
        setRightChildInfo(null); // Clear leftChildInfo
        const newSelectedNodesHistory = [...selectedNodesHistory, childUsername];
        setSelectedNodesHistory(newSelectedNodesHistory);
        fetchChildInfo(childUsername);
    };
    
    const handleSearchClick = () => {
        console.log("Working on the search function...");
    
        // Clear multiple state variables
        setLeftGrandchildUsername([]);
        setRightGrandchildUsername([]);
        setLeftChildInfo(null); // Clear leftChildInfo
        setRightChildInfo(null); // Clear leftChildInfo
    
        // Now fetch new data
        fetchChildInfo(searchUsername);
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
            fetchChildInfo();
        }
    };

    const findLeftAndRightChildren = (id: number | string) => {
        console.log("Working on fetch information function...");
        if (!id) return null;

        if (!childInfo || !childInfo.user) return null;

        let leftChildrenID: string | number | null = null;
        let rightChildrenID: string | number | null = null;

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
                    leftChildrenID = leftChildren.id;
                    setLeftChildInfo(leftChildren);
                }
                if (rightChildren) {
                    rightChildrenID = rightChildren.id;
                    setRightChildInfo(rightChildren);
                }
            }
        }

        if (leftChildrenID) {
            console.log("finding the left grandchildren...");
            const leftGrandchildrenInfo = childInfo.grandchildren.filter(
                (grandchild) => grandchild.parentId === leftChildrenID
            );
            setLeftGrandchildUsername(leftGrandchildrenInfo);
        }

        if (rightChildrenID) {
            console.log("finding the right grandchildren...");
            const rightGrandchildrenInfo = childInfo.grandchildren.filter(
                (grandchild) => grandchild.parentId === rightChildrenID
            );
            setRightGrandchildUsername(rightGrandchildrenInfo);
        }
    };

    // Call findLeftAndRightChildren when childInfo changes
    useEffect(() => {
        if (childInfo && childInfo.user) {
            findLeftAndRightChildren(childInfo.user.id);

            if(childInfo.user?.leftChildId === null){
                setHasChildren(true);
            }else{
                setHasChildren(false);
            }
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
                    <>
                    <div className="col-start-4 col-end-5">
                        <img src={userIcon} alt="User Icon" className="h-6 w-6 m-auto"/>
                        <h3 className='text-slate-900'>{childInfo.user.username}</h3>
                    </div>
                    {/* Line */}
                    <div className='line-1 col-start-1 col-end-8 overflow-hidden flex flex-col'>
                        <div className='flex'>
                            <div className='border border-black w-32 h-7 border-l-0 border-t-0'></div>
                            <div className='border border-black w-32 h-7 border-r-0 border-t-0 border-l-0'></div>
                        </div>
                        <div className='flex'>
                            <div className='border border-black h-7 w-32 border-t-0 border-b-0 border-r-0'></div>
                            <div className='border border-black h-7 w-32 border-t-0 border-b-0 border-l-0'></div>
                        </div>
                    </div>
                    </>
                )}
                {/* Children part */}
                {/* Left Children */}
                <ul className="list-disc row-start-3 row-end-4 col-start-2 col-end-3">
                    {leftChildInfo !== null ? (
                        <div className='tooltip text-slate-900'>
                            <div className="username-info" onClick={() => handleChildUsernameClick(leftChildInfo.username)}>
                                <img src={userIcon} alt="User Icon" className="h-6 w-6 m-auto" onClick={() => handleChildUsernameClick(leftChildInfo.username)}/>
                                {leftChildInfo.username}
                                <div className='tooltiptext flex flex-col'>
                                    <p>Left Carry Forward: {leftChildInfo.leftCarryForward}</p>
                                    <p>Right Carry Forward: {leftChildInfo.rightCarryForward}</p> 
                                    <p>Package ID: {leftChildInfo.packageId}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='text-slate-900'>
                        </div>
                    )}
                </ul>

                {/* Right Children */}
                <ul className="list-disc row-start-3 row-end-4 col-start-6 col-end-7 relative">
                    {rightChildInfo !== null  ? (
                        <div className='tooltip text-slate-900'>
                            <div className="username-info" onClick={() => handleChildUsernameClick(rightChildInfo.username)}>
                                <img src={userIcon} alt="User Icon" className="h-6 w-6 m-auto" onClick={() => handleChildUsernameClick(rightChildInfo.username)}/>
                                {rightChildInfo.username}
                                <div className='tooltiptext flex flex-col'>
                                    <p>Left Carry Forward: {rightChildInfo.leftCarryForward}</p>
                                    <p>Right Carry Forward: {rightChildInfo.rightCarryForward}</p> 
                                    <p>Package ID: {rightChildInfo.packageId}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-slate-900"></div>
                    )}
                </ul>

                {/* Left Side */}
                {/* Left Grandchildren */}
                <ul className="list-disc row-start-4 row-start-5 col-start-1 col-end-2">
                    {leftGrandchildUsername.length > 0 ? (
                        <div className='tooltip text-slate-900'>
                            <div className="username-info" onClick={() => handleChildUsernameClick(leftGrandchildUsername[0].username)}>
                                <img src={userIcon} alt="User Icon" className="h-6 w-6 m-auto" onClick={() => handleChildUsernameClick(leftGrandchildUsername[0].username)}/>
                                {leftGrandchildUsername[0].username}
                                <div className='tooltiptext flex flex-col'>
                                    <p>Left Carry Forward: {leftGrandchildUsername[0].leftCarryForward}</p>
                                    <p>Right Carry Forward: {leftGrandchildUsername[0].rightCarryForward}</p> 
                                    <p>Package ID: {leftGrandchildUsername[0].packageId}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='text-slate-900'>
                        </div>
                    )}
                </ul>

                {/* Right Grandchildren */}
                <ul className="list-disc row-start-4 row-start-5 col-start-3 col-end-4">
                    {leftGrandchildUsername.length > 1 ? (
                        <div className='tooltip text-slate-900'>
                            <div className="username-info" onClick={() => handleChildUsernameClick(leftGrandchildUsername[1].username)}>
                                <img src={userIcon} alt="User Icon" className="h-6 w-6 m-auto" onClick={() => handleChildUsernameClick(leftGrandchildUsername[1].username)}/>
                                {leftGrandchildUsername[1].username}
                                <div className='tooltiptext flex flex-col'>
                                    <p>Left Carry Forward: {leftGrandchildUsername[1].leftCarryForward}</p>
                                    <p>Right Carry Forward: {leftGrandchildUsername[1].rightCarryForward}</p> 
                                    <p>Package ID: {leftGrandchildUsername[1].packageId}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='text-slate-900'>
                        </div>
                    )}
                </ul>

                {/* Grandchildren Line Part */}
                {leftGrandchildUsername.length > 0 ?(
                    <div className='line-2 col-start-1 col-end-4 overflow-hidden flex flex-col'>
                        <div className='flex'>
                            <div className='border border-dashed border-black w-16 h-7 border-l-0 border-t-0'></div>
                            <div className='border border-dashed border-black w-16 h-7 border-r-0 border-t-0 border-l-0'></div>
                        </div>
                        <div className='flex'>
                            <div className='border border-dashed border-black h-7 w-16 border-t-0 border-b-0 border-r-0'></div>
                            <div className='border border-dashed border-black h-7 w-16 border-t-0 border-b-0 border-l-0'></div>
                        </div>
                    </div>
                ):(
                    <div></div>
                )}

                {/* Right Side */}
                {/* Left Grandchildren */}
                <ul className="list-disc row-start-4 row-start-5 col-start-5 col-end-6">
                    {rightGrandchildUsername.length > 0 ? (
                        <div className='tooltip text-slate-900'>
                            <div className="username-info" onClick={() => handleChildUsernameClick(rightGrandchildUsername[0].username)}>
                                <img src={userIcon} alt="User Icon" className="h-6 w-6 m-auto" onClick={() => handleChildUsernameClick(rightGrandchildUsername[0].username)}/>
                                {rightGrandchildUsername[0].username}
                                <div className='tooltiptext flex flex-col'>
                                    <p>Left Carry Forward: {rightGrandchildUsername[0].leftCarryForward}</p>
                                    <p>Right Carry Forward: {rightGrandchildUsername[0].rightCarryForward}</p> 
                                    <p>Package ID: {rightGrandchildUsername[0].packageId}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='text-slate-900'>
                        </div>
                    )}
                </ul>
                {/* Right Grandchildren */}
                <ul className="list-disc row-start-4 row-start-5 col-start-7 col-end-8">
                    {rightGrandchildUsername.length > 0 ? (
                        <div className='tooltip text-slate-900'>
                            <div className="username-info" onClick={() => handleChildUsernameClick(rightGrandchildUsername[1].username)}>
                                <img src={userIcon} alt="User Icon" className="h-6 w-6 m-auto" onClick={() => handleChildUsernameClick(rightGrandchildUsername[1].username)}/>
                                {rightGrandchildUsername[0].username}
                                <div className='tooltiptext flex flex-col'>
                                    <p>Left Carry Forward: {rightGrandchildUsername[1].leftCarryForward}</p>
                                    <p>Right Carry Forward: {rightGrandchildUsername[1].rightCarryForward}</p> 
                                    <p>Package ID: {rightGrandchildUsername[1].packageId}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='text-slate-900'>
                        </div>
                    )}
                </ul>

                {/* Grandchildren Line Part */}
                {rightGrandchildUsername.length > 0 ?(
                    <div className='line-2 col-start-1 col-end-4 overflow-hidden flex flex-col'>
                        <div className='flex'>
                            <div className='border border-dashed border-black w-16 h-7 border-l-0 border-t-0'></div>
                            <div className='border border-dashed border-black w-16 h-7 border-r-0 border-t-0 border-l-0'></div>
                        </div>
                        <div className='flex'>
                            <div className='border border-dashed border-black h-7 w-16 border-t-0 border-b-0 border-r-0'></div>
                            <div className='border border-dashed border-black h-7 w-16 border-t-0 border-b-0 border-l-0'></div>
                        </div>
                    </div>
                ):(
                    <div></div>
                )}
            </div>
            {shouldShowGoBackButton && (
                <button onClick={handleGoBackClick}>Go Back</button>
            )}
            {hasChildren && (
                <button onClick={openAddUserModal} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Register</button>
            )}

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {modalContent}
            </Modal>
        </div>
    );
}

export default GetChildInfo;
