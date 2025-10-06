import type React from "react";

interface ICardFooterProps {
    children: React.ReactNode;
    className?: string;
}

export const CardFooter: React.FC<ICardFooterProps> = ({ children, className = "" }) => (
    <div className={`flex items-center gap-2 p-4 ${className}`}>{children}</div>
);
