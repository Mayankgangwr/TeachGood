import React, { useEffect, useState } from "react";
import {
    ConfirmationDialog,
    PageWrapper,
    Table,
} from "../../components";
import { UserRoles } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import type { IModelOpen } from "../../types/comman.types";
import {
    deleteEnrollment,
    getEnrollments,
} from "../../features/enrollment/enrollment.action";
import { Trash } from "lucide-react";
import { formatedDate } from "../../utils/date-time";
import type { IEnrollmentResponse } from "../../types/response.types";

const EnrollmentsPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const [openDelete, setOpenDelete] = useState<IModelOpen>({
        isOpen: false,
        id: "",
    });

    const { user, enrollments, total } = useAppSelector((state) => ({
        user: state.auth.user,
        enrollments: state.enrollments.records,
        total: state.enrollments.total,
    }));

    useEffect(() => {
        if (total <= 0) {
            dispatch(getEnrollments({}));
        }
    }, [dispatch]);

    const handleDelete = (enrollmentId: string) => {
        dispatch(deleteEnrollment(enrollmentId));
    };

    const columns = [
        { key: "student", title: "Student", render: (row: IEnrollmentResponse) => row.student.name },
        { key: "batch", title: "Batch", render: (row: IEnrollmentResponse) => row.batch.name },
        { key: "status", title: "Status", render: (row: IEnrollmentResponse) => row.status },
        { key: "enrolledAt", title: "Enrolled At", render: (row: IEnrollmentResponse) => formatedDate(row.enrolledAt) },
        { key: "fee.amount", title: "Fee", render: (row: IEnrollmentResponse) => row.fee?.amount || 0 },
        { key: "fee.status", title: "Payment Status", render: (row: IEnrollmentResponse) => row.fee?.status || "Pending" },
    ];

    const actions = [
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
                    name: "Enrollments",
                    canAdd: user?.role !== UserRoles.Student,
                    isFilter: total > 10,
                    filter: "nothing",
                    setFormOpen: () => { },
                }}
                total={total}
            >
                <div className="flex flex-col items-center gap-3">
                    <Table columns={columns} data={enrollments} actions={actions} />
                </div>
            </PageWrapper>

            <ConfirmationDialog
                open={openDelete.isOpen}
                onClose={() => setOpenDelete({ isOpen: false, id: "" })}
                onConfirm={() => handleDelete(openDelete.id)}
                title="Confirm Delete Enrollment"
                description="Are you sure you want to delete this enrollment?"
                confirmLabel="Delete"
                cancelLabel="Cancel"
                loadingText="Deleting..."
            />
        </>
    );
};

export default EnrollmentsPage;
