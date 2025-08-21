import React from "react";
import clsx from "clsx";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input: React.FC<IInputProps> = ({ label, error, className, type, ...props }) => {
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

            <input
                {...props}
                type={type}
                className={clsx(
                    "border rounded px-3 py-2 text-sm outline-none transition-colors",
                    // remove arrows for number inputs
                    type === "number" && "appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
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

export default Input;
