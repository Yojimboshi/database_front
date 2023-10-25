import React, { useState } from 'react';
import useAdmin from '../../hooks/useAdmin';
import '../../pages/Admin.css';
import Modal from '../modal/Modal';
import { useAnnounce } from '../../hooks/useAnnounce';
import DeleteAnnouncement from './deleteModal'

interface Announcement {
    id: number;
    title: string;
    content: string;
    imageURL: string;
    pinned: boolean;
    date: string;
    userId: string;
    category: string;
    language: string;
}

const announcementList: React.FC = () => {
    const { fetchAllAnnouncements, announcements, getAnnouncement } = useAnnounce();
    const [fetched, setFetched] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
    console.log(announcements);

    const handleFetchClick = async () => {
        await fetchAllAnnouncements();
        console.log(announcements);
        setFetched(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalContent(null); // clear modal content on close
    };

    const openDeleteModal = async(id : number) => {
        const announcementInfo = await getAnnouncement(id);
        setModalContent(() => <DeleteAnnouncement onClose={closeModal} announcementDetail={announcementInfo} />)
        setModalOpen(true);
    };

    return (
        <div>
            <h2>Announcement List</h2>

            {!fetched ? (
                <button onClick={handleFetchClick}>Fetch Announcements</button>
            ) : announcements.length === 0 ? (
                <p>No announcements found</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Image URL</th>
                            <th>Pinned</th>
                            <th>Date</th>
                            <th>User ID</th>
                            <th>Category</th>
                            <th>Language</th>
                        </tr>
                    </thead>
                    <tbody>
                        {announcements.map((announcement: Announcement) => (
                            <tr key={announcement.id}>
                                <td onClick={() => openDeleteModal(announcement.id)}>{announcement.id}</td>
                                <td>{announcement.title}</td>
                                <td>{announcement.content}</td>
                                <td>{announcement.imageUrl}</td>
                                <td>{announcement.pinned ? 'true' : 'false'}</td>
                                <td>{announcement.expirationDate}</td>
                                <td>{announcement.userId}</td>
                                <td>{announcement.category}</td>
                                <td>{announcement.language}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {modalContent}
            </Modal>
        </div>
    );
}

export default announcementList;
