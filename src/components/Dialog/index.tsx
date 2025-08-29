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
    closeOnOutsideClick?: boolean;
}

const Dialog: React.FC<DialogProps> = ({
    isOpen,
    onClose,
    title,
    description,
    children,
    actions,
    closeOnOutsideClick = false,
}) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    // Disable background scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200/50 backdrop-blur-sm px-1 md:px-4"
            onMouseDown={(e) => {
                // Only close if clicked directly on overlay
                if (closeOnOutsideClick && e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                className={`${Styles.Body} relative bg-white max-w-[99%] md:max-w-[600px] w-full p-4 rounded-md md:rounded-lg shadow-lg`}
                ref={dialogRef}
                onMouseDown={(e) => e.stopPropagation()} // Prevent inner clicks from closing
            >
                {/* Close Button */}
                <X
                    size={24}
                    strokeWidth={2}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 cursor-pointer"
                    onClick={onClose}
                />

                {/* Title */}
                {title && (
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
                )}

                {/* Description */}
                {description && (
                    <div className="mb-2 text-base text-gray-600">{description}</div>
                )}

                {/* Children */}
                <div className="mb-3 text-base text-gray-700">{children}</div>

                {/* Actions */}
                {actions && (
                    <div className="mt-3 flex justify-end gap-2">{actions}</div>
                )}
            </div>
        </div>,
        document.body
    );
};

export default Dialog;
