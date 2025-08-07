import { BarChart3 } from "lucide-react";
import React from "react";

const PerformanceCard: React.FC = () => {
    const bars = [10, 20, 35, 50, 40, 15, 60];

    return (
        <div className="w-full rounded-2xl bg-white shadow-sm border border-gray-100 p-4 relative overflow-hidden hidden md:block">
            {/* Decorative icon */}
            <div className="absolute top-3 right-3 text-gray-300">
                <BarChart3/>
            </div>

            {/* Title and description */}
            <h3 className="text-base font-semibold text-gray-800">Performance</h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">7 Courses Completed</p>

            {/* Responsive Bar Chart */}
            <div className="flex items-end gap-2 h-60 w-full mt-2">
                {bars.map((height, index) => {
                    const isLast = index === bars.length - 1;
                    return (
                        <div key={index} className="flex-1 flex flex-col justify-end h-full rounded-full bg-gray-200 overflow-hidden">
                            <div
                                className={`w-full rounded-full transition-all ${isLast ? "bg-purple-400" : "bg-black"}`}
                                style={{ height: `${height}%` }}
                            />
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default PerformanceCard;
