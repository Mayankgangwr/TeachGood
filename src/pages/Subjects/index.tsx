import React, { useEffect, useState } from "react";
import {
    ConfirmationDialog,
    SubjectForm,
    PageWrapper,
    Table,
} from "../../components";
import { UserRoles } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import type { IModelOpen } from "../../types/comman.types";
import {
    deleteSubject,
    getSubjects,
} from "../../features/subject/subject.action";
import type { ISubjectResponse } from "../../types/response.types";
import { Edit, Trash } from "lucide-react";
import { formatedDate } from "../../utils/date-time";

const Subjects: React.FC = () => {
    const dispatch = useAppDispatch();
    const [formOpen, setFormOpen] = useState<IModelOpen>({
        isOpen: false,
        id: "",
    });

    const [openDelete, setOpenDelete] = useState<IModelOpen>({
        isOpen: false,
        id: "",
    });

    const { user, subjects, total } = useAppSelector((state) => ({
        user: state.auth.user,
        subjects: state.subject.subjects,
        total: state.subject.total,
    }));

    useEffect(() => {
        dispatch(getSubjects({}));
    }, [dispatch]);

    const handleEditSubject = (subjectId: string) => {
        setFormOpen({ isOpen: true, id: subjectId });
    };

    const handleDelete = (subjectId: string) => {
        dispatch(deleteSubject(subjectId));
    };

    const columns = [
        { key: "_id", title: "ID" },
        { key: "name", title: "Name" },
        { key: "description", title: "Description" },
        { key: "duration", title: "Duration (weeks)" },
        { key: "status", title: "Status", render: (row: ISubjectResponse) => (row.status ? "Active" : "Inactive") },
        { key: "createdAt", title: "Created At", render: (row: ISubjectResponse) => formatedDate(row.createdAt) },
        { key: "updatedAt", title: "Updated At", render: (row: ISubjectResponse) => formatedDate(row.updatedAt) },
    ];


    const actions = [
        {
            icon: <Edit className="w-4 h-4 text-white" />,
            onClick: (id: string) => handleEditSubject(id),
            tooltip: "Edit",
        },
        {
            icon: <Trash className="w-4 h-4 text-white" />,
            onClick: (id: string) => setOpenDelete({ isOpen: true, id }),
            tooltip: "Delete",
        },
    ];

    return (
        <>
            <PageWrapper
                header={{
                    name: "Subjects",
                    canAdd: user?.role !== UserRoles.Student,
                    isFilter: total > 10,
                    filter: "nothing",
                    setFormOpen: (data: IModelOpen) => setFormOpen(data),
                }}
                total={total}
            >
                <div className="flex flex-col items-center gap-3">
                    <Table columns={columns} data={subjects} actions={actions} />
                </div>
            </PageWrapper>

            <SubjectForm
                formOpen={formOpen}
                handleToggleForm={(toggle: boolean) =>
                    setFormOpen({ isOpen: toggle, id: "" })
                }
            />

            <ConfirmationDialog
                open={openDelete.isOpen}
                onClose={() => setOpenDelete({ isOpen: false, id: "" })}
                onConfirm={() => handleDelete(openDelete.id)}
                title="Confirm Delete Subject"
                description="Are you sure you want to delete this subject?"
                confirmLabel="Delete"
                cancelLabel="Cancel"
                loadingText="Deleting..."
            />
        </>
    );
};

export default Subjects;
