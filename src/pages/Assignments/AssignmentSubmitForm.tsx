import React, { useEffect } from "react";
import {
    Button,
    Dialog,
    TextArea,
    FileUpload,
    UrlInput,
    Select,
    ProgressInput,
} from "../../components";
import { toggleSubmitAssignmentDialog } from "../../features/assignment/assignment.slice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { IAssignmentSubmitState } from "../../types/assignement.types";
import { useParams } from "react-router-dom";
import {
    getAssignmentById,
    submitAssignment as submitAssignmentAPI,
} from "../../features/assignment/assignment.action";
import FilePreview from "reactjs-file-preview";



interface IAssignmentSubmitFormProps { }

const DRAFT_KEY = "assignment_draft";

// ✅ Validation Schema
const assignmentSchema = Yup.object().shape({
    description: Yup.string().required("Description is required"),
    files: Yup.array().of(Yup.mixed<File>()),
    urls: Yup.array().of(Yup.string().url("Invalid URL")),
    progress: Yup.number()
        .min(1, "Progress must be at least 1%")
        .max(100, "Progress cannot exceed 100%")
        .required("Progress is required"),
    completionStatus: Yup.string()
        .oneOf(["pending", "full", "partial"], "Please select completion status")
        .required("Completion status is required"),
});

