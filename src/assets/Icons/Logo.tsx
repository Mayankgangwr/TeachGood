import clsx from "clsx";
import type React from "react";

interface ILogoProps {
    className?: any;
}
const Logo: React.FC<ILogoProps> = ({ className = 'text-4xl mb-2' }) => {
    return (
        <h1 className={clsx(className, "font-extrabold text-center")}>
            <span className="text-blue-600">Teach </span>
            <span className="text-gray-800">Good</span>
        </h1>
    )
}

export default Logo;