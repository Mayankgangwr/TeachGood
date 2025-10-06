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
                    className="block text-sm font-medium text-gray-700"
                >
                    {label}
                    <span className="text-red-600"> *</span>
                </label>
            )}

            <input
                {...props}
                type={type}
                className={clsx(
                    "mt-1 w-full px-4 py-2 border rounded-md text-sm transition-colors focus:outline-none",
                    // remove arrows for number inputs
                    type === "number" &&
                        "appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                    error
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                        : "border-gray-300 focus:border-gray-300 focus:ring-2 focus:ring-blue-500",
                    className
                )}
            />

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default Input;
