import React from "react";
import { Award, Star } from "lucide-react";

const AchievementCard: React.FC = () => {
    const achievements = [
        { title: "Top Performer", icon: <Award className="text-yellow-500" size={18} /> },
        { title: "5 Courses Completed", icon: <Star className="text-indigo-500" size={18} /> },
        { title: "Consistency Streak", icon: <Star className="text-pink-500" size={18} /> },
    ];

    return (
        <div className="w-full rounded-2xl bg-white shadow-sm border border-gray-100 p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-800">Achievements</h3>
                <button className="text-xs text-indigo-600 hover:underline">View All</button>
            </div>

            {/* Achievements List */}
            <div className="space-y-3">
                {achievements.map((achievement, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 p-2 rounded-md bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition"
                    >
                        <div className="flex items-center justify-center w-8 h-8 bg-indigo-50 rounded-full">
                            {achievement.icon}
                        </div>
                        <p className="text-sm text-gray-700">{achievement.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AchievementCard;
