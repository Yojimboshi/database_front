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
            {/* <p>{announcementDetail.title}</p> */}
            <button onClick={() => handleDelete()}>Delete Announcement</button>
        </>
    );
}

export default DeleteAnnouncement;