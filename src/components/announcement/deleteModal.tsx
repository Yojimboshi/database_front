import React, { useState, useEffect } from 'react';
import { useUsers } from '../../hooks/useUsers';
import { useParams, useNavigate } from 'react-router-dom';
import { useAnnounce } from '../../hooks/useAnnounce';

interface DeleteAnnouncementProps {
    announcementDetail: any;
    onClose: () => void;
}

const DeleteAnnouncement: React.FC<DeleteAnnouncementProps> = ({ onClose, announcementDetail }) => {
    const { deleteAnnouncement } = useAnnounce();

    const handleDelete = async () => {
        try {
            const announcementID = announcementDetail.id;
            await deleteAnnouncement(announcementID);
            window.location.reload();
        } catch (error: any) {
            console.log("Error deleting announcement: ", error.message);
        }
    };

    return (
        <div className='border-black border w-auto p-4'>
            <h2 className="text-xl font-semibold mb-2 text-black">Announcement Details</h2>

            <div className="flex flex-row text-left">
                <div className="w-1/3 text-black">
                    <strong>Title:</strong>
                </div>
                <div className="w-2/3 text-black">
                    {announcementDetail.title}
                </div>
            </div>

            <div className="flex flex-row text-left">
                <div className="w-1/3 text-black">
                    <strong>Content:</strong>
                </div>
                <div className="w-2/3 text-black">
                    {announcementDetail.content}
                </div>
            </div>

            <div className="flex flex-row text-left">
                <div className="w-1/3 text-black">
                    <strong>Image:</strong>
                </div>
                <div className="w-2/3 text-black">
                    {announcementDetail.imageUrl}
                </div>
            </div>

            <div className="flex flex-row text-left">
                <div className="w-1/3 text-black">
                    <strong>Pinned:</strong>
                </div>
                <div className="w-2/3 text-black">
                    {announcementDetail.isPinned ? 'True' : 'False'}
                </div>
            </div>

            <div className="flex flex-row text-left">
                <div className="w-1/3 text-black">
                    <strong>Date:</strong>
                </div>
                <div className="w-2/3 text-black">
                    {announcementDetail.expirationDate}
                </div>
            </div>

            <div className="flex flex-row text-left">
                <div className="w-1/3 text-black">
                    <strong>User ID:</strong>
                </div>
                <div className="w-2/3 text-black">
                    {announcementDetail.userId}
                </div>
            </div>

            <div className="flex flex-row text-left">
                <div className="w-1/3 text-black">
                    <strong>Category:</strong>
                </div>
                <div className="w-2/3 text-black">
                    {announcementDetail.category}
                </div>
            </div>

            <div className="flex flex-row text-left">
                <div className="w-1/3 text-black">
                    <strong>Language:</strong>
                </div>
                <div className="w-2/3 text-black">
                    {announcementDetail.language}
                </div>
            </div>

            <button
                className="mt-4 p-2 bg-red-500 text-white rounded"
                onClick={handleDelete}
            >
                Delete Announcement
            </button>
        </div>
    );
}

export default DeleteAnnouncement;
