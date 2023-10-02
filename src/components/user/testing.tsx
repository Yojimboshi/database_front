import React, { useEffect } from 'react';
import { useUsers } from '../../hooks/useUsers';

const TestingGet: React.FC = () => {
    const { childInfo, fetchChildInfo } = useUsers();

    useEffect(() => {
        fetchChildInfo();
    }, []);

    // Check if childInfo is available and has a user object
    const username = childInfo && childInfo.user ? childInfo.user.username : '';
    const children = childInfo && childInfo.children ? childInfo.children : [];
    const grandchildren = childInfo && childInfo.grandchildren ? childInfo.grandchildren : [];

    return (
        <div>
            <p className='text-slate-900'>Username: {username}</p>
            <p className='text-slate-900'>Children:</p>
            <ul>
                {children.map((child, index) => (
                    <li key={index} className='text-slate-900'>
                        ID: {child.id}, Parent ID: {child.parentId},{child.username}
                    </li>
                ))}
            </ul>

            <p className='text-slate-900'>Grandchildren:</p>
            <ul>
                {grandchildren.map((grandchild, index) => (
                    <li key={index} className='text-slate-900'>
                        ID: {grandchild.id}, Parent ID:{grandchild.parentId},name{grandchild.username}
                    </li>
                ))}
            </ul>
        </div>
        
    );
}

export default TestingGet;
