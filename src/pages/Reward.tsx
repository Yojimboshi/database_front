import React, { useState } from 'react';

interface RegisterNewUserProps {
    onClose: () => void;
}

// AddUserForm Component
const RegisterNewUser: React.FC<RegisterNewUserProps> = ({ onClose }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <>
            <div className='bg-slate-500'>
                <h1>Something</h1>
            </div>
        </>
    );
}

export default RegisterNewUser;