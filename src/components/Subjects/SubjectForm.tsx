import React, { useMemo } from "react";
import type { IModelOpen } from "../../types/comman.types";
import Input from "../Fields/Input";
import Dialog from "../Dialog";
import Loader from "../Loader";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import type { ISubjectPayload } from "../../types/payload.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setLoading } from "../../features/ui/ui.slice";
import {
    insertSubject,
    updateSubject,
} from "../../features/subject/subject.action";
import FormAction from "../Form/FormAction";

// ✅ Validation Schema
const subjectSchema = Yup.object().shape({
    name: Yup.string().required("Subject name is required"),
    description: Yup.string().required("Description is required"),
    duration: Yup.number()
        .typeError("Duration must be a number")
        .positive("Duration must be greater than 0")
        .required("Duration is required"),
});

interface ISubjectFormProps {
    formOpen: IModelOpen;
    handleToggleForm: (toggle: boolean) => void;
}

const SubjectForm: React.FC<ISubjectFormProps> = ({
    formOpen,
    handleToggleForm,
}) => {
    const dispatch = useAppDispatch();
    const { isLoading, subjects } = useAppSelector((state) => ({
        isLoading: state.ui.isLoading,
        subjects: state.subject.subjects,
    }));

    // ✅ If editing, find subject
    const editingSubject = useMemo(
        () => subjects.find((s) => s._id === formOpen.id),
        [formOpen.id, subjects]
    );

    // ✅ Initial values
    const getInitialValues = (): ISubjectPayload => {
        if (editingSubject) {
            return {
                name: editingSubject.name,
                description: editingSubject.description || "",
                duration: editingSubject.duration || 0,
            };
        }
        return {
            name: "",
            description: "",
            duration: 0,
        };
    };

    const formik = useFormik<ISubjectPayload>({
        initialValues: getInitialValues(),
        validationSchema: subjectSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            dispatch(setLoading(true));
            try {
                if (formOpen.id) {
                    await dispatch(updateSubject({ id: formOpen.id, data: values }));
                } else {
                    await dispatch(insertSubject(values));
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
            title={formOpen.id ? "Edit Subject" : "Create Subject"}
            closeOnOutsideClick={false}
            actions={
                <FormAction
                    disabled={!formik.isValid || isLoading}
                    variant={formik.isSubmitting || isLoading ? "secondary" : "primary"}
                    handleClose={handleCloseForm}
                    handleSubmit={() => formik.submitForm()}
                    submitBtnText={formOpen.id ? "Update Subject" : "Create Subject"}
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
                        label="Subject Name"
                        placeholder="Enter subject name"
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

                    <Input
                        id="duration"
                        type="number"
                        label="Duration (hours)"
                        placeholder="Enter duration"
                        {...formik.getFieldProps("duration")}
                        error={formik.errors.duration}
                    />
                </div>
            )}
        </Dialog>
    );
};

export default SubjectForm;
