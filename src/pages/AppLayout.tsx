import React, { ReactNode } from 'react';
import { Link, Outlet } from 'react-router-dom';

interface AppLayoutProps {
    children?: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <div>
            <div className="app-navigation">
                <Link to="/admin" className="app-link">Admin</Link>
                <Link to="/user" className="app-link">User</Link>
            </div>
            {children}
            <Outlet />
        </div>
    );
}

export default AppLayout;
