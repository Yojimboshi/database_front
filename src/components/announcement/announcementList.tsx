import React, { useState, useEffect } from 'react';
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

    const closeModal = () => {
        setModalOpen(false);
        setModalContent(null); // clear modal content on close
    };

    const openDeleteModal = async(id : number) => {
        const announcementInfo = await getAnnouncement(id);
        setModalContent(() => <DeleteAnnouncement onClose={closeModal} announcementDetail={announcementInfo} />)
        setModalOpen(true);
    };

    console.log(announcements);

    useEffect(() => {
        if (!fetched) { // Check if data has been fetched
            const fetchAnnouncement = async () => {
                await fetchAllAnnouncements();
                setFetched(true);
            }
            fetchAnnouncement();
        }
    }, [fetched]); // Add the 'fetched' variable to the dependency array

    return (
        <div>
            <h2 className='text-2xl font-bold mb-4 text-black'>Announcement List</h2>
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
                            <tr key={announcement.id} onClick={() => openDeleteModal(announcement.id)}>
                                <td className='cursor-pointer'>{announcement.id}</td>
                                <td>{announcement.title}</td>
                                <td>{announcement.content}</td>
                                <td>{announcement.imageUrl}</td>
                                <td>{announcement.isPinned ? 'False' : 'True'}</td>
                                <td>{announcement.expirationDate}</td>
                                <td>{announcement.userId}</td>
                                <td>{announcement.category}</td>
                                <td>{announcement.language}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {modalContent}
            </Modal>
        </div>
    );
}

export default announcementList;
