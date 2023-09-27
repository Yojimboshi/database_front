// src/components/testApi/Toast.tsx
import React from 'react';
import './Toast.css';

interface ToastProps {
    message: string;
    visible: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, visible }) => {
    if (!visible) return null;

    return (
        <div className="toast">
            {message}
        </div>
    );
}

export default Toast;