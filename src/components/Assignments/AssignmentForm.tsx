import type React from "react";
import type { IOpenModel, ISelectOptions, ModelType } from "../../types/comman.types";
import Dialog from "../Dialog";
import Button from "../Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { IAssignmentPayload } from "../../types/payload.types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { getAssignments, insertAssignment, updateAssignment } from "../../features/assignment/assignment.action";
import { useEffect, useMemo } from "react";
import Select from "../Fields/Select";
import { getAllBatches } from "../../features/batch/batch.action";

export const assignmentSchema = Yup.object().shape({
    courseId: Yup.string().required("Course is required"),
    name: Yup.string().required("Batch name is required"),
    schedule: Yup.date()
        .required("Schedule date is required")
        .typeError("Invalid date"),
    maxCapacity: Yup.number().required("Max capacity of batch is required!"),
    fee: Yup.object().shape({
        amount: Yup.number()
            .required("Fee amount is required")
            .min(0, "Fee amount cannot be negative"),
        currency: Yup.string()
            .required("Fee currency is required")
            .length(3, "Currency code must be 3 characters, e.g. INR"),
    }),

    duration: Yup.number()
        .required("Batch duration is required")
        .min(1, "Duration should be at least 1 month"),

    accessibility: Yup.number()
        .required("Batch accessibility is required")
        .min(1, "Accessibility should be at least 1 month"),
});

interface IAssignmentFormProps {
    formModel: IOpenModel<ModelType>;
    handleModelToggle: (id?: string, type?: ModelType) => void;
}
const AssignmentForm: React.FC<IAssignmentFormProps> = ({ formModel, handleModelToggle }) => {
    const dispatch = useAppDispatch();
    const { assignments, batches, isLoading } = useAppSelector((state) => ({
        assignments: state.assignment.records,
        batches: state.batch.batches,
        isLoading: state.ui.isLoading,
    }));

    // Fetch courses if not already fetched
    useEffect(() => {
        if (!assignments) {
            dispatch(getAssignments());
        }
        if (batches.length <= 0) dispatch(getAllBatches({}));

    }, [dispatch]);

    const batchOptions = useMemo<ISelectOptions[]>(() => {
        return [
            ...(batches?.map((batch) => ({
                label: batch.course.name,
                value: batch._id,
            })) ?? []),
        ];
    }, [batches]);

    // Get the batch being edited (if any)
    const editingAssignment = useMemo(
        () => assignments?.find((assignment) => assignment._id === formModel.id),
        [assignments, formModel.id]
    );


    // Memoized initial values for Formik
    const initialValues = useMemo<IAssignmentPayload>(() => {
        if (editingAssignment) {
            return {
                batchId: editingAssignment.batchId,
                subjectId: editingAssignment.subjectId,
                title: editingAssignment.title,
                description: editingAssignment.title,
                instructions: editingAssignment?.instructions,
                attachments: [],
                githubTemplateUrl: editingAssignment?.githubTemplateUrl,
                dueDate: new Date(editingAssignment.dueDate),
                maxGrade: editingAssignment?.maxGrade,
                createdBy: editingAssignment.title,
                allowLateSubmission: editingAssignment?.allowLateSubmission,
                latePenaltyPercentage: editingAssignment?.latePenaltyPercentage,
            };
        }
        return {
            batchId: "",
            subjectId: "",
            title: "",
            description: "",
            instructions: "",
            attachments: [],
            githubTemplateUrl: "",
            dueDate: new Date(),
            maxGrade: 0,
            createdBy: "",
            allowLateSubmission: false,
            latePenaltyPercentage: 0,
        };
    }, [editingAssignment]);

    const formik = useFormik<IAssignmentPayload>({
        initialValues,
        validationSchema: assignmentSchema,
        enableReinitialize: true, // important for editing different batches
        onSubmit: async (values) => {
            try {
                if (formModel.id) {
                    await dispatch(updateAssignment({ id: formModel.id, data: values }));
                } else {
                    await dispatch(insertAssignment(values));
                }
                handleModelToggle(); // close form after submit
            } catch (err) {
                console.error(err);
            }
        },
    });

    const handleCloseBatchForm = () => {
        formik.resetForm({ values: initialValues }); // reset fields
        handleModelToggle();
    };

    const error = (field: keyof typeof formik.values) =>
        formik.touched[field] && formik.errors[field]
            ? (formik.errors[field] as string)
            : undefined;

    // ✅ Subject options depend on selected batch
    const subjectOptions = useMemo<ISelectOptions[]>(() => {
        const batch = batches?.find((b) => b._id === formik.values.batchId);
        if (!batch) return [];
        return [
            ...(batch.subjects?.map((subject: any) => ({
                label: subject.name,
                value: subject._id,
            })) ?? []),
        ];
    }, [formik.values.batchId, batches]);

    return (
        <Dialog
            isOpen={formModel.toggle}
            onClose={handleCloseBatchForm}
            title={formModel.id ? "Edit Assignment" : "Create Assignment"}
            closeOnOutsideClick={false}
        >
            <form className="grid grid-cols-1 gap-3 md:gap-5" onSubmit={formik.handleSubmit}>

                <Select
                    label="Batch"
                    options={batchOptions}
                    selectValue={formik.values.batchId}
                    onChange={(e) => formik.setFieldValue("batchId", e.target.value)}
                    onBlur={formik.handleBlur}
                    error={error("batchId")}
                />


                <Select
                    label="Subject"
                    options={subjectOptions}
                    selectValue={formik.values.subjectId}
                    onChange={(e) => formik.setFieldValue("subjectId", e.target.value)}
                    onBlur={formik.handleBlur}
                    error={error("subjectId")}
                />

                <div className="mt-3 flex justify-end gap-2 md:gap-5 pt-3 border-t border-gray-200">
                    <Button size="sm" variant="secondary" onClick={handleCloseBatchForm}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        size="sm"
                        variant={formik.isSubmitting || isLoading ? "secondary" : "primary"}
                        disabled={!formik.isValid || isLoading}
                        onClick={() => formik.submitForm()}
                    >
                        {formModel.id ? "Update Batch" : "Create Batch"}
                    </Button>
                </div>
            </form>
        </Dialog>
    );
};

export default AssignmentForm;