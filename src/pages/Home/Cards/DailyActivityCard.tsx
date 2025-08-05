import React from "react";
import { CalendarClock, BookOpenCheck, FileText, TimerReset } from "lucide-react";
import clsx from "clsx";

const activities = [
    {
        type: "class",
        title: "Mathematics - Algebra",
        time: "10:00 AM - 11:00 AM",
        date: "Today",
        status: "upcoming",
    },
    {
        type: "test",
        title: "Science Quiz",
        time: "12:30 PM - 1:00 PM",
        date: "Today",
        status: "current",
    },
    {
        type: "assignment",
        title: "English Homework",
        time: "Completed at 8:00 AM",
        date: "Today",
        status: "completed",
    },
    {
        type: "class",
        title: "History - World War II",
        time: "Yesterday 3:00 PM",
        date: "Previous",
        status: "completed",
    },
];

const iconMap: any = {
    class: <CalendarClock size={16} />,
    test: <TimerReset size={16} />,
    assignment: <FileText size={16} />,
};

const DailyActivityCard = () => {
    return (
        <div className="w-full bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    <BookOpenCheck size={16} /> Daily Activity
                </h3>
                <span className="text-xs text-gray-500">Updated today</span>
            </div>

            {/* Activity List */}
            <div className="space-y-4">
                {activities.map((item, idx) => (
                    <div
                        key={idx}
                        className={clsx(
                            "flex items-start gap-3 rounded-lg p-3 border",
                            {
                                "border-yellow-100 bg-yellow-50": item.status === "upcoming",
                                "border-green-100 bg-green-50": item.status === "current",
                                "border-gray-100 bg-gray-50 text-gray-400": item.status === "completed",
                            }
                        )}
                    >
                        <div className="text-gray-600">{iconMap[item.type]}</div>
                        <div className="flex-1">
                            <h4 className="text-sm font-medium">{item.title}</h4>
                            <p className="text-xs text-gray-500">{item.time}</p>
                        </div>
                        <div>
                            <span
                                className={clsx(
                                    "text-xs font-semibold",
                                    {
                                        "text-yellow-500": item.status === "upcoming",
                                        "text-green-600": item.status === "current",
                                        "text-gray-400": item.status === "completed",
                                    }
                                )}
                            >
                                {item.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyActivityCard;
