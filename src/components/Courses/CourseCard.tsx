import React, { useState } from "react";
import {
  GraduationCap,
  Clock,
  Building2,
  Pencil,
  Trash2,
  Layers,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { type IModelOpen, type ActionMenuItem } from "../../types/comman.types";
import { UserRoles } from "../../constants";
import ConfirmationDialog from "../Dialog/ConfirmationDialog";
import CardHeader from "../Card/Header";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import type { ICourseResponse } from "../../types/response.types";
import { deleteCourse } from "../../features/courses/courses.action";

interface CourseCardProps {
  course: ICourseResponse;
  handleEditCourse: (courseId: string) => void;
}


const CourseCard: React.FC<CourseCardProps> = ({ course, handleEditCourse }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, organization } = useAppSelector((state) => ({
    user: state.auth.user,
    organization: state.organization.data
  }));

  const [confimeModel, setConfimeModel] = useState<IModelOpen>({
    isOpen: false,
    id: "",
  });

  const handleClose = () => {
    setConfimeModel(() => ({ isOpen: false, id: "" }));
  };

  const handleDelete = (classId: string) => {
    dispatch(deleteCourse(classId)).then(() => handleClose());
  };

  const actions: ActionMenuItem[] = (() => {
    if (user?.role === UserRoles.Admin) {
      return [
        {
          title: "Edit",
          icon: <Pencil size={14} />,
          onClick: () => handleEditCourse(course._id),
        },
        {
          title: "Delete",
          icon: <Trash2 size={14} />,
          onClick: () =>
            setConfimeModel({
              isOpen: true,
              id: course._id,
            }),
        },
        {
          title: "View Batches",
          icon: <Layers size={14} />,
          onClick: () => navigate(`batches?courseId=${course._id}`),
        },
      ];
    }

    if (user?.role === UserRoles.Teacher) {
      return [
        {
          title: "View Batches",
          icon: <Layers size={14} />,
          onClick: () => navigate(`batches?courseId=${course._id}`),
        },
      ];
    }

    return [];
  })();

  return (
    <Card>
      {/* Header */}
      <CardHeader
        heading={
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
            {course.name}
          </h3>
        }
        description={
          <span className="text-sm text-gray-700 flex items-center gap-1">
            <Building2 size={14} /> {organization?.name || "Teach Good"}
          </span>
        }
        actions={actions}
      />

      {/* Image */}
      <div className="h-40 w-full overflow-hidden">
        <img
          src={course.banner}
          alt={course.name}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="px-2 py-3 space-y-2">
        {/* ✅ 2-line max description */}
        <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>

        {/* Badges */}
        <div className="flex flex-wrap gap-1 mt-4">
          <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-blue-600 flex items-center gap-1">
            <Layers size={14} /> {course?.department?.name || "No Department"}
          </span>

          <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-600 flex items-center gap-1">
            <GraduationCap size={14} /> {course.level}
          </span>
          <span className="px-2 py-1 text-sm rounded-full bg-purple-100 text-purple-600 flex items-center gap-1">
            <Clock size={14} /> {course.duration}
          </span>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confimeModel.isOpen}
        onClose={handleClose}
        onConfirm={() => handleDelete(confimeModel.id)}
        title="Confirm Delete"
        description="Are you sure you want to delete this course?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loadingText="Delete..."
      />
    </Card>
  );
};

export default CourseCard;
