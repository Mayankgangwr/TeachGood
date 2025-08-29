import clsx from "clsx";
import React from "react";
import Styles from "./Fields.module.scss";
interface ProgressInputProps {
    id: string;
    label?: string;
    value: number;
    min?: number;
    max?: number;
    step?: number;
    onChange: (value: number) => void;
    error?: string;
    readOnly?: boolean;
}

const ProgressInput: React.FC<ProgressInputProps> = ({
    id,
    label,
    value,
    min = 0,
    max = 100,
    step = 1,
    onChange,
    error,
    readOnly = false
}) => {
    return (
        <div className="flex flex-col gap-3 w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm font-semibold text-gray-800"
                >
                    {label} ({value}%)
                </label>
            )}

            <input
                id={id}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className={clsx(Styles.Slider, `w-full h-2 cursor-pointer appearance-none rounded-lg`)}
                style={{
                    background: `linear-gradient(to right, #2563eb ${value}%, #e5e7eb ${value}%)`,
                }}
                readOnly={readOnly}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default ProgressInput;
