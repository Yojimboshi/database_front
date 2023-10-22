import React, { useState, useEffect } from 'react';
import { useAnnounce } from '../../hooks/useAnnounce';
import useAdmin from '../../hooks/useAdmin';

const CreateAnnouncement = () => {
    const { createAnnouncement, getAnnouncement, fetchAllAnnouncements } = useAnnounce();
    const { fetchUsers } = useAdmin();
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
        const idToFetch = 4; // Replace with an actual ID
        const announcement = await getAnnouncement(idToFetch);
        console.log("Fetched announcement:", announcement);
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
        <div>
            <h2>Create Announcement</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    />
                </div>
                <div>
                    <label>Pinned:</label>
                    <input
                        type="checkbox"
                        name="isPinned"
                        checked={formData.isPinned}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                </div>
                <div>
                    <label>Expiration Date:</label>
                    <input
                        type="date"
                        name="expirationDate"
                        value={formData.expirationDate.toISOString().split('T')[0]}
                        onChange={(e) => setFormData({ ...formData, expirationDate: new Date(e.target.value) })}
                    />
                </div>
                <div>
                    <label>User ID:</label>
                    <input
                        type="number"
                        name="userId"
                        value={formData.userId}
                        onChange={(e) => setFormData({ ...formData, userId: parseInt(e.target.value) })}
                        required
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                    />
                </div>
                <div>
                    <label>Language:</label>
                    <input
                        type="text"
                        name="language"
                        value={formData.language}
                        onChange={(e) => setFormData({...formData, language: e.target.value})}
                    />
                </div>
                <div>
                    <button type="submit" disabled={submitting}>Create Announcement</button>
                </div>
            </form>
            <button type="submit" onClick={testGetAnnouncement}>Get</button>
        </div>
    );
};

export default CreateAnnouncement;
