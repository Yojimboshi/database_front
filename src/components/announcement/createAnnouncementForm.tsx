import React, { useState, useEffect } from 'react';
import { useAnnounce } from '../../hooks/useAnnounce';  // adjust the path as necessary
import useAdmin from '../../hooks/useAdmin';
import { GMT8_OFFSET } from '../../config/timeConfig';

function createAnnouncement() {
    const { createAnnouncement } = useAnnounce();
    const { fetchCurrentUserDetail, currentUser } = useAdmin();
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
        const fetchUser = async() => {
            await fetchCurrentUserDetail();
        }
        fetchUser();
    },[]);
    console.log("User Detail: ",currentUser);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const updatedFormData = {
                ...formData,
                userId: currentUser?.id || 0,
            };
    
            await createAnnouncement(updatedFormData);
            
            alert("Announcement created. Announcement Data: " + JSON.stringify(updatedFormData)); // Use JSON.stringify to convert the object to a string
            window.location.reload();
            // console.log("Updated Data: ", updatedFormData); //If want to display the announcement data on the console need to hide the window.location.reload();
        } catch (error) {
            setError('An error occurred while creating the announcement.');
        }
        setSubmitting(false);
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-black">Create Announcement</h2>
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
        </div>
    );
}

export default createAnnouncement;