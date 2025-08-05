import React from "react";
import { Clock, BookOpen } from "lucide-react";

const data = [
    { subject: "Mathematics", hours: 6, color: "bg-indigo-500" },
    { subject: "Science", hours: 4.5, color: "bg-green-500" },
    { subject: "English", hours: 3, color: "bg-yellow-500" },
    { subject: "Social Studies", hours: 2.5, color: "bg-rose-400" },
    { subject: "Computer", hours: 1.5, color: "bg-purple-500" },
];

const totalHours = data.reduce((acc, curr) => acc + curr.hours, 0);

const LearningTimeReportCard = () => {
    return (
        <div className="w-full bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    <Clock size={16} /> Learning Time Report
                </h3>
                <span className="text-xs text-gray-500">Last 7 Days</span>
            </div>

            {/* Total */}
            <div className="mb-4">
                <p className="text-lg font-bold text-indigo-600">{totalHours.toFixed(1)} hrs</p>
                <p className="text-xs text-gray-500">Total time spent on learning</p>
            </div>

            {/* Breakdown */}
            <div className="space-y-3">
                {data.map((item, idx) => {
                    const percentage = ((item.hours / totalHours) * 100).toFixed(1);
                    return (
                        <div key={idx}>
                            <div className="flex justify-between text-xs text-gray-700 font-medium mb-1">
                                <span className="flex items-center gap-1">
                                    <BookOpen size={12} />
                                    {item.subject}
                                </span>
                                <span>{item.hours} hrs</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`${item.color} h-full`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LearningTimeReportCard;
