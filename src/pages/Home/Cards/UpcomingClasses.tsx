import React from "react";
import { CalendarDays, Clock, Video } from "lucide-react";
import { useAppSelector } from "../../../hooks/redux.hook";
import moment from "moment";

const UpcomingClasses: React.FC = () => {
    const { classes } = useAppSelector((state) => ({
        classes: state.classSession.classes,
        user: state.auth.user
    }));

    const formatDate = (dateString: string) =>
        moment(dateString).format("ddd, D MMM YYYY");

    const formatTimeRange = (start: string, end: string) =>
        `${moment(start).format("hh:mm A")} - ${moment(end).format("hh:mm A")}`;
    return (
        <div className="w-full rounded-2xl bg-white shadow-sm border border-gray-100 p-2 md:p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-800">Upcoming Classes</h3>
                <button className="text-xs text-indigo-600 hover:underline">View All</button>
            </div>

            {/* Class List */}
            <div className="space-y-3">
                {classes.map((cls, index) => (
                    <div
                        key={index}
                        className="p-2 md:p-3 border border-gray-100 shadow-md rounded-xl bg-gradient-to-br from-white to-indigo-50 flex justify-between items-center hover:shadow transition"
                    >
                        <div>
                            <p className="text-base font-medium text-gray-800">{cls.batch.courseName}</p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-800">{cls.title}</span>
                                {" "}by{" "}
                                <span className="text-gray-500">{cls.teacher?.name || "-"}</span>
                            </p>

                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                    <CalendarDays size={14} /> {formatDate(cls.startTime)}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock size={14} /> {formatTimeRange(cls.startTime, cls.endTime)}
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
