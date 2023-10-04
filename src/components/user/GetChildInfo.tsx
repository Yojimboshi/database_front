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

    const findChildren = ( id : number | null ) => {
        if(id === null){
            return null;
        }
        
        const childrenInfo = childInfo.children.find((children) => children.id === id);

        if(childrenInfo){
            return childrenInfo.username;
        }else{
            return null;
        }
    }

    const grandchildrenFindById = (id: number | null) => {
        if (id === null) {
            return null; // Handle the case where ID is null
        }
        const userInfo = childInfo.grandchildren.find((grandchildren) => grandchildren.id === id);
        
        if(userInfo){
            return userInfo.username;
        }else{
            return null;
        }
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
                    {childInfo?.user && (
                        <p>{childInfo.user.id}</p>
                        {childInfo?.user?.id !== null ?(
                            <>
                                {findChildren(childInfo.user.id)}
                            </>
                        ):"NULL"}
                    )}
                </ul>
                {/* grandchildren part */}
                <ul className="list-disc pl-4">
                <div> 
                    
                    {childInfo.children && childInfo.children.map((child) => (
                        <li key={child.id} className="mb-2 mr-6 text-slate-900 list-none">
                            <div>
                                {child.leftChildId !== null ? (
                                    <>
                                        {grandchildrenFindById(child.leftChildId) && (
                                            <>
                                                {grandchildrenFindById(child.leftChildId)}
                                            </>
                                        )}
                                    </>
                                ) : "NULL"}
                            </div>
                        </li>
                    ))}
                    </div>
                    <div>
                    {childInfo.children && childInfo.children.map((child) => (
                        <li key={child.id} className="mb-2 mr-6 text-slate-900 list-none">
                            <div>
                                {child.rightChildId !== null ? (
                                    <>
                                        {grandchildrenFindById(child.rightChildId) && (
                                            <>
                                                {grandchildrenFindById(child.rightChildId)}
                                            </>
                                        )}
                                    </>
                                ) : "NULL"}
                            </div>
                        </li>
                    ))}
                    </div>
                </ul>
            </div>

        </div>
    );
}

export default GetChildInfo;
