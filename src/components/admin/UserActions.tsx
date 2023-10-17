// src/components/admin/UserActions.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import './UserActions.css';

interface AddUserFormData {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    packageId: string;
    parentId: string;
    position: 'left' | 'right' | '';
    retypePassword: string;
    isEmpty: boolean;
}

interface UserDetailsProps {
    user: any;  // Adjust the 'any' type as necessary
    onClose: () => void;
    refreshUserDetails: () => void;  // Add this line
}

interface Package {
    id: string | number;
    packageName: string;
    price: number;
    sponsorBonusPercentage: number;
    matchingBonusPercentage: number;
    hierarchyBonusPercentage: number;
    maxHierarchyChildren: number;
}

// AddUserForm Component
export const AddUser: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState<AddUserFormData>({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        packageId: '',
        parentId: '',
        position: '',
        retypePassword: '',
        isEmpty: false
    });

    const { addUser, error, loading, packages, fetchPackages } = useAdmin();
    const navigate = useNavigate();

    useEffect(() => {
        fetchPackages();
    }, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addUser(formData);
            onClose();
        } catch (error) {
            console.error("Error adding user:", error);
        }
    }

    return (
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
                <label>
                    <input
                        type="checkbox"
                        checked={formData.isEmpty}
                        onChange={(e) => setFormData({ ...formData, isEmpty: e.target.checked })}
                    />
                    Is Empty
                </label>
            </div>

            <div className={"formRow"}>
                <button type="submit" disabled={loading}>Add User</button>
            </div>
        </form>
    );
}

// UserDetails Component
export const UserDetails: React.FC<UserDetailsProps> = ({ user, onClose, refreshUserDetails }) => {
    const { toggleAccountStatus } = useAdmin();

    const handleToggleStatus = async (newStatus: 'ban' | 'restrict' | 'activate') => {
        try {
            await toggleAccountStatus(user.id, newStatus);

            refreshUserDetails();
        } catch (error) {
            console.error("Error toggling user status:", error);
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h3>Details for {user.username}</h3>
            <div className="user-details-container">
                <div className="modal-field">
                    <strong>Username:</strong>
                    <span>{user.username}</span>
                </div>

                <div className="modal-field">
                    <strong>Full Name:</strong>
                    <span>{user.firstName} {user.lastName}</span>
                </div>

                <div className="modal-field">
                    <strong>Email:</strong>
                    <span>{user.email}</span>
                </div>

                <div className="modal-field">
                    <strong>Role:</strong>
                    <span>{user.role}</span>
                </div>

                <div className="modal-field">
                    <strong>Payment Method:</strong>
                    <span>{user.paymentMethod}</span>
                </div>

                <div className="modal-field">
                    <strong>Payment Details:</strong>
                    <span>{user.paymentDetails}</span>
                </div>

                <div className="modal-field">
                    <strong>Referral ID:</strong>
                    <span>{user.referralId}</span>
                </div>

                <div className="modal-field">
                    <strong>Referred By (User ID):</strong>
                    <span>{user.referredBy}</span>
                </div>

                <div className="modal-field">
                    <strong>Sponsor Bonus:</strong>
                    <span>{user.sponsorBonus}</span>
                </div>

                <div className="modal-field">
                    <strong>Matching Bonus:</strong>
                    <span>{user.matchingBonus}</span>
                </div>

                <div className="modal-field">
                    <strong>Hierarchy Bonus:</strong>
                    <span>{user.hierarchyBonus}</span>
                </div>

                <div className="modal-field">
                    <strong>Is Empty:</strong>
                    <span>{user.isEmpty ? 'Yes' : 'No'}</span>
                </div>
                <div className="modal-field">
                    <strong>Status:</strong>
                    <span>{user.accountStatus}</span>
                    <button disabled={user.accountStatus === 'active'} onClick={() => handleToggleStatus('activate')}>
                        Activate
                    </button>
                    <button disabled={user.accountStatus === 'banned'} onClick={() => handleToggleStatus('ban')}>
                        Ban
                    </button>
                    <button disabled={user.accountStatus === 'restricted'} onClick={() => handleToggleStatus('restrict')}>
                        Restrict
                    </button>
                </div>

            </div>
        </div>
    );
}

// BanUser Component
export const UpdateUser: React.FC = () => {
    const { userId } = useParams();
    return (
        <div>
            {/* Implementation of BanUser using userId */}
        </div>
    );
}
