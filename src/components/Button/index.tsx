import React, { type ButtonHTMLAttributes, type FC } from "react";
import { Loader2 } from "../Loader";
import Styles from "./Button.module.scss"
type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
    children: React.ReactNode;
}

const Button: FC<IButtonProps> = ({
    variant = "danger",
    size = "sm",
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    children,
    className = "",
    disabled,
    ...props
}) => {
    const variantClasses: Record<Variant, string> = {
        primary:
            "bg-[#0f6cbd] text-[#ffffff] hover:bg-[#115ea3]",
        secondary:
            "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
        danger:
            "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        ghost:
            "bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-gray-300",
    };

    const sizeClasses: Record<Size, string> = {
        sm: "px-[12px] py-[5px] text-sm font-semibold min-w-24 rounded-sm",
        md: "px-[14px] py-[7px] text-base font-semibold min-w-28 rounded-[6px]",
        lg: "px-[16px] py-[9px] text-xl font-bold min-w-32 rounded-[8px]",
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
        <button
            disabled={isLoading || disabled}
            className={`${Styles.button} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
            {...props}
        >
            {isLoading ? (
                <Loader2 variant={variant} className="w-4 h-4 mr-2" />
            ) : (
                leftIcon && <span className="mr-2">{leftIcon}</span>
            )}

            {children}

            {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
        </button>
    );
};

export default Button;
