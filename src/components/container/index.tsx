import React from "react";

interface IContainerProps {
    children: React.ReactNode;
    className?: any;
}

const Container: React.FC<IContainerProps> = ({ children, className }) => {
    return <div className={`w-full h-auto bg-[#eff3f4] py-2 md:py-2 lg:py-3 xl:py-4 px-[4px] md:px-2 lg:px-3 xl:px-4 ${className}`}>{children}</div>;
};
export default Container;