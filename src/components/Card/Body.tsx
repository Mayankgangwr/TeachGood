import type React from "react";

interface ICardPreviewProps {
    children?: React.ReactNode;
    className?: string;
}

export const CardPreview: React.FC<ICardPreviewProps> = ({ children, className = "" }) => (
    <div className={`px-4 py-3 flex flex-col border-b border-gray-100 items-center gap-3 ${className}`}>
        {children}
    </div>
);


