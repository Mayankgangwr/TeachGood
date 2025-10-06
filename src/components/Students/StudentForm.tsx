import React, { useEffect, useMemo } from "react";
import FormAction from "../Form/FormAction";
import Dialog from "../Dialog";
import Loader from "../Loader";
import type { IOpenModel, ModelType } from "../../types/comman.types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { getStudents, upsertStudent } from "../../features/student/student.action";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../Fields/Input";
import moment from "moment";

interface IStudentFormProps {
    formModel: IOpenModel<ModelType>;
    handleToggleForm: (id?: string, type?: ModelType) => void;
}

// ✅ Validation Schema
const studentSchema = Yup.object().shape({
    dateOfBirth: Yup.date()
        .nullable()
        .typeError("Date of Birth must be a valid date"),
    address: Yup.string().optional(),
    guardian: Yup.object().shape({
        name: Yup.string().optional(),
        relation: Yup.string().optional(),
        phone: Yup.string()
            .matches(/^\+?\d{10,15}$/, "Invalid phone number")
            .optional(),
        email: Yup.string().email("Invalid email address").optional(),
    }).optional(),
});

const StudentForm: React.FC<IStudentFormProps> = ({ formModel, handleToggleForm }) => {
    const dispatch = useAppDispatch();
    const { students, isLoading } = useAppSelector((state) => ({
        students: state.students.records,
        isLoading: state.ui.isLoading,
    }));

    useEffect(() => {
        if (students.length <= 0) dispatch(getStudents({}));
    }, [dispatch, students.length]);

    const currentStudent = useMemo(
        () => students.find((s) => s._id === formModel.id),
        [formModel.id, students]
    );

    const formik = useFormik({
        initialValues: {
            dateOfBirth: currentStudent?.dateOfBirth
                ? new Date(currentStudent?.dateOfBirth)
                : null,
            address: currentStudent?.address || "",
            guardian: {
                name: currentStudent?.guardian?.name || "",
                relation: currentStudent?.guardian?.relation || "",
                phone: currentStudent?.guardian?.phone || "",
                email: currentStudent?.guardian?.email || "",
            },
        },
        validationSchema: studentSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            await dispatch(upsertStudent({ id: formModel.id, data: values }));
            handleClose();
        },
    });

    const handleClose = () => {
        handleToggleForm();
        formik.resetForm();
    };


    return (
        <Dialog
            isOpen={formModel.toggle}
            onClose={handleClose}
            title="Update Student Info"
            closeOnOutsideClick={false}
        >
            {isLoading ? (
                <div className="flex justify-center py-10">
                    <Loader />
                </div>
            ) : (
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    {/* Address */}
                    <Input
                        id="address"
                        label="Address"
                        placeholder="Enter Student Address..."
                        {...formik.getFieldProps("address")}
                        error={formik.errors.address}
                    />



                    {/* Date of Birth */}
                    <Input
                        id="dateOfBirth"
                        type="datetime-local"
                        label="Date Of Birth"
                        value={formik.values.dateOfBirth
                            ? moment(formik.values.dateOfBirth).format("YYYY-MM-DDTHH:mm")
                            : ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.dateOfBirth}
                    />

                    {/* Guardian Info */}
                    <Input
                        id="guardian.name"
                        label="Guardian Name"
                        placeholder="Enter Guardian Name"
                        {...formik.getFieldProps("guardian.name")}
                        error={formik.errors.guardian?.name}
                    />

                    <Input
                        id="guardian.relation"
                        label="Relation"
                        placeholder="Enter Relation"
                        {...formik.getFieldProps("guardian.relation")}
                        error={formik.errors.guardian?.relation}
                    />

                    <Input
                        id="guardian.phone"
                        label="Guardian Phone"
                        placeholder="Enter Guardian Phone"
                        {...formik.getFieldProps("guardian.phone")}
                        error={formik.errors.guardian?.phone}
                    />

                    <Input
                        id="guardian.email"
                        label="Guardian Email"
                        placeholder="Enter Guardian Email"
                        {...formik.getFieldProps("guardian.email")}
                        error={formik.errors.guardian?.email}
                    />

                    {/* Actions */}
                    <div className="flex justify-end gap-2">
                        <FormAction
                            disabled={!formik.isValid || isLoading}
                            variant={
                                formik.isSubmitting || isLoading ? "secondary" : "primary"
                            }
                            handleClose={handleClose}
                            handleSubmit={() => formik.submitForm()}
                            submitBtnText="Submit"
                        />
                    </div>
                </form>
            )}
        </Dialog>
    );
};

export default StudentForm;
