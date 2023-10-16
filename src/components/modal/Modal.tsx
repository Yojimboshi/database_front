// src/components/modal/Modal.tsx
import React, { useEffect } from 'react';
import './Modal.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    type?: "add-user" | "user-details";  // Define type to determine modal style
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, type = "add-user" }) => {
        // Add an event listener to close the modal when clicking outside
        useEffect(() => {
            if (isOpen) {
                const handleOutsideClick = (event: MouseEvent) => {
                    const target = event.target as HTMLElement;
                    if (!target.closest('.modal-content')) {
                        onClose();
                    }
                };
    
                document.addEventListener('mousedown', handleOutsideClick);
    
                return () => {
                    document.removeEventListener('mousedown', handleOutsideClick);
                };
            }
        }, [isOpen, onClose]);
    if (!isOpen) return null;

    const modalClass = `modal-content ${type}`;

    return (
        <div className="modal-overlay">
            <div className={modalClass}>
                {children}
                <button className="modal-close-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default Modal;