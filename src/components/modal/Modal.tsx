import './Modal.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    type?: "add-user" | "user-details";  // Define type to determine modal style
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, type = "add-user" }) => {
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