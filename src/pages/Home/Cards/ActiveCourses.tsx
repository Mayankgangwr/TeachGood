import { ChevronRight } from "lucide-react";
import React from "react";

interface Course {
  title: string;
  subtitle: string;
  progress: number; // in percentage
}

const mockCourses: Course[] = [
  { title: "UI/UX Design Basics", subtitle: "By Jane Doe", progress: 80 },
  { title: "React for Beginners", subtitle: "By Rahul S.", progress: 45 },
  { title: "Data Structures", subtitle: "By Prof. Singh", progress: 65 },
];

// Helper to return color class based on progress
const getProgressColor = (progress: number) => {
  if (progress >= 80) return "bg-green-500";
  if (progress >= 60) return "bg-yellow-500";
  if (progress >= 30) return "bg-orange-400";
  return "bg-red-500";
};

const ActiveCourses: React.FC = () => {
  return (
    <div className="w-full rounded-2xl bg-white shadow-sm border border-gray-100 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-800">Active Courses</h3>
        <button className="text-xs text-indigo-600 hover:underline">See All</button>
      </div>

      {/* Course List */}
      <div className="space-y-4">
        {mockCourses.map((course, index) => (
          <div
            key={index}
            className="rounded-xl p-3 bg-gradient-to-br from-white to-indigo-50 border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer group"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600">
                  {course.title}
                </p>
                <p className="text-xs text-gray-500">{course.subtitle}</p>
              </div>
              <div className="text-gray-400 group-hover:text-indigo-500">
                <ChevronRight size={18} />
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${getProgressColor(course.progress)}`}
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveCourses;
