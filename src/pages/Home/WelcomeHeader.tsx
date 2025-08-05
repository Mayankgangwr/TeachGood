import React from 'react';
import Styles from "./Home.module.scss"
import { CalendarDaysIcon } from 'lucide-react';
import clsx from 'clsx';
import { Button } from '../../components';

const WelcomeHeader = ({ studentName }: { studentName: string }) => {
    const currentDate = new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const getInitials = (name: string) => {
        const parts = name.trim().split(' ');
        if (parts.length === 1) {
            return parts[0].charAt(0);
        }
        return `${parts[0][0]}${parts[parts.length - 1][0]}`;
    };


    return (
        <div className={clsx(Styles.WelcomeHeader, "relative overflow-hidden rounded-2xl p-4 bg-gradient-to-tr from-indigo-50 via-white to-sky-50 shadow-sm border border-gray-200")}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xl flex items-center justify-center shadow-sm">
                        {getInitials(studentName)}
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
                            Welcome back, {studentName}!
                        </h1>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <CalendarDaysIcon className="w-4 h-4 text-gray-400" />
                            <span>{currentDate}</span>
                        </p>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <Button variant="primary" children="View Schedule" />
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

export default WelcomeHeader;
