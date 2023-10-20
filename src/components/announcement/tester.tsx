import React from 'react';
import { useAnnounce } from '../../hooks/useAnnounce';  // adjust the path as necessary

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
            userId: 1,
            category: "maintenance",
            language: "en"
        };

        const result = await createAnnouncement(sampleAnnouncement);
        console.log("Creation result:", result);
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
