import React, { useState, useEffect } from 'react';
import CreateAnnouncement from './createAnnouncementForm';
import AnnouncementList from './announcementList';

function AnnouncementTester() {
    const [isFormVisible, setFormVisible] = useState(false);
    const [isTableVisible, setTableVisible] = useState(false);

    return (
        <div className='flex flex-col'>
            <button onClick={() => setFormVisible(!isFormVisible)} className='m-auto mb-4'>
                {isFormVisible ? 'Hide Form' : 'Show Form'}
            </button>
            {isFormVisible && (
                <CreateAnnouncement />
            )}

            <button onClick={() => setTableVisible(!isTableVisible)} className='m-auto mb-4'>
                {!isTableVisible ? 'Show Table' : 'Hide Table'}
            </button>
            {isTableVisible && (
                <AnnouncementList />
            )}
        </div>
    );
};

export default AnnouncementTester;
