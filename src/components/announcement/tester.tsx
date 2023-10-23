import React, { useState, useEffect } from 'react';
import { useAnnounce } from '../../hooks/useAnnounce';
import useAdmin, { userDetail } from '../../hooks/useAdmin';

const CreateAnnouncement = () => {
    const { createAnnouncement, getAnnouncement, fetchAllAnnouncements } = useAnnounce();
    const { fetchCurrentUserDetail, currentUser } = useAdmin(); // Add currentUser here
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        imageUrl: '',
        isPinned: false,
        expirationDate: new Date(),
        userId: 0,
        category: '',
        language: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch the current user's detail when the component mounts
        fetchCurrentUserDetail();
    }, []); // Empty dependency array to run the effect once

    // const testCreateAnnouncement = async () => {
    //     const sampleAnnouncement = {
    //         title: "Test Title",
    //         content: "Test content for our announcement",
    //         imageUrl: "http://example.com/image.jpg",
    //         isPinned: false,
    //         expirationDate: new Date(),
    //         userId: 1,
    //         category: "maintenance",
    //         language: "en"
    //     };

    //     const result = await createAnnouncement(sampleAnnouncement);
    //     console.log("Creation result:", result);
    // };

    // const testDeleteAnnouncement = async () => {
    //     const idToDelete = 1; // Replace with an actual ID from your data
    //     const message = await deleteAnnouncement(idToDelete);
    //     console.log("Delete message:", message);
    // };

    // const testGetAnnouncement = async () => {
    //     const idToFetch = 1; // Replace with an actual ID
    //     const announcement = await getAnnouncement(idToFetch);
    //     console.log("Fetched announcement:", announcement);
    // };

    // const testFetchAllAnnouncements = async () => {
    //     const allAnnouncement = await fetchAllAnnouncements();  // This will internally set the state with all announcement
    //     console.log(allAnnouncement);
    // };

    const testGetAnnouncement = async () => {
        const idToFetch = 5; // Replace with an actual ID
        const announcement = await getAnnouncement(idToFetch);
        console.log("Fetched announcement:", announcement);
    };

    const getAllAnnouncements = async () => {
        let idToFetch = 1;
        let hasMoreAnnouncements = true;
    
        while (hasMoreAnnouncements) {
            const announcement = await getAnnouncement(idToFetch);
    
            if (announcement) {
                console.log("Fetched announcement:", announcement);
                idToFetch++; // Move on to the next ID
            } else {
                hasMoreAnnouncements = false; // No more announcements to fetch
            }
        }
    };

    const testFetchAllAnnouncements = async () => {
        const allAnnouncement = await fetchAllAnnouncements();  // This will internally set the state with all announcement
        console.log(allAnnouncement);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            console.log(formData);
            await createAnnouncement(formData);
            // Handle successful submission, e.g., redirect to a different page
        } catch (error) {
            setError('An error occurred while creating the announcement.');
        }
        setSubmitting(false);
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Create Announcement</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-600">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Content:</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Image URL:</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex items-center">
                    <label className="block text-gray-600">Pinned:</label>
                    <input
                        type="checkbox"
                        name="isPinned"
                        checked={formData.isPinned}
                        onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                        className="ml-2"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Expiration Date:</label>
                    <input
                        type="date"
                        name="expirationDate"
                        value={formData.expirationDate.toISOString().split('T')[0]}
                        onChange={(e) => setFormData({ ...formData, expirationDate: new Date(e.target.value) })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">User ID:</label>
                    <input
                        type="number"
                        name="userId"
                        value={currentUser?.id || 0} // Access currentUser's ID
                        onChange={(e) => setFormData({ ...formData, userId: parseInt(e.target.value) })}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Language:</label>
                    <input
                        type="text"
                        name="language"
                        value={formData.language}
                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus-border-blue-500"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-blue-500 text-white rounded px-3 py-2 hover:bg-blue-600"
                    >
                        {submitting ? 'Submitting...' : 'Create Announcement'}
                    </button>
                </div>
            </form>
            <button onClick={getAllAnnouncements} className="mt-4 bg-gray-200 px-3 py-2 rounded hover:bg-gray-300">
                Test Get Announcement
            </button>
        </div>
    );
};

export default CreateAnnouncement;
