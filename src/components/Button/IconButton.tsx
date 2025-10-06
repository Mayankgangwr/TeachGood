import React, { type ButtonHTMLAttributes, type FC } from "react";
import { Loader2 } from "../Loader";
import Styles from "./Button.module.scss";

export type Variant = "primary" | "secondary" | "danger" | "ghost";
export type Size = "sm" | "md" | "lg";

interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  icon: React.ReactNode;
  fullWidth?: boolean;
}

const IconButton: FC<IIconButtonProps> = ({
  variant = "danger",
  size = "sm",
  isLoading = false,
  icon,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}) => {
  const variantClasses: Record<Variant, string> = {
    primary: "bg-[#0f6cbd] text-[#ffffff] hover:bg-[#115ea3]",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    ghost: "bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-gray-300",
  };

  const sizeClasses: Record<Size, string> = {
    sm: "p-[6px] text-sm rounded-sm",
    md: "p-[8px] text-base rounded-[3px]",
    lg: "p-[12px] text-xl rounded-[4px]",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      disabled={isLoading || disabled}
      className={`${Styles.button} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className} flex items-center justify-center`}
      {...props}
    >
      {isLoading ? (
        <Loader2 variant={variant} className="w-4 h-4 animate-spin" />
      ) : (
        icon
      )}
    </button>
  );
};

export default IconButton;
