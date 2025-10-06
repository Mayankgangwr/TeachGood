import React, { useState } from "react";
import type { ITeacherResponse } from "../../types/response.types";
import Card from "../Card";
import { Ellipsis, Layers, Pencil, Trash2 } from "lucide-react";
import ConfirmationDialog from "../Dialog/ConfirmationDialog";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { Link, useNavigate } from "react-router-dom";
import type { ActionMenuItem, IModelOpen, IOpenModel, ModelType } from "../../types/comman.types";
import { deleteTeacher } from "../../features/teacher/teacher.action";
import { UserRoles } from "../../constants";
import MenuButton from "../Button/MenuButton";
import TeacherMetaForm from "./TeacherMetaForm";

interface ITeacherCardProps {
    teacher: ITeacherResponse;
    handleEditTeacher: (teacherId: string) => void;
}

const TeacherCard: React.FC<ITeacherCardProps> = ({ teacher, handleEditTeacher }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => ({
        user: state.auth.user,
    }));

    const [openModel, setOpenModel] = useState<IOpenModel<ModelType | null>>({
        type: null,
        toggle: false,
        id: ""
    });

    const handleModelToggle = (id: string = "", type: ModelType | null = null) => {
        if (id && type) {
            setOpenModel(() => ({ type, toggle: true, id }));
            return;
        }
        setOpenModel(() => ({ type: null, toggle: false, id: "" }))
    }

    const handleDelete = (teacherId: string) => dispatch(deleteTeacher(teacherId)).then(() => handleModelToggle());

    const actions: ActionMenuItem[] = (() => {
        if (user?.role === UserRoles.Admin) {
            return [
                { title: "Assign Subjects", icon: <Layers size={14} />, onClick: () => handleModelToggle(teacher._id, "ASSIGN_SUBJECT") },
                { title: "Edit", icon: <Pencil size={14} />, onClick: () => handleEditTeacher(teacher._id) },
                { title: "Delete", icon: <Trash2 size={14} />, onClick: () => handleModelToggle(teacher._id, "DELETE") },
                { title: "View Batches", icon: <Layers size={14} />, onClick: () => navigate(`batches?courseId=${teacher._id}`) },
            ];
        }
        if (user?.role === UserRoles.Teacher) {
            return [{ title: "View Batches", icon: <Layers size={14} />, onClick: () => navigate(`batches?courseId=${teacher._id}`) }];
        }
        return [];
    })();

    return (
        <>
            <Card>
                {/* Header - do not change */}
                <div className="flex items-center justify-between bg-indigo-50 border-b border-indigo-100">
                    <div className="flex items-center gap-3">
                        <div className="ml-1.5 my-0.5 h-14 w-14 overflow-hidden rounded-full border border-indigo-200">
                            <img
                                src={teacher.avatar}
                                alt={teacher.name}
                                className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                            <div className="flex items-center gap-1">
                                <Link to={`${teacher._id}`}>
                                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                                        {teacher.name}
                                    </h3>
                                </Link>
                                {teacher.experience && (<span className="text-xs text-gray-700 truncate">{`(Exp: ${teacher.experience} Yrs)`}</span>)}

                            </div>
                            <span className="text-sm text-gray-700 truncate">{teacher.email}</span>
                        </div>
                    </div>
                    <div className="flex justify-end items-center px-3 py-2 w-[40px] shrink-0">
                        <MenuButton TriggerButton={<Ellipsis />} menuItems={actions} />
                    </div>
                </div>

                {/* Body */}
                <div className="px-2.5 pt-2 pb-3 space-y-2 bg-gray-50">
                    <p className="text-gray-700 text-sm">{teacher.about}</p>
                    {/* Expertise */}
                    <div className="mt-2">
                        <h4 className="text-sm font-semibold text-gray-800 mb-1">Expertise</h4>
                        {teacher.expertise.length ? (
                            <div className="flex flex-wrap gap-2">
                                {teacher.expertise.map((exp) => (
                                    <span key={exp._id} className="px-1 py-0.5 bg-indigo-500 text-white text-xs rounded">
                                        {exp.name}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400">No subjects assigned</p>
                        )}
                    </div>
                </div>
                {/* Confirmation Dialog */}
                {openModel.type === "DELETE" && (
                    <ConfirmationDialog
                        open={openModel.toggle}
                        onClose={handleModelToggle}
                        onConfirm={() => handleDelete(openModel.id)}
                        title="Confirm Delete"
                        description="Are you sure you want to delete this teacher?"
                        confirmLabel="Delete"
                        cancelLabel="Cancel"
                        loadingText="Deleting..."
                    />
                )}
                {openModel.type === "ASSIGN_SUBJECT" && (
                    <TeacherMetaForm
                        formModel={openModel}
                        handleToggleForm={handleModelToggle} />
                )}
            </Card>
        </>
    );
};

export default TeacherCard;
