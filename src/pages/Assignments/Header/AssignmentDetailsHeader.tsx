import React from "react";

import clsx from "clsx";
import { Button } from "../../../components";
import AssignmentForm from "../AssignmentForm";
import { useAppSelector } from "../../../hooks/redux.hook";
import { UserRoles } from "../../../constants";
import { useNavigate } from "react-router-dom";

interface AssignmentDetailsHeaderProps {
    studentName: string;
    assignmentTitle: string;
    dueDate: string | Date;
    submitted?: boolean;
    className?: any;
}

const AssignmentDetailsHeader: React.FC<AssignmentDetailsHeaderProps> = ({
    studentName,
    assignmentTitle,
    dueDate,
    submitted = false,
    className
}) => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);
    const formattedDueDate = new Date(dueDate).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const getInitials = (name: string) => {
        const parts = name.trim().split(" ");
        if (parts.length === 1) return parts[0].charAt(0);
        return `${parts[0][0]}${parts[parts.length - 1][0]}`;
    };

    return (
        <div
            className={clsx("relative overflow-hidden rounded-2xl p-4 bg-gradient-to-tr from-indigo-50 via-white to-sky-50 shadow-sm border border-gray-200", className
            )}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xl flex items-center justify-center shadow-sm">
                        {getInitials(studentName)}
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
                            {assignmentTitle}
                        </h1>
                        <p className="text-sm text-gray-600 mt-1">
                            {submitted
                                ? "Great job on submitting this assignment!"
                                : `Due on ${formattedDueDate} — let's get it done!`}
                        </p>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    {/* {user && (user.role === UserRoles.Teacher ? <AssignmentForm /> :
                        <Button onClick={() => navigate('/')} variant="primary" >Veiw all assignments</Button>
                    )} */}
                    <AssignmentForm />
                </div>
            </div>

            {/* Decorative Pattern */}
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                <svg width="150" height="150" fill="none" viewBox="0 0 150 150">
                    <circle cx="75" cy="75" r="75" fill="#4f46e5" />
                </svg>
            </div>
        </div>
    );
};

export default AssignmentDetailsHeader;
