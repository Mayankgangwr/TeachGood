import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Layers, Pencil, Trash2, BookOpen } from "lucide-react";

import Card from "../Card";
import CardHeader from "../Card/Header";
import type { IBatchResponse } from "../../types/response.types";
import type { ActionMenuItem, ModelType } from "../../types/comman.types";
import { UserRoles } from "../../constants";
import { useAppSelector } from "../../hooks/redux.hook";
import Persona from "../Persona";
import { formatedDate } from "../../utils/date-time";

interface IBatchCardProps {
    batch: IBatchResponse;
    handleModelToggle: (batchId: string, type?: ModelType) => void;
}

const BatchCard: React.FC<IBatchCardProps> = ({ batch, handleModelToggle }) => {
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => ({
        user: state.auth.user,
    }));

    /** Build actions menu dynamically based on role */
    const actions: ActionMenuItem[] = (() => {
        switch (user?.role) {
            case UserRoles.Admin:
                return [
                    {
                        title: "Edit",
                        icon: <Pencil size={14} />,
                        onClick: () => handleModelToggle(batch._id, "EDIT"),
                    },
                    {
                        title: "Delete",
                        icon: <Trash2 size={14} />,
                        onClick: () => handleModelToggle(batch._id, "DELETE"),
                    },
                    {
                        title: "Enroll Student",
                        icon: <BookOpen size={14} />,
                        onClick: () => handleModelToggle(batch._id, "STUDENTENROLLFROMBATCH"),
                    },
                    {
                        title: "Assign Subject",
                        icon: <BookOpen size={14} />,
                        onClick: () => handleModelToggle(batch._id, "ASSIGN_SUBJECT"),
                    },
                    {
                        title: "View Details",
                        icon: <Layers size={14} />,
                        onClick: () => navigate(`batches?courseId=${batch._id}`),
                    },
                ];
            case UserRoles.Teacher:
                return [
                    {
                        title: "View Details",
                        icon: <Layers size={14} />,
                        onClick: () => navigate(`batches?courseId=${batch._id}`),
                    },
                ];
            default:
                return [];
        }
    })();

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 border border-gray-200">
            {/* Header */}
            <CardHeader
                heading={
                    <div className="flex items-center gap-1">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                            {batch.name}
                        </h3>
                        {batch.maxCapacity !== undefined && (
                            <span className="text-xs text-gray-500 truncate">
                                (Rem. seats: {batch.maxCapacity - (batch.subjects.length || 0)})
                            </span>
                        )}
                    </div>
                }
                description={
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Building2 size={16} /> {batch.course?.name || "No Course"} {`(Start from: ${formatedDate(batch.schedule)})`}
                    </span>
                }
                actions={actions}
            />

            {/* Batch Details */}
            <div className="px-2.5 pt-2 pb-3 space-y-2 bg-gray-50">
                <div className="mt-2">
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">Subjects:</h4>
                    {batch.subjects?.length ? (
                        <div className="flex flex-wrap gap-2">
                            {batch.subjects.map((subject) => (
                                <span
                                    key={subject._id}
                                    className="px-1 py-0.5 bg-indigo-500 text-white text-xs rounded"
                                >
                                    {subject.name}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-400">No subjects assigned</p>
                    )}
                    {batch.subjects.length && (
                        <div className="flex flex-wrap gap-0.5 mt-2">
                            {batch.subjects.map(({ name, teacher }) => (
                                <Persona
                                    key={teacher.name}
                                    size="sm"
                                    toolTipText={
                                        <div className="flex items-center">
                                            <span className="text-xs font-semibold text-gray-300 truncate">
                                                {name}
                                            </span>
                                            <span className="text-xs text-gray-200 truncate">
                                                {` (${teacher.name})`}
                                            </span>
                                        </div>
                                    }
                                    avatarUrl={teacher.avatar}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default BatchCard;
