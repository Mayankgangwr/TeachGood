import React from "react";
import { Calendar, File, Link as LinkIcon, Clock } from "lucide-react";

// ---- Types ----
export type AssignmentStatus =
  | "pending"
  | "in-progress"
  | "completed"
  | "overdue";

export interface IAssignment {
  _id: string;
  title: string;
  description?: string;
  instructions?: string;
  attachments?: string[];
  githubTemplateUrl?: string;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
  batch?: {
    _id: string;
    schedule: string;
    course: { id: string; name: string };
    subject: { id: string; title: string; description?: string };
  };
  teacher?: {
    id: string;
    name: string;
  };
  status?: AssignmentStatus;
  progress?: number;
}

export interface AssignmentCardProps {
  data: IAssignment;
  onOpen?: (id: string) => void;
  onSubmit?: (id: string) => void;
}

// ---- Style Map ----
const statusStyles: Record<AssignmentStatus, string> = {
  pending: "bg-amber-100 text-amber-800 ring-amber-200",
  "in-progress": "bg-blue-100 text-blue-800 ring-blue-200",
  completed: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  overdue: "bg-rose-100 text-rose-800 ring-rose-200",
};

// ---- Helpers ----
const clamp = (n: number | undefined, min = 0, max = 100) => {
  if (typeof n !== "number" || Number.isNaN(n)) return 0;
  return Math.min(max, Math.max(min, Math.round(n)));
};

const ProgressBar = ({ value = 0 }: { value?: number }) => {
  const v = clamp(value);
  return (
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-600 rounded-full transition-all duration-300"
        style={{ width: `${v}%` }}
      />
    </div>
  );
};

// ---- Card Component ----
const AssignmentCard: React.FC<AssignmentCardProps> = ({
  data,
  onOpen,
  onSubmit,
}) => {
  const {
    _id,
    title,
    description,
    attachments = [],
    githubTemplateUrl,
    dueDate,
    batch,
    teacher,
    status = "pending",
    progress = 0,
  } = data;

  const badgeClass = statusStyles[status] ?? statusStyles["pending"];

  return (
    <div
      className="w-full bg-white rounded-2xl shadow-sm p-4 border hover:shadow-md transition cursor-pointer"
      onClick={() => onOpen?.(_id)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {batch?.course?.name && (
            <p className="text-sm text-gray-500">{batch.course.name}</p>
          )}
          {teacher?.name && (
            <p className="text-sm text-gray-500">By {teacher.name}</p>
          )}
        </div>
        <span
          className={`px-2 py-0.5 text-xs rounded-full ring-1 ${badgeClass}`}
        >
          {status}
        </span>
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {/* Render text-only description (strip HTML tags) */}
          {description.replace(/<[^>]+>/g, "")}
        </p>
      )}

      {/* Meta */}
      <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
        {dueDate && (
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{new Date(dueDate).toLocaleDateString()}</span>
          </div>
        )}

        {attachments.length > 0 && (
          <div className="flex items-center gap-1">
            <File size={16} />
            <span>{attachments.length}</span>
          </div>
        )}

        {githubTemplateUrl && (
          <div className="flex items-center gap-1">
            <LinkIcon size={16} />
            <span>GitHub</span>
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="mt-3">
        <ProgressBar value={progress} />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{progress}% completed</span>
          {dueDate && (
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {new Date(dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {/* Submit Button */}
      {onSubmit && (
        <div className="mt-3 flex justify-end">
          <button
            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={(e) => {
              e.stopPropagation();
              onSubmit?.(_id);
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AssignmentCard;
