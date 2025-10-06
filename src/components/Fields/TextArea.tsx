import React, { useEffect, useRef } from "react";
import clsx from "clsx";

interface ITextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    maxHeight?: number;
    minHeight?: number;
}

const TextArea: React.FC<ITextAreaProps> = ({ label, error, minHeight= 180, maxHeight = 300, className, ...props }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize function
    const resizeTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // reset height
            textareaRef.current.style.minHeight = `${minHeight}px`;;
            textareaRef.current.style.maxHeight = `${maxHeight}px`;
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    };

    useEffect(() => {
        resizeTextarea();
    }, [props.value]); // adjust height on value change

    return (
        <div className="flex flex-col w-full">
            {label && (
                <label
                    htmlFor={props.id || props.name}
                    className="mb-1 text-sm font-semibold"
                >
                    {label}<span className="text-red-600"> *</span>
                </label>
            )}

            <textarea
                {...props}
                ref={textareaRef}
                onInput={resizeTextarea} // resize while typing
                className={clsx(
                    "border rounded px-3 py-2 text-sm outline-none transition-colors resize-none",
                    error
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-300"
                        : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300",
                    className
                )}
            />

            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default TextArea;
