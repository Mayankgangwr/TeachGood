import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { IAuthResponse } from "../../../Types/auth";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux.hook";
// import Logout from "../../Logout/Logout";

interface IUserLoggedStatusProps { }

const UserLoggedStatus: React.FC<IUserLoggedStatusProps> = () => {

    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const [isOpen, setIsOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const handleToggleMenu = () => {
        setShowMenu((prev) => !prev);
    };

    const handleAuthModel = () => {
        if (isAuthenticated) {
            setIsOpen((prev) => !prev);
            setShowMenu(false);
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="relative">
            <div className="flex gap-3 items-center">
                {/* Alert Icon */}
                <div className="text-red-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.75 15h-1.5v-1.5h1.5V17zm0-3h-1.5V7h1.5v7z" />
                    </svg>
                </div>

                {/* User Info & Dropdown */}
                <div className="relative flex items-center gap-2 cursor-pointer" onClick={handleToggleMenu}>
                    {/* Avatar Circle */}
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                        {user?.name}
                    </div>
                    <div className="flex flex-col text-sm">
                        <span className="font-medium">{user?.name ?? "User"}</span>
                        <span className="text-green-500 text-xs">Online</span>
                    </div>

                    {/* Dropdown Icon */}
                    <svg
                        className={`w-4 h-4 transform transition-transform ${showMenu ? "rotate-180" : "rotate-0"
                            }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 011.08 1.04l-4.24 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>

            {/* Dropdown Menu */}
            {showMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-md z-50">
                    <button
                        onClick={handleAuthModel}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                    >
                        {isAuthenticated ? "Logout" : "Login"}
                    </button>
                </div>
            )}

            {/* <Logout isOpen={isOpen} handleLogoutModel={handleAuthModel} /> */}
        </div>
    );
};

export default UserLoggedStatus;
