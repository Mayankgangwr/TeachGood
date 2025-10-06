import React, { useEffect, useState } from "react";
import { ConfirmationDialog, DepartmentForm, PageWrapper, Table } from "../../components";
import { UserRoles } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import type { IModelOpen } from "../../types/comman.types";
import { deleteDepartment, getDepartments } from "../../features/department/department.action";
import type { IDepartmentResponse } from "../../types/response.types";
import { Edit, Trash } from "lucide-react";
import { formatedDate } from "../../utils/date-time";

const Departments: React.FC = () => {
    const dispatch = useAppDispatch();
    const [formOpen, setFormOpen] = useState<IModelOpen>({
        isOpen: false,
        id: "",
    });

    const [openDelete, setOpenDelete] = useState<IModelOpen>({
        isOpen: false,
        id: "",
    });

    const { user, departments, total } = useAppSelector((state) => ({
        user: state.auth.user,
        departments: state.departments.departments,
        total: state.departments.total,
    }));

    useEffect(() => {
        dispatch(getDepartments({}));
    }, [dispatch]);

    const handleEditDepartment = (departmentId: string) => {
        setFormOpen({ isOpen: true, id: departmentId });
    };

    const handleDelete = (departmentId: string) => {
        dispatch(deleteDepartment(departmentId));
    }

    const columns = [
        { key: "_id", title: "ID" },
        { key: "name", title: "Name" },
        { key: "description", title: "Description" },
        { key: "status", title: "Status", render: (row: IDepartmentResponse) => (row.status ? "Active" : "Inactive") },
        { key: "createdAt", title: "Created At", render: (row: IDepartmentResponse) => formatedDate(row.createdAt)},
        { key: "updatedAt", title: "Updated At", render: (row: IDepartmentResponse) => formatedDate(row.updatedAt)},
    ];

    const actions = [
        { icon: <Edit className="w-4 h-4 text-white" />, onClick: (id: string) => handleEditDepartment(id), tooltip: "Edit" },
        { icon: <Trash className="w-4 h-4 text-white" />, onClick: (id: string) => setOpenDelete({ isOpen: true, id }), tooltip: "Delete" },
    ];

    return (
        <>
            <PageWrapper
                header={{
                    name: "Departments",
                    canAdd: user?.role !== UserRoles.Student,
                    isFilter: total > 10,
                    filter: 'nothing',
                    setFormOpen: (data: IModelOpen) => setFormOpen(data)
                }}
                total={total}
            >
                <div className="flex flex-col items-center gap-3">
                    <Table columns={columns} data={departments} actions={actions} />
                </div>
            </PageWrapper>

            <DepartmentForm
                formOpen={formOpen}
                handleToggleForm={(toggle: boolean) => setFormOpen({ isOpen: toggle, id: "" })}
            />

            <ConfirmationDialog
                open={openDelete.isOpen}
                onClose={() => setOpenDelete({ isOpen: false, id: "" })}
                onConfirm={() => handleDelete(openDelete.id)}
                title="Confirm Delete Department"
                description="Are you sure you want to delete this department?"
                confirmLabel="Delete"
                cancelLabel="Cancel"
                loadingText="Delete..."
            />
        </>
    );
}

export default Departments;
