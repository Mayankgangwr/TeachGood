import React, { useEffect, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EditorContent, useEditor } from "@tiptap/react";

import Dialog from "../Dialog";
import Button from "../Button";
import Select from "../Fields/Select";
import Input from "../Fields/Input";

import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { getAssignments, insertAssignment, updateAssignment } from "../../features/assignment/assignment.action";
import { getAllBatches } from "../../features/batch/batch.action";

import type { IOpenModel, ISelectOptions, ModelType } from "../../types/comman.types";
import type { IAssignmentPayload } from "../../types/payload.types";

import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";

// ✅ Correct assignment schema
export const assignmentSchema = Yup.object().shape({
    batchId: Yup.string().required("Batch is required"),
    subjectId: Yup.string().required("Subject is required"),
    title: Yup.string().required("Assignment title is required"),
    description: Yup.string().required("Description is required"),
    instructions: Yup.string().nullable(),
    githubTemplateUrl: Yup.string().url("Invalid GitHub URL").nullable(),
    dueDate: Yup.date().required("Due date is required").typeError("Invalid date"),
    maxGrade: Yup.number()
        .required("Maximum grade is required")
        .min(0, "Grade cannot be negative"),
    allowLateSubmission: Yup.boolean(),
    latePenaltyPercentage: Yup.number()
        .min(0)
        .max(100)
        .when("allowLateSubmission", {
            is: true,
            then: (schema) =>
                schema.required("Late penalty percentage is required if late submission is allowed"),
        }),
});

interface IAssignmentFormProps {
    formModel: IOpenModel<ModelType>;
    handleModelToggle: (id?: string, type?: ModelType) => void;
}

