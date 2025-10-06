import React, { useEffect, useState } from "react";
import type { IAssignmentPayload } from "../../types/payload.types";
import Dialog from ".";
import { useAppSelector } from "../../hooks/redux.hook";

import Input from "../Fields/Input";

import Editor from "../Fields/Editor";
import { EditorContent } from "@tiptap/react";

interface AssignmentFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<IAssignmentPayload>;
  onSubmit: (data: IAssignmentPayload) => void;
  tenantId: string;
  batchId: string;
  subjectId: string;
  createdBy: string;
}

const AssignmentFormDialog: React.FC<AssignmentFormDialogProps> = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
  tenantId,
  batchId,
  subjectId,
  createdBy,
}) => {
  const { currentAssignment } = useAppSelector((state) => ({
    currentAssignment: state.assignment.currentAssignment,
  }));

  // Close dialog if assignment invalid
  useEffect(() => {
    if (!currentAssignment) onClose();
  }, [currentAssignment, onClose]);

  // Form state (excluding description & instructions handled by TipTap)
  const [form, setForm] = useState<Partial<IAssignmentPayload>>({
    tenantId,
    batchId,
    subjectId,
    title: "",
    attachments: [],
    githubTemplateUrl: "",
    dueDate: new Date(),
    maxGrade: undefined,
    createdBy,
    allowLateSubmission: false,
    latePenaltyPercentage: undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync initialData into form state on open
  useEffect(() => {
    if (initialData) {
      setForm({
        ...form,
        ...initialData,
        dueDate: initialData.dueDate ? new Date(initialData.dueDate) : new Date(),
      });
      setErrors({});
    } else {
      setForm({
        tenantId,
        batchId,
        subjectId,
        title: "",
        attachments: [],
        githubTemplateUrl: "",
        dueDate: new Date(),
        maxGrade: undefined,
        createdBy,
        allowLateSubmission: false,
        latePenaltyPercentage: undefined,
      });


      setErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, isOpen]);

  // Validation function
  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.title?.trim()) errs.title = "Title is required";

    if (!descriptionEditor?.getText() || descriptionEditor.getText().trim() === "") {
      errs.description = "Description is required";
    }

    if (!form.dueDate) errs.dueDate = "Due Date is required";

    if (
      form.allowLateSubmission &&
      (form.latePenaltyPercentage === undefined ||
        form.latePenaltyPercentage < 0 ||
        form.latePenaltyPercentage > 100)
    ) {
      errs.latePenaltyPercentage = "Penalty must be between 0 and 100";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Input change handler
  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (errors[key]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    }
  };

  // File input handler (only names)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).map((file) => file.name);
    handleChange("attachments", files);
  };

  // Submit handler
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const finalData: IAssignmentPayload = {
      tenantId: form.tenantId!,
      batchId: form.batchId!,
      subjectId: form.subjectId!,
      title: form.title!.trim(),
      description: descriptionEditor ? descriptionEditor.getHTML() : "",
      instructions: instructionsEditor ? instructionsEditor.getHTML() : "",
      attachments: form.attachments || [],
      githubTemplateUrl: form.githubTemplateUrl?.trim() || "",
      dueDate: new Date(form.dueDate!),
      maxGrade: form.maxGrade,
      createdBy: form.createdBy!,
      allowLateSubmission: form.allowLateSubmission || false,
      latePenaltyPercentage: form.allowLateSubmission
        ? form.latePenaltyPercentage
        : undefined,
    };

    onSubmit(finalData);
  };
  const [description, setDescription] = useState("");

  if (!isOpen) return null;
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Assignment" : "New Assignment"}
      closeOnOutsideClick={true}
    >
      <form
        onSubmit={submitHandler}
        className="flex flex-col space-y-5 max-w-xl"
        noValidate
      >
        {/* Title */}
        <Input
          id="title"
          type="text"
          name="title"
          label="Assignment title"
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Assignment title"
          required
        />


        {/* Description */}
        <Editor
          value={description}
          onChange={setDescription}
        />
        <div>
          <label className="block font-semibold mb-1" htmlFor="description-editor">
            Description <span className="text-red-600">*</span>
          </label>
          <div
            id="description-editor"
            className={`border rounded p-2 min-h-[120px] ${errors.description ? "border-red-500" : "border-gray-300"
              }`}
          >
            <EditorContent editor={descriptionEditor} />
          </div>
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Instructions */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="instructions-editor">
            Instructions
          </label>
          <div
            id="instructions-editor"
            className="border rounded p-2 min-h-[120px] border-gray-300"
          >
            <EditorContent editor={instructionsEditor} />
          </div>
        </div>

        {/* Attachments */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="attachments">
            Attachments
          </label>
          <input
            id="attachments"
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full"
          />
          {form.attachments && form.attachments.length > 0 && (
            <ul className="mt-1 text-sm text-gray-600 list-disc list-inside max-h-24 overflow-auto">
              {form.attachments.map((f: string, i: number) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Github Template URL */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="githubTemplateUrl">
            Github Template URL
          </label>
          <input
            id="githubTemplateUrl"
            type="url"
            value={form.githubTemplateUrl || ""}
            onChange={(e) => handleChange("githubTemplateUrl", e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="https://github.com/..."
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="dueDate">
            Due Date <span className="text-red-600">*</span>
          </label>
          <input
            id="dueDate"
            type="date"
            value={form.dueDate ? form.dueDate.toISOString().slice(0, 10) : ""}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.dueDate ? "border-red-500" : "border-gray-300"
              }`}
            required
          />
          {errors.dueDate && (
            <p className="text-red-600 text-sm mt-1">{errors.dueDate}</p>
          )}
        </div>

        {/* Max Grade */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="maxGrade">
            Max Grade
          </label>
          <input
            id="maxGrade"
            type="number"
            min={0}
            value={form.maxGrade !== undefined ? form.maxGrade : ""}
            onChange={(e) =>
              handleChange(
                "maxGrade",
                e.target.value === "" ? undefined : Number(e.target.value)
              )
            }
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Maximum points for grading"
          />
        </div>

        {/* Allow Late Submission */}
        <div className="flex items-center space-x-2">
          <input
            id="allowLateSubmission"
            type="checkbox"
            checked={form.allowLateSubmission || false}
            onChange={(e) => handleChange("allowLateSubmission", e.target.checked)}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="allowLateSubmission" className="font-semibold">
            Allow Late Submission
          </label>
        </div>

        {/* Late Penalty % */}
        {form.allowLateSubmission && (
          <div>
            <label
              className="block font-semibold mb-1"
              htmlFor="latePenaltyPercentage"
            >
              Late Penalty Percentage
            </label>
            <input
              id="latePenaltyPercentage"
              type="number"
              min={0}
              max={100}
              value={
                form.latePenaltyPercentage !== undefined
                  ? form.latePenaltyPercentage
                  : ""
              }
              onChange={(e) =>
                handleChange(
                  "latePenaltyPercentage",
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
              className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.latePenaltyPercentage ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="e.g. 10 for 10%"
            />
            {errors.latePenaltyPercentage && (
              <p className="text-red-600 text-sm mt-1">
                {errors.latePenaltyPercentage}
              </p>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-3 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            {initialData ? "Update Assignment" : "Create Assignment"}
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default AssignmentFormDialog;
