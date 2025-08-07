import React from "react";
import { Bell, Info, AlertCircle } from "lucide-react";

interface UpdateItem {
    title: string;
    message: string;
    date: string; // e.g. "6 Aug 2025, 10:45 AM"
    type?: "info" | "alert" | "general";
}

const mockUpdates: UpdateItem[] = [
    {
        title: "System Maintenance",
        message: "The platform will be under maintenance from 2 AM to 4 AM.",
        date: "6 Aug 2025, 10:00 AM",
        type: "alert",
    },
    {
        title: "New Feature Released",
        message: "Live class recording feature is now available for all users.",
        date: "5 Aug 2025, 06:00 PM",
        type: "info",
    },
    {
        title: "Reminder",
        message: "Don't forget to submit your assignment for Science class.",
        date: "5 Aug 2025, 02:30 PM",
        type: "general",
    },
];

const UpdatesPanel: React.FC = () => {
    return (
        <div className="w-full rounded-2xl bg-white shadow-sm border border-gray-100 p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                    <Bell size={16} /> Updates
                </h3>
                <button className="text-xs text-indigo-600 hover:underline">View All</button>
            </div>

            {/* Update List */}
            <div className="space-y-3">
                {mockUpdates.map((update, index) => {
                    const icon =
                        update.type === "alert" ? (
                            <AlertCircle size={16} className="text-red-500" />
                        ) : update.type === "info" ? (
                            <Info size={16} className="text-blue-500" />
                        ) : (
                            <Bell size={16} className="text-gray-400" />
                        );

                    return (
                        <div
                            key={index}
                            className="p-3 border border-gray-100 shadow-sm rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow transition"
                        >
                            <div className="flex items-start gap-3">
                                <div className="pt-1">{icon}</div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-800">
                                        {update.title}
                                    </p>
                                    <p className="text-xs text-gray-500">{update.message}</p>
                                    <p className="text-[11px] text-gray-400 mt-1">{update.date}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UpdatesPanel;
