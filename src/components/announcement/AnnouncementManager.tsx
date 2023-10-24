// src/components/announcement/AnnouncementManager.tsx
import React from 'react';
import { useAnnounce } from '../../hooks/useAnnounce';  // adjust the path as necessary
import { GMT8_OFFSET } from '../../config/timeConfig';


function AnnouncementTester() {
    const { 
        createAnnouncement, 
        deleteAnnouncement, 
        getAnnouncement, 
        fetchAllAnnouncements 
    } = useAnnounce();

    const testCreateAnnouncement = async () => {
        const sampleAnnouncement = {
            title: "Test Title",
            content: "Test content for our announcement",
            imageUrl: "http://example.com/image.jpg",
            isPinned: false,
            expirationDate: new Date(),
            category: "maintenance",
            language: "en"
        };
        
        const { createdAt } = await createAnnouncement(sampleAnnouncement);
    
        // Convert the ISO string to a Date object
        const createdAtDate = new Date(createdAt);
        
        // Add 8 hours using the GMT8_OFFSET
        const adjustedDate = new Date(createdAtDate.getTime() + GMT8_OFFSET);
        
        console.log("Original Creation Time:", createdAt);
        console.log("Adjusted Creation Time (+8 hours):", adjustedDate.toISOString());
    };
    

    const testDeleteAnnouncement = async () => {
        const idToDelete = 1; // Replace with an actual ID from your data
        const message = await deleteAnnouncement(idToDelete);
        console.log("Delete message:", message);
    };

    const testGetAnnouncement = async () => {
        const idToFetch = 1; // Replace with an actual ID
        const announcement = await getAnnouncement(idToFetch);
        console.log("Fetched announcement:", announcement);
    };

    const testFetchAllAnnouncements = async () => {
        await fetchAllAnnouncements();  // This will internally set the state with all announcements
    };

    return (
        <div>
            <button onClick={testCreateAnnouncement}>Test Create Announcement</button>
            <button onClick={testDeleteAnnouncement}>Test Delete Announcement</button>
            <button onClick={testGetAnnouncement}>Test Get Single Announcement</button>
            <button onClick={testFetchAllAnnouncements}>Test Fetch All Announcements</button>
        </div>
    );
}

export default AnnouncementTester;
