import React from "react";
import { CalendarDays, Clock, Video } from "lucide-react";

interface ClassItem {
    title: string;
    teacher: string;
    date: string; // e.g. "Mon, 5 Aug 2025"
    time: string; // e.g. "09:00 AM - 10:00 AM"
    isLive: boolean;
}

const mockClasses: ClassItem[] = [
    {
        title: "Mathematics - Algebra",
        teacher: "Mr. Sharma",
        date: "Mon, 5 Aug 2025",
        time: "09:00 AM - 10:00 AM",
        isLive: true,
    },
    {
        title: "Science - Physics",
        teacher: "Ms. Neha",
        date: "Mon, 5 Aug 2025",
        time: "11:30 AM - 12:30 PM",
        isLive: false,
    },
    {
        title: "English - Grammar",
        teacher: "Mrs. Kapoor",
        date: "Tue, 6 Aug 2025",
        time: "02:00 PM - 03:00 PM",
        isLive: true,
    },
];

const UpcomingClasses: React.FC = () => {
    return (
        <div className="w-full rounded-2xl bg-white shadow-sm border border-gray-100 p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-800">Upcoming Classes</h3>
                <button className="text-xs text-indigo-600 hover:underline">View All</button>
            </div>

            {/* Class List */}
            <div className="space-y-3">
                {mockClasses.map((cls, index) => (
                    <div
                        key={index}
                        className="p-3 border border-gray-100 shadow-md rounded-xl bg-gradient-to-br from-white to-indigo-50 flex justify-between items-center hover:shadow transition"
                    >
                        <div>
                            <p className="text-sm font-medium text-gray-800">{cls.title}</p>
                            <p className="text-xs text-gray-500">By {cls.teacher}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                    <CalendarDays size={14} /> {cls.date}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock size={14} /> {cls.time}
                                </span>
                            </div>
                        </div>
                        <div>
                            {cls.isLive ? (
                                <button className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-md flex items-center gap-1 shadow hover:bg-indigo-700">
                                    <Video size={14} />
                                    Join
                                </button>
                            ) : (
                                <span className="text-xs text-gray-400">Scheduled</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingClasses;
