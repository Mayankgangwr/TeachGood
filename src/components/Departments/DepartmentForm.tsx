import React, { useMemo } from "react";
import type { IModelOpen } from "../../types/comman.types";
import Input from "../Fields/Input";
import Dialog from "../Dialog";
import Loader from "../Loader";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import type { IDepartmentPayload } from "../../types/payload.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setLoading } from "../../features/ui/ui.slice";
import {
    insertDepartment,
    updateDepartment,
} from "../../features/department/department.action";
import FormAction from "../Form/FormAction";

// ✅ Validation Schema
const departmentSchema = Yup.object().shape({
    name: Yup.string().required("Department name is required"),
    description: Yup.string().required("Description is required"),
});

interface IDepartmentFormProps {
    formOpen: IModelOpen;
    handleToggleForm: (toggle: boolean) => void;
}

const DepartmentForm: React.FC<IDepartmentFormProps> = ({
    formOpen,
    handleToggleForm,
}) => {
    const dispatch = useAppDispatch();
    const { isLoading, departments } = useAppSelector((state) => ({
        isLoading: state.ui.isLoading,
        departments: state.departments.departments,
    }));

    // ✅ If editing, find department
    const editingDepartment = useMemo(
        () => departments.find((c) => c._id === formOpen.id),
        [formOpen.id, departments]
    );

    // ✅ Initial values
    const getInitialValues = (): IDepartmentPayload => {
        if (editingDepartment) {
            return {
                name: editingDepartment.name,
                description: editingDepartment.description,
            };
        }
        return {
            name: "",
            description: "",
        };
    };

    const formik = useFormik<IDepartmentPayload>({
        initialValues: getInitialValues(),
        validationSchema: departmentSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            dispatch(setLoading(true));
            try {
                if (formOpen.id) {
                    await dispatch(updateDepartment({ id: formOpen.id, data: values }));
                } else {
                    await dispatch(insertDepartment(values));
                }
                handleCloseForm();
            } finally {
                dispatch(setLoading(false));
            }
        },
    });

    const handleCloseForm = () => {
        formik.resetForm({ values: getInitialValues() });
        handleToggleForm(false);
    };

    return (
        <Dialog
            isOpen={formOpen.isOpen}
            onClose={handleCloseForm}
            title={formOpen.id ? "Edit Department" : "Create Department"}
            closeOnOutsideClick={false}
            actions={
                <FormAction
                    disabled={!formik.isValid || isLoading}
                    variant={formik.isSubmitting || isLoading ? "secondary" : "primary"}
                    handleClose={handleCloseForm}
                    handleSubmit={() => formik.submitForm()}
                    submitBtnText={formOpen.id ? "Update Department" : "Create Department"}
                />
            }
        >
            {isLoading ? (
                <div className="flex justify-center py-10">
                    <Loader />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-3 md:gap-5">
                    <Input
                        id="name"
                        type="text"
                        label="Department Name"
                        placeholder="Enter department name"
                        {...formik.getFieldProps("name")}
                        error={formik.errors.name}
                    />

                    <Input
                        id="description"
                        type="text"
                        label="Description"
                        placeholder="Enter description"
                        {...formik.getFieldProps("description")}
                        error={formik.errors.description}
                    />
                </div>
            )}
        </Dialog>
    );
};

export default DepartmentForm;
