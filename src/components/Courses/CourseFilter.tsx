import type React from "react";
import Styles from "./Courses.module.scss";
import clsx from "clsx";

interface ICourseFilterProps {
    className?: any;
}

const CourseFilter: React.FC<ICourseFilterProps> = ({ className }) => {
    return (
        <div className={clsx(Styles.courseFilter, 'w-full', className)}>
            <h1>Course filter</h1>
        </div>
    )
}

export default CourseFilter;