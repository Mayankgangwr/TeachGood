import type React from "react";
import Styles from "./Classes.module.scss";
import clsx from "clsx";

interface IClassesFilterProps {
    className?: any;
}

const ClassesFilter: React.FC<IClassesFilterProps> = ({ className }) => {
    return (
        <div className={clsx(Styles.classesFilter, 'w-full', className)}>
            <h1>Class filter</h1>
        </div>
    )
}

export default ClassesFilter;