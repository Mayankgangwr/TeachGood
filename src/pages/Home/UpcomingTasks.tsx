import React, { type JSX } from "react";
import {
    MicIcon,
    BookOpenIcon,
    ClockIcon,
    FileTextIcon,
    ChevronRight
} from "lucide-react";

interface Task {
    title: string;
    subject: string;
    dateGroup: "Today" | "This Week";
    icon: JSX.Element;
    bgColor: string;
}

const tasks: Task[] = [
    {
        title: "Demo Speech",
        subject: "Mass Communication",
        dateGroup: "Today",
        icon: <MicIcon className="w-4 h-4 text-red-500" />,
        bgColor: "from-red-100 to-red-50",
    },
    {
        title: "Globalization Essay",
        subject: "Advanced Geography",
        dateGroup: "Today",
        icon: <BookOpenIcon className="w-4 h-4 text-yellow-500" />,
        bgColor: "from-yellow-100 to-yellow-50",
    },
    {
        title: "Management Quiz",
        subject: "Product Management",
        dateGroup: "This Week",
        icon: <ClockIcon className="w-4 h-4 text-purple-500" />,
        bgColor: "from-purple-100 to-purple-50",
    },
    {
        title: "Docu Reaction Paper",
        subject: "Advanced Geography",
        dateGroup: "This Week",
        icon: <FileTextIcon className="w-4 h-4 text-yellow-500" />,
        bgColor: "from-yellow-100 to-yellow-50",
    },
    {
        title: "Docu Reaction Paper",
        subject: "Advanced Geography",
        dateGroup: "This Week",
        icon: <FileTextIcon className="w-4 h-4 text-yellow-500" />,
        bgColor: "from-yellow-100 to-yellow-50",
    },
];

const UpcomingTasks: React.FC = () => {
    const groupedTasks = tasks.reduce((acc, task) => {
        if (!acc[task.dateGroup]) acc[task.dateGroup] = [];
        acc[task.dateGroup].push(task);
        return acc;
    }, {} as Record<string, Task[]>);

    return (
        <div className="relative w-full rounded-2xl bg-white border border-gray-100 shadow-md p-4">
            {/* Decorative SVG */}
            {/* <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                <svg width="120" height="120" fill="none" viewBox="0 0 150 150">
                    <circle cx="75" cy="75" r="75" fill="#4f46e5" />
                </svg>
            </div> */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-800">Upcoming Assignments</h3>
                <button className="text-sm text-indigo-600 hover:underline font-medium">See All</button>
            </div>

            <div className="space-y-6">
                {Object.entries(groupedTasks).map(([section, items]) => (
                    <div key={section}>
                        <h3 className="text-xs text-gray-500 font-semibold tracking-wide mb-3 uppercase">
                            {section}
                        </h3>
                        <div className="flex flex-col gap-4">
                            {items.map((task, idx) => (
                                <div
                                    key={idx}
                                    className="flex justify-between items-center p-3 rounded-md transition group bg-gradient-to-br hover:from-indigo-50 hover:to-white border border-gray-100 shadow-sm hover:shadow-md cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-10 h-10 rounded-full bg-gradient-to-br ${task.bgColor} flex items-center justify-center`}
                                        >
                                            {task.icon}
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-base font-medium text-gray-800 group-hover:text-indigo-600">
                                                {task.title}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-0.5">{task.subject}</p>
                                        </div>
                                    </div>
                                    <div className="text-gray-400 text-xl group-hover:text-indigo-500">
                                        <ChevronRight />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingTasks;
