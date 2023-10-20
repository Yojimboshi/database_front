import React, { useState } from 'react';

interface RegisterNewUserProps {
    onClose: () => void;
}

// AddUserForm Component
const RegisterNewUser: React.FC<RegisterNewUserProps> = ({ onClose }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <>
            <div className='bg-slate-500 flex'>
                <div className='text-black'>
                    <h3 className=''>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                    </h3>
                </div>
                <div></div>
            </div>
        </>
    );
}

export default RegisterNewUser;