import React, { useEffect, useRef } from "react";

interface ScheduleItem {
    title: string;
    start: string; // format: "HH:mm"
    end: string;   // format: "HH:mm"
    teacher: string;
    participants: number;
    platform: string;
    color: string;
}

const scheduleData: ScheduleItem[] = [
    {
        title: "Introduction to Spanish",
        start: "15:15",
        end: "17:23",
        teacher: "https://i.pravatar.cc/24?img=1",
        participants: 2,
        platform: "Google Meeting",
        color: "bg-yellow-100 text-yellow-800",
    },
    {
        title: "English for Beginners",
        start: "17:30",
        end: "19:00",
        teacher: "https://i.pravatar.cc/24?img=2",
        participants: 2,
        platform: "Google Meeting",
        color: "bg-blue-100 text-blue-800",
    },
    {
        title: "Introduction to France",
        start: "20:05",
        end: "21:45",
        teacher: "https://i.pravatar.cc/24?img=3",
        participants: 1,
        platform: "Google Meeting",
        color: "bg-purple-100 text-purple-800",
    },
];

const DailyActivityTimeline: React.FC = () => {
    const slotWidth = 140; // width of each hour slot
    const scrollRef = useRef<HTMLDivElement>(null);

    const parseTime = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours + minutes / 60;
    };

    useEffect(() => {
        const now = new Date();
        const currentHour = now.getHours() + now.getMinutes() / 60;
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = currentHour * slotWidth - slotWidth * 2;
        }
    }, []);

    const now = new Date();
    const currentDecimalHour = now.getHours() + now.getMinutes() / 60;
    const timeSlots = Array.from({ length: 24 }, (_, i) => i);
    const today = now.toLocaleDateString(undefined, {
        weekday: "long",
        day: "numeric",
        month: "long",
    });

    const use12HourFormat = now.toLocaleTimeString().toLowerCase().includes("am") || now.toLocaleTimeString().toLowerCase().includes("pm");

    const formatHourLabel = (hour: number) => {
        if (use12HourFormat) {
            const period = hour >= 12 ? "PM" : "AM";
            const hr = hour % 12 === 0 ? 12 : hour % 12;
            return `${hr} ${period}`;
        } else {
            return `${hour.toString().padStart(2, "0")}:00`;
        }
    };

    return (
        <div className="w-full bg-white rounded-2xl border border-gray-100 p-4 shadow-sm overflow-x-auto">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="text-base font-semibold text-gray-800">Daily Activity</h3>
                    <p className="text-xs text-gray-500">Today • {today}</p>
                </div>
                <div className="text-xs text-gray-500">
                    {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
            </div>

            {/* Timeline */}
            <div
                ref={scrollRef}
                className="relative h-40 border-t border-b border-dashed border-gray-300 overflow-x-auto"
            >
                <div
                    className="relative h-full flex items-start"
                    style={{ width: `${slotWidth * 25}px` }} // 24 + extra for padding
                >
                    {/* Spacer for centering */}
                    <div style={{ width: slotWidth / 2 }} />

                    {/* Hour Lines */}
                    {timeSlots.map((hour) => (
                        <div
                            key={hour}
                            className="relative flex flex-col items-center justify-start h-full"
                            style={{ width: `${slotWidth}px` }}
                        >
                            <div
                                className={`text-xs mb-1 ${Math.floor(currentDecimalHour) === hour ? "text-red-500 font-bold" : "text-gray-400"}`}
                            >
                                {formatHourLabel(hour)}
                            </div>
                            <div className="absolute left-0 top-4 bottom-0 border-r border-dashed border-gray-300" />
                        </div>
                    ))}

                    {/* Spacer at end */}
                    <div style={{ width: slotWidth / 2 }} />

                    {/* Event Blocks */}
                    {/* Event Blocks */}
                    {scheduleData.map((event, idx) => {
                        const start = parseTime(event.start);
                        const end = parseTime(event.end);
                        const left = start * slotWidth;
                        const width = (end - start) * slotWidth;

                        return (
                            <div
                                key={idx}
                                className={`group absolute top-6 h-20 p-3 mx-0.5 rounded-xl ${event.color} shadow-sm flex flex-col justify-between cursor-pointer`}
                                style={{
                                    left: `${left}px`,
                                    width: `${width - 4}px`,
                                }}
                            >
                                <div className="text-sm font-medium truncate">{event.title}</div>
                                <div className="flex items-center gap-2 text-xs">
                                    <img
                                        src={event.teacher}
                                        alt="teacher"
                                        className="w-5 h-5 rounded-full border"
                                    />
                                    <span className="text-gray-600">+{event.participants}</span>
                                </div>
                                <div className="text-[11px] text-gray-500">{event.platform}</div>

                                {/* Hover Details */}
                                <div className="absolute bottom-full top-20 left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex items-center justify-start px-3 text-xs bg-gray-950 shadow-md border rounded-md z-50 w-auto h-6">
                                    <div className="text-gray-50">
                                        {event.start} - {event.end}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {/* Current Time Marker */}
                    <div
                        className="absolute top-0 bottom-0 w-0.5 bg-red-500"
                        style={{
                            left: `${currentDecimalHour * slotWidth}px`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default DailyActivityTimeline;
