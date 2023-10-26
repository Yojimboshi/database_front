import React, { useState, useEffect } from 'react';
import { useUsers } from '../../hooks/useUsers';
import { useParams, useNavigate } from 'react-router-dom';
import { useAnnounce } from '../../hooks/useAnnounce';

interface DeleteAnnouncementProps {
    announcementDetail: any;
    onClose: () => void;
}

const DeleteAnnouncement: React.FC<DeleteAnnouncementProps> = ({ onClose, announcementDetail }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const { deleteAnnouncement } = useAnnounce();

    console.log(announcementDetail);

    const handleDelete = async () => {
        try{
            const announcementID = announcementDetail.id;
            await deleteAnnouncement(announcementID);
            window.location.reload();
        }catch(error:any){
            console.log("Error deleting announcement: ", error.message);
        }
    };

    return (
        <>
            <h2 className='text-black'>Announcement Details</h2>
            <p className='text-black'>Title: {announcementDetail.title}</p>
            <p className='text-black'>Content: {announcementDetail.content}</p>
            <p className='text-black'>Image: {announcementDetail.imageUrl}</p>
            <p className='text-black'>Pinned: {announcementDetail.isPinned}</p>
            <p className='text-black'>Date: {announcementDetail.expirationDate}</p>
            <p className='text-black'>User ID: {announcementDetail.userId}</p>
            <p className='text-black'>Category: {announcementDetail.category}</p>
            <p className='text-black'>Language: {announcementDetail.language}</p>
            <button onClick={() => handleDelete()}>Delete Announcement</button>
        </>
    );
}

export default DeleteAnnouncement;