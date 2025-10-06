import React from "react";
import Dialog from "../Dialog";
import Table from "../Table";
import type { IEnrollmentResponse } from "../../types/response.types";
import type { IModelOpen } from "../../types/comman.types";
import { useAppSelector } from "../../hooks/redux.hook";
import { formatedDate } from "../../utils/date-time";

interface IEnrolledBatchListProps {
    listToggle: IModelOpen;
    handleClose: () => void;
}

export const enrollmentColumns = [
    {
        key: "batchName",
        title: "Batch Name",
        render: (row: IEnrollmentResponse) => row.batch.name,
    },
    {
        key: "enrollmentDate",
        title: "Enrollment Date",
        render: (row: IEnrollmentResponse) => formatedDate(row.enrolledAt),
    },
    {
        key: "totalFee",
        title: "Total Fee",
        render: (row: IEnrollmentResponse) => `₹${row.fee.amount.toLocaleString()}`,
    },
    {
        key: "remainingFee",
        title: "Remaining Fee",
        render: (row: IEnrollmentResponse) => `₹${(row.fee.amount - row.fee.paid).toLocaleString()}`,
    },
    {
        key: "paymentStatus",
        title: "Payment Status",
        render: (row: IEnrollmentResponse) => {
            const statusMap: Record<string, string> = {
                FullPaid: "green",
                Partial: "orange",
                PENDING: "red",
                FAILED: "red",
                Cancelled: "gray",
                Refunded: "gray",
            };
            const color = statusMap[row.fee.status] || "gray";
            return <span style={{ color, fontWeight: "bold" }}>{row.fee.status}</span>;
        },
    },
];


const EnrolledBatchList: React.FC<IEnrolledBatchListProps> = ({ listToggle, handleClose }) => {
    const students = useAppSelector((state) => state.students.records);
    const enrollments = students.find((student) => student._id === listToggle.id)?.enrollments;

    return (
        <Dialog
            isOpen={listToggle.isOpen}
            onClose={() => handleClose()}
            title="Enrolled Batch List"
            closeOnOutsideClick={false}
        >
            {enrollments ? (
                <Table columns={enrollmentColumns} data={enrollments} />
            ) : (
                <h1>No Data</h1>
            )}
        </Dialog >
    );
}

export default EnrolledBatchList;