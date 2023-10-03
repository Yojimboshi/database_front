import React, { useEffect, useState } from 'react';
import { useUsers } from '../../hooks/useUsers';

const TestingGet: React.FC = () => {
    const { childInfo, fetchChildInfo } = useUsers();
    console.log(childInfo);

    useEffect(() => {
        fetchChildInfo();
    }, []);

    // Check if childInfo is available and has a user object
    const username = childInfo && childInfo.user ? childInfo.user.username : '';
    const children = childInfo && childInfo.children ? childInfo.children : [];

    // Find the left and right children based on leftChildId and rightChildId
    const leftChild = children.find(child => child.id === childInfo?.user?.leftChildId);
    const rightChild = children.find(child => child.id === childInfo?.user?.rightChildId);

    return (
        <div>
            <p className='text-slate-900'>Username: {username}</p>
            <p className='text-slate-900'>Children:</p>
            <ul>
                {children.map((child, index) => (
                    <li key={index} className='text-slate-900'>
                        ID: {child.id}, Parent ID: {child.parentId}, Name: {child.username}, Left: {child.leftChildId}, Right: {child.rightChildId}
                    </li>
                ))}
            </ul>

            <div>
                <div className='flex flex-col'>
                    <div>
                        <button>{username}</button>
                    </div>
                    <div>{/*First Role*/}
                        <button>{leftChild ? leftChild.username : 'No Left Child'}</button>
                        <button>{rightChild ? rightChild.username : 'No Right Child'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestingGet;