const AssignmentSubmitForm: React.FC<IAssignmentSubmitFormProps> = () => {
    const dispatch = useAppDispatch();
    const { assignmentId } = useParams<{ assignmentId: string }>();
    const {
        isSubmitAssignmentDialogOpen,
        assignment,
        submittedAssignment,
        studentId,
    } = useAppSelector((state) => ({
        isSubmitAssignmentDialogOpen: state.assignment.isSubmitAssignmentDialogOpen,
        assignment: state.assignment.currentAssignment,
        submittedAssignment: state.assignment.submittedAssignment,
        studentId: state.auth.user?._id,
    }));

    useEffect(() => {
        if (!assignment || assignment._id !== assignmentId) {
            assignmentId &&
                dispatch(getAssignmentById(assignmentId))
                    .unwrap()
                    .catch(() => console.warn("Failed"));
        }
    }, [assignmentId, assignment, dispatch]);

    const handleCloseForm = () => dispatch(toggleSubmitAssignmentDialog(false));

    const formik = useFormik<IAssignmentSubmitState>({
        initialValues: {
            description: submittedAssignment?.description || "",
            existingFiles: submittedAssignment?.files || [], // ✅ URLs of already uploaded files
            files: [], // ✅ new files selected in current session
            urls: submittedAssignment?.urls || [],
            progress: submittedAssignment?.progress || 1,
            completionStatus: submittedAssignment?.completionStatus || "pending",
            removedExistingFiles: [],
        },
        validationSchema: assignmentSchema,
        onSubmit: (values, { resetForm }) => {
            const formData = new FormData();
            formData.append("assignmentId", assignment._id);
            studentId && formData.append("studentId", studentId);

            formData.append("description", values.description);

            // ✅ New file uploads
            values.files.forEach((file) => {
                formData.append("attachments", file);
            });

            // ✅ Existing files kept
            values.existingFiles.forEach((url) => {
                formData.append("existingFiles", url);
            });

            // ✅ Removed existing files
            values.removedExistingFiles.forEach((url) => {
                formData.append("removedExistingFiles", url);
            });

            // ✅ URLs
            values.urls.forEach((url) => {
                formData.append("urls", url);
            });

            formData.append("progress", String(values.progress));
            formData.append("completionStatus", values.completionStatus);

            dispatch(submitAssignmentAPI(formData));
            console.log("✅ Form submitted:", values);

            localStorage.removeItem(DRAFT_KEY);
            resetForm();
            handleCloseForm();
        },
    });

    // ✅ Restore draft on mount
    useEffect(() => {
        if (isSubmitAssignmentDialogOpen && assignment._id === assignmentId) {
            const draft = localStorage.getItem(DRAFT_KEY);
            if (draft) {
                const draftObj = JSON.parse(draft);
                if (draftObj.assignmentId === assignmentId) {
                    formik.setValues(draftObj);
                } else {
                    localStorage.removeItem(DRAFT_KEY);
                }
            }
        }
    }, [isSubmitAssignmentDialogOpen, assignment, assignmentId]);

    // ✅ Save draft
    const handleSaveDraft = () => {
        if (!formik.isValid) return;
        localStorage.setItem(
            DRAFT_KEY,
            JSON.stringify({ ...formik.values, assignmentId })
        );
        handleCloseForm();
    };

    // ✅ Handle completionStatus logic
    const handleCompletionStatusChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = e.target.value as "full" | "partial" | "pending";
        formik.setFieldValue("completionStatus", value);

        if (value === "full") {
            formik.setFieldValue("progress", 100);
        } else if (value === "partial" && formik.values.progress < 1) {
            formik.setFieldValue("progress", 1);
        }
    };

    // ✅ Helper to get error easily
    const error = (field: keyof IAssignmentSubmitState) =>
        formik.touched[field] && formik.errors[field]
            ? (formik.errors[field] as string)
            : undefined;

    const FormAction = () => (
        <div className="w-full flex justify-end gap-2 md:gap-5 pt-3 border-t border-gray-200">
            <Button size="sm" variant="secondary" onClick={handleCloseForm}>
                Cancel
            </Button>
            <Button
                size="sm"
                variant={formik.isValid ? "danger" : "secondary"}
                disabled={!formik.isValid}
                onClick={handleSaveDraft}
            >
                Save as Draft
            </Button>
            <Button size="sm" variant="primary" onClick={formik.submitForm}>
                Submit
            </Button>
        </div>
    );

    return (
        <Dialog
            isOpen={isSubmitAssignmentDialogOpen}
            onClose={handleCloseForm}
            title="Submit Assignment"
            closeOnOutsideClick={false}
            actions={<FormAction />}
        >
            <div className="grid grid-cols-1 gap-3 md:gap-5">
                {/* Completion Status */}
                <Select
                    id="completionStatus"
                    name="completionStatus"
                    label="Completion Status"
                    value={formik.values.completionStatus}
                    onChange={handleCompletionStatusChange}
                    onBlur={formik.handleBlur}
                    options={[
                        { label: "Pending", value: "pending" },
                        { label: "Fully Completed", value: "full" },
                        { label: "Partially Completed", value: "partial" },
                    ]}
                    error={error("completionStatus")}
                />

                {/* Progress Field */}
                <ProgressInput
                    id="progress"
                    label="Progress"
                    value={formik.values.progress}
                    onChange={(val) =>
                        formik.values.completionStatus !== "full" &&
                        formik.setFieldValue("progress", val)
                    }
                    error={error("progress")}
                    readOnly={formik.values.completionStatus === "full"}
                />

                {/* URL Input */}
                <UrlInput
                    label="Assignment Links"
                    initialURLs={formik.values.urls}
                    onChange={(urls) => formik.setFieldValue("urls", urls)}
                    error={error("urls")}
                />

                {/* File Upload */}
                <FileUpload
                    label="Add Attachments"
                    accept=".jpg,.png,.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip"
                    multiple
                    initialData={formik.values.existingFiles}
                    onChange={(files: File[]) => {
                        formik.setFieldValue("files", files);
                    }}
                    handleRemoveFile={(idx: number) => {
                        const url = formik.values.existingFiles[idx];
                        if (url) {
                            formik.setFieldValue("removedExistingFiles", [
                                ...formik.values.removedExistingFiles,
                                url,
                            ]);
                            formik.setFieldValue(
                                "existingFiles",
                                formik.values.existingFiles.filter((_, i) => i !== idx)
                            );
                        }
                    }}
                    error={error("files")}
                />

                {/* Description */}
                <TextArea
                    id="description"
                    name="description"
                    label="Description"
                    placeholder="Write description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={error("description")}
                />
            </div>
        </Dialog>
    );
};

export default AssignmentSubmitForm;
