import React from "react";
import clsx from "clsx";

interface Option {
  label: string;
  value: string;
}

interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Option[];
  selectValue: string;
}

const Select: React.FC<ISelectProps> = ({ label, error, options, selectValue, className, ...props }) => {
  // const value = options.find((option) => option.value === selectValue)?.label;
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="mb-1 text-sm font-semibold"
        >
          {label}
          <span className="text-red-600"> *</span>
        </label>
      )}

      <select
        {...props}
        className={clsx(
          "border rounded px-3 py-2 text-sm outline-none transition-colors bg-white",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-300"
            : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300",
          className
        )}
        value={selectValue}
      >
        {[{ label: `Select ${label}`, value: "" }, ...options].map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
