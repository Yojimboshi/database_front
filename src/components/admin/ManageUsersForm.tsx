import { FC } from 'react';
import axios from 'axios';
import { useUserManagement } from '../../hooks/useUserManagement';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ManageUsersForm: FC = () => {
    const { newUserForm, handleCreateUser } = useUserManagement();
    
    return (
        <div className="add-user-form">
            <h4>Add New User</h4>
            <button onClick={handleCreateUser}>Add User</button>
        </div>
    );
};

export default ManageUsersForm;
