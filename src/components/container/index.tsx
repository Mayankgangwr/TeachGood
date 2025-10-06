import React, { Children } from "react";
import Styles from "./container.module.scss";
import clsx from "clsx";
interface IContainerProps {
    children: React.ReactNode;
    className?: any;
}

const Container: React.FC<IContainerProps> = ({ children, className }) => {
    return <div className={`w-full bg-[#eff3f4] py-2 md:py-2 lg:py-3 xl:py-4 px-[4px] md:px-2 lg:px-3 xl:px-4 ${Styles.container} ${className}`}>{children}</div>;
};
export default Container;

export const BoxContainer: React.FC<IContainerProps> = ({ children, className }) => {
    return <div className={clsx('p-2 md:p-3 bg-white rounded-lg border border-gray-200 shadow-sm', Styles.boxContainer, className)}>{children}</div>
}
