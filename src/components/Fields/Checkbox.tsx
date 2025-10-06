import React from "react";

interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    checked: boolean;
}

const Checkbox: React.FC<ICheckboxProps> = ({
    label,
    checked,
    ...rest
}) => {
    return (
        <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                {...rest}
                className="h-4.5 w-4.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            {label && <span className="text-md text-gray-700 mt-0.5">{label}</span>}
        </label>
    );
};

export default Checkbox;
