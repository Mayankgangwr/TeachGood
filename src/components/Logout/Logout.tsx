import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux.hook';
import { logoutUser } from '../../features/auth/auth.actions';
import ConfirmationDialog from '../Dialog/ConfirmationDialog';

interface ILogoutProps {
    isOpen: boolean;
    handleClose: () => void;
}

const Logout: React.FC<ILogoutProps> = ({ isOpen, handleClose }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleConfirmLogout = async () => {
        try {
            await dispatch(logoutUser());
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            handleClose();
        }
    };


    return (
        <>
            <ConfirmationDialog
                open={isOpen}
                onClose={handleClose}
                onConfirm={handleConfirmLogout}
                title="Confirm Logout"
                description="Are you sure you want to log out? You will need to log in again to access your account."
                confirmLabel="Log Out"
                cancelLabel="Cancel"
                loadingText="Logging out..."
            />
        </>
    );
};

export default Logout;