const AssignmentForm: React.FC<IAssignmentFormProps> = ({ formModel, handleModelToggle }) => {
    const dispatch = useAppDispatch();

    const { assignments, batches, isLoading } = useAppSelector((state) => ({
        assignments: state.assignment.records || [],
        batches: state.batch.batches || [],
        isLoading: state.ui.isLoading,
    }));

    // ✅ Fetch data if not available
    useEffect(() => {
        if (assignments.length <= 0) dispatch(getAssignments());
        if (batches.length <= 0) dispatch(getAllBatches({}));
    }, [dispatch]);

    // ✅ Convert batches to dropdown options
    const batchOptions = useMemo<ISelectOptions[]>(() => {
        return (
            batches?.map((batch) => ({
                label: batch.course?.name || "Untitled Batch",
                value: batch._id,
            })) ?? []
        );
    }, [batches]);

    // ✅ Get assignment for editing
    const editingAssignment = useMemo(
        () => assignments?.find((a) => a._id === formModel.id),
        [assignments, formModel.id]
    );

    // ✅ Initial values
    const initialValues = useMemo<IAssignmentPayload>(() => {
        if (editingAssignment) {
            return {
                batchId: editingAssignment.batchId,
                subjectId: editingAssignment.subjectId,
                title: editingAssignment.title,
                description: editingAssignment.description || "",
                instructions: editingAssignment.instructions || "",
                attachments: [],
                githubTemplateUrl: editingAssignment.githubTemplateUrl || "",
                dueDate: new Date(editingAssignment.dueDate),
                maxGrade: editingAssignment.maxGrade || 0,
                createdBy: editingAssignment.createdBy || "",
                allowLateSubmission: editingAssignment.allowLateSubmission || false,
                latePenaltyPercentage: editingAssignment.latePenaltyPercentage || 0,
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

    // ✅ Formik setup
    const formik = useFormik<IAssignmentPayload>({
        initialValues,
        validationSchema: assignmentSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                if (formModel.id) {
                    await dispatch(updateAssignment({ id: formModel.id, data: values }));
                } else {
                    await dispatch(insertAssignment(values));
                }
                handleModelToggle(); // close modal
            } catch (err) {
                console.error(err);
            }
        },
    });

    // ✅ Subject options depend on selected batch
    const subjectOptions = useMemo<ISelectOptions[]>(() => {
        const batch = batches?.find((b) => b._id === formik.values.batchId);
        if (!batch) return [];
        return (
            batch.subjects?.map((subject: any) => ({
                label: subject.name,
                value: subject._id,
            })) ?? []
        );
    }, [formik.values.batchId, batches]);

    // ✅ Error helper
    const error = (field: keyof typeof formik.values) =>
        formik.touched[field] && formik.errors[field]
            ? (formik.errors[field] as string)
            : undefined;

    const instructionsEditor = useEditor({
        extensions: [StarterKit, Bold, Italic, Underline],
        content: formik.values.instructions || "",
        onUpdate: ({ editor }) => formik.setFieldValue("instructions", editor.getHTML()),
        editorProps: {
            attributes: {
                class: "min-h-[120px] focus:outline-none",
            },
        },
    });

    // ✅ TipTap editor setup
    const descriptionEditor = useEditor({
        extensions: [StarterKit, Bold, Italic, Underline],
        content: formik.values.description || "",
        onUpdate: ({ editor }) => formik.setFieldValue("description", editor.getHTML()),
        editorProps: {
            attributes: {
                class: "min-h-[120px] focus:outline-none",
            },
        },
    });


    // ✅ Keep TipTap in sync with Formik when editing
    useEffect(() => {
        if (descriptionEditor && formik.values.description !== descriptionEditor.getHTML()) {
            descriptionEditor.commands.setContent(formik.values.description || "");
        }
    }, [formik.values.description, descriptionEditor]);

    useEffect(() => {
        if (instructionsEditor && formik.values.instructions !== instructionsEditor.getHTML()) {
            instructionsEditor.commands.setContent(formik.values.instructions || "");
        }
    }, [formik.values.instructions, instructionsEditor]);

    const handleCloseForm = () => {
        formik.resetForm({ values: initialValues });
        handleModelToggle();
    };

    return (
        <Dialog
            isOpen={formModel.toggle}
            onClose={handleCloseForm}
            title={formModel.id ? "Edit Assignment" : "Create Assignment"}
            closeOnOutsideClick={false}
        >
            <form className="grid grid-cols-1 gap-3 md:gap-5" onSubmit={formik.handleSubmit}>
                {/* Batch */}
                <Select
                    label="Batch"
                    options={batchOptions}
                    selectValue={formik.values.batchId}
                    onChange={(e) => formik.setFieldValue("batchId", e.target.value)}
                    onBlur={formik.handleBlur}
                    error={error("batchId")}
                />

                {/* Subject */}
                <Select
                    label="Subject"
                    options={subjectOptions}
                    selectValue={formik.values.subjectId}
                    onChange={(e) => formik.setFieldValue("subjectId", e.target.value)}
                    onBlur={formik.handleBlur}
                    error={error("subjectId")}
                />

                {/* Title */}
                <Input
                    id="title"
                    type="text"
                    label="Assignment Title"
                    placeholder="Enter assignment title"
                    {...formik.getFieldProps("title")}
                    error={error("title")}
                />

                {/* Description */}
                <div>
                    <label className="block font-semibold mb-1" htmlFor="description-editor">
                        Description <span className="text-red-600">*</span>
                    </label>
                    <div
                        id="description-editor"
                        className={`border rounded p-2 min-h-[120px] ${formik.errors.description ? "border-red-500" : "border-gray-300"
                            }`}
                    >
                        <EditorContent editor={descriptionEditor} />
                    </div>
                    {formik.errors.description && (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.description}</p>
                    )}
                </div>

                {/* Instruction */}
                <div>
                    <label className="block font-semibold mb-1" htmlFor="instruction-editor">
                        Instruction <span className="text-red-600">*</span>
                    </label>
                    <div
                        id="description-editor"
                        className={`border rounded p-2 min-h-[120px] ${formik.errors.instructions ? "border-red-500" : "border-gray-300"
                            }`}
                    >
                        <EditorContent editor={instructionsEditor} />
                    </div>
                    {formik.errors.instructions && (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.instructions}</p>
                    )}
                </div>

                {/* GitHub Template URL */}
                <Input
                    id="githubTemplateUrl"
                    type="url"
                    label="GitHub Template URL"
                    placeholder="Enter GitHub template link"
                    {...formik.getFieldProps("githubTemplateUrl")}
                    error={error("githubTemplateUrl")}
                />

                {/* Due Date */}
                <Input
                    id="dueDate"
                    type="date"
                    label="Due Date"
                    {...formik.getFieldProps("dueDate")}
                    error={error("dueDate")}
                />

                {/* Max Grade */}
                <Input
                    id="maxGrade"
                    type="number"
                    label="Maximum Grade"
                    placeholder="Enter max grade"
                    {...formik.getFieldProps("maxGrade")}
                    error={error("maxGrade")}
                />

                {/* Late Submission Options */}
                <div className="flex items-center gap-2">
                    <input
                        id="allowLateSubmission"
                        type="checkbox"
                        checked={formik.values.allowLateSubmission}
                        onChange={(e) => formik.setFieldValue("allowLateSubmission", e.target.checked)}
                    />
                    <label htmlFor="allowLateSubmission">Allow Late Submission</label>
                </div>

                {formik.values.allowLateSubmission && (
                    <Input
                        id="latePenaltyPercentage"
                        type="number"
                        label="Late Penalty (%)"
                        placeholder="Enter late penalty percentage"
                        {...formik.getFieldProps("latePenaltyPercentage")}
                        error={error("latePenaltyPercentage")}
                    />
                )}

                {/* Actions */}
                <div className="mt-3 flex justify-end gap-2 md:gap-5 pt-3 border-t border-gray-200">
                    <Button size="sm" variant="secondary" onClick={handleCloseForm}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        size="sm"
                        variant={formik.isSubmitting || isLoading ? "secondary" : "primary"}
                        disabled={!formik.isValid || isLoading}
                    >
                        {formModel.id ? "Update Assignment" : "Create Assignment"}
                    </Button>
                </div>
            </form>
        </Dialog>
    );
};

export default AssignmentForm;
