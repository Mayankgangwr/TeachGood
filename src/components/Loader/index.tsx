import React from 'react'

const Loader: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
    )
}

export default Loader




interface LoaderProps {
    className?: string;
    variant?: "primary" | "secondary" | "danger" | "ghost";
}

const Loader2: React.FC<LoaderProps> = ({ className = "w-4 h-4", variant = "primary" }) => {
    const colorByVariant: Record<string, string> = {
        primary: "border-white",
        secondary: "border-gray-900",
        danger: "border-white",
        ghost: "border-gray-800",
    };

    return (
        <div
            className={`border-2 border-t-transparent rounded-full animate-spin ${colorByVariant[variant]} ${className}`}
        />
    );
};

export { Loader2 };


