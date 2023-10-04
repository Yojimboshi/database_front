import React, { useState } from 'react';
import axios from 'axios';
import { useUsers, User, ChildInfo } from '../../hooks/useUsers';

const GetChildInfo: React.FC = () => {
    const { childInfo, fetchChildInfo } = useUsers();
    const [searchUsername, setSearchUsername] = useState("");

    const handleFetchClick = () => {
        fetchChildInfo();
    };

    const handleSearchClick = () => {
        fetchChildInfo(searchUsername);
    };

    const childrenData = ( id : number | string ) => {
        if(id === null){
            return null;
        }

        const childrenInfo = childInfo.children.find((children) => children.id === id);

        console.log(childrenInfo);

        if(childrenInfo){
            return childrenInfo;
        }else{
            return null;
        }
    }

    console.log(childInfo);

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
                    // <h3 className='text-slate-900 col-start-4 col-end-5'>{childInfo.user.leftChildId}</h3>
                )}
                {/* Children Data */}
                <ul className="list-disc">
                    
                </ul>
            </div>

        </div>
    );
}

export default GetChildInfo;
