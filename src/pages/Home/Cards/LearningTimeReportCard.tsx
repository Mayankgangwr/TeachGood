import { Clock, BookOpen } from "lucide-react";
import { useAppSelector } from "../../../hooks/redux.hook";

const LearningTimeReportCard = () => {
    const { learningReport, totalHours} = useAppSelector((state) => ({
        learningReport: state.classSession.learningReport,
        totalHours: state.classSession.totalHours
    }));

    return (
        <div className="w-full bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
                <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                    <Clock size={18} className="text-indigo-500" />
                    <span>Learning Time Report</span>
                </h3>
                <span className="text-xs text-gray-500">Last 7 Days</span>
            </div>

            {/* Total Hours */}
            <div className="mb-6">
                <p className="text-2xl font-bold text-indigo-600">{totalHours.toFixed(1)} hrs</p>
                <p className="text-sm text-gray-500">Total time spent on learning</p>
            </div>

            {/* Subject-wise Breakdown */}
            <div className="space-y-4">
                {learningReport.map((item, idx) => {
                    const percentage = totalHours > 0 ? ((item.hours / totalHours) * 100).toFixed(1) : "0";
                    return (
                        <div key={idx}>
                            <div className="flex justify-between items-center text-sm font-medium text-gray-700 mb-1">
                                <div className="flex items-center gap-2">
                                    <BookOpen size={14} className="text-gray-500" />
                                    <span>{item.subject}</span>
                                </div>
                                <div className="text-xs text-gray-500">
                                    {item.hours.toFixed(1)} hrs ({percentage}%)
                                </div>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`${item.color} h-full transition-all duration-500 ease-in-out`}
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
