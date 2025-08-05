import { ClipboardList } from "lucide-react";
import React from "react";

interface ISummeryCardProps { }

const SummeryCard: React.FC<ISummeryCardProps> = () => {
    const courses = [
        { name: "Mathematics", progress: 80 },
        { name: "English", progress: 80 },
        { name: "Physics", progress: 55 },
        { name: "Biology", progress: 100 },
    ];

    return (
        <div className="w-full rounded-2xl bg-white shadow-sm border border-gray-100 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Learning Summary</h3>
                <button className="text-indigo-600 hover:text-indigo-700 transition-colors duration-200">
                    <ClipboardList className="w-5 h-5" />
                </button>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {courses.map((course) => {
                    const radius = 45;
                    const circumference = 2 * Math.PI * radius;
                    const offset = circumference - (course.progress / 100) * circumference;

                    // Dynamic color class based on progress
                    const color =
                        course.progress >= 80
                            ? "text-green-500"
                            : course.progress >= 50
                                ? "text-yellow-500"
                                : "text-red-500";

                    return (
                        <div
                            key={course.name}
                            className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center gap-4 hover:shadow transition-shadow"
                        >
                            {/* Circular Progress */}
                            <div className="relative w-20 h-20 shrink-0">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle
                                        className="text-gray-200"
                                        cx="50"
                                        cy="50"
                                        r={radius}
                                        strokeWidth="10"
                                        stroke="currentColor"
                                        fill="transparent"
                                    />
                                    <circle
                                        className={color}
                                        cx="50"
                                        cy="50"
                                        r={radius}
                                        strokeWidth="10"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={offset}
                                        strokeLinecap="round"
                                        stroke="currentColor"
                                        fill="transparent"
                                        style={{ transition: "stroke-dashoffset 0.5s ease" }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-sm font-semibold text-gray-800">
                                        {course.progress}%
                                    </span>
                                </div>
                            </div>

                            {/* Course Info */}
                            <div>
                                <h4 className="text-base font-semibold text-gray-900">{course.name}</h4>
                                <p className="text-sm text-gray-500">Course Progress</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SummeryCard;
