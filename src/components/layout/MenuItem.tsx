import React, { useState, type JSX } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface IMenuItem {
    icon?: JSX.Element;
    title?: string;
    path?: string;
    children?: IMenuItem[];
}

interface IMenuItemProps {
    menuItem: IMenuItem;
    level?: number;
}

const ActionMenuItem: React.FC<IMenuItemProps> = ({ menuItem, level = 0 }) => {
    const { icon, title, path = "/", children = [] } = menuItem;
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const isActive = location.pathname === path;

    const handleClick = () => {
        if (children.length > 0) {
            setOpen((prev) => !prev);
        } else {
            navigate(path);
        }
    };

    return (
        <li
            className={`relative group px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all ${isActive ? "bg-blue-50 font-semibold text-blue-600" : "text-gray-800"
                }`}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <div className="flex items-center justify-between" onClick={handleClick}>
                <div className="flex items-center space-x-2">
                    {icon && <span className="text-lg">{icon}</span>}
                    <span className="text-sm">{title}</span>
                </div>
                {children.length > 0 && (
                    <span className="ml-2 text-xs transform group-hover:rotate-90 transition-transform">
                        ▶
                    </span>
                )}
            </div>

            {children.length > 0 && open && (
                <ul
                    className={`absolute top-0 left-full mt-0 ml-1 min-w-[180px] bg-white border border-gray-200 shadow-lg rounded-lg z-50 py-1`}
                >
                    {children.map((child) => (
                        <ActionMenuItem key={child.path} menuItem={child} level={level + 1} />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default ActionMenuItem;
