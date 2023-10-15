import React, { useState, useEffect } from 'react';
import { useUsers } from '../../hooks/useUsers';
import { useParams, useNavigate } from 'react-router-dom';

interface FormData {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    packageId: string;
    parentId: string;
    position: 'left' | 'right';
    password: string;
    retypePassword: string;
}

interface Package {
    id: string | number;
    packageName: string;
    price: number;
}

const initialFormData: FormData = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    packageId: '',
    parentId: '',
    position: 'left',
    password: '',
    retypePassword: ''
};

interface RegisterNewUserProps {
    onClose: () => void;
    parentID: number | null; // Define the parentID prop
}

// AddUserForm Component
const RegisterNewUser: React.FC<RegisterNewUserProps> = ({ onClose, parentID }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        ...initialFormData,
        parentId: parentID !== null ? parentID.toString() : '', // Initialize the parentId field
    });
    const [response, setResponse] = useState<string | null>(null);
    const { registerUser, loading ,packages, fetchPackages} = useUsers();

    useEffect(() => {
        fetchPackages();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.retypePassword) {
            setResponse("Passwords do not match");
            return;
        }
        try {
            const data = await registerUser(formData);
            setResponse(JSON.stringify(data, null, 2));
            onClose();
        } catch (error:any) {
            setResponse(`Error: ${error.message}`);
        }
    };

    return (
        <>
        {loading && <p>Loading...</p>}
        <form onSubmit={handleSubmit} className={"formGrid"}>
            <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <input
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
            <select
                value={formData.packageId}
                onChange={(e) => setFormData({ ...formData, packageId: e.target.value })}
            >
                <option value="">Select a package</option>
                {packages.map((pkg: Package) => (
                    <option key={pkg.id} value={pkg.id}>
                        {pkg.packageName} - ${pkg.price}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Parent ID"
                value={formData.parentId}
                onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
            />
            <div className={"formRow"}>
                <label>
                    <input
                        type="radio"
                        name="position"
                        value="left"
                        checked={formData.position === 'left'}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value as 'left' | 'right' })}
                    />
                    Left
                </label>
                <label>
                    <input
                        type="radio"
                        name="position"
                        value="right"
                        checked={formData.position === 'right'}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value as 'left' | 'right' })}
                    />
                    Right
                </label>
            </div>
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <input
                type="password"
                placeholder="Retype Password"
                value={formData.retypePassword}
                onChange={(e) => setFormData({ ...formData, retypePassword: e.target.value })}
            />
            <div className={"formRow"}>
                <button type="submit" disabled={loading}>Register User</button>
            </div>
        </form>
        </>
    );
}

export default RegisterNewUser;