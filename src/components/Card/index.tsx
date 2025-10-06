import clsx from "clsx";
import type React from "react";

interface ICardProps {
    children: React.ReactNode;
    onClick?: () => void; // optional click handler
    className?: string; // optional additional classes
}

const Card: React.FC<ICardProps> = ({ children, onClick, className = "" }) => {
    return (
        <div
            className={clsx("flex flex-col justify-between bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 overflow-hidden", className)}
            onClick={() => onClick && onClick()}
        >
            {children}
        </div>
    );
};

export default Card;
