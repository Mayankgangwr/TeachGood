import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Styles from "./Dailog.module.scss";
interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children?: React.ReactNode;
    actions?: React.ReactNode;
    closeOnOutsideClick?: boolean; // NEW
}

const Dialog: React.FC<DialogProps> = ({
    isOpen,
    onClose,
    title,
    description,
    children,
    actions,
    closeOnOutsideClick = false, // default false
}) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                closeOnOutsideClick &&
                dialogRef.current &&
                !dialogRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, closeOnOutsideClick, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className={`${Styles.Dailog} fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4`}>
            <div className={`${Styles.Body}`} ref={dialogRef}>
                <X
                    size={24}
                    strokeWidth={2}
                    className="absolute top-6 right-6 text-gray-600 hover:text-gray-800"
                    onClick={onClose}
                />
                <h2 className={`${Styles.Header} text-xl font-bold text-gray-800 mb-1`}>{title}</h2>
                <div className={`${Styles.Content} m-0.5 p-0.5 text-base font-normal min-h-8 overflow-y-auto`}>
                    {description}
                </div>
                <div className={`${Styles.Content} m-0.5 p-0.5 text-base font-normal min-h-8 overflow-y-auto`}>
                    {children}
                </div>
                <div className={`${Styles.Footer} m-0.5 p-0.5 text-sm font-normal min-h-8 overflow-y-auto`}>
                    {actions || null}
                </div>
            </div>

        </div >,
        document.body
    );
};

export default Dialog;
