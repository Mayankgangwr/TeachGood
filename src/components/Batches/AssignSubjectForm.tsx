import React, { useEffect, useMemo } from "react";
import Dialog from "../Dialog";
import Button from "../Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import IconButton from "../Button/IconButton";
import { Plus } from "lucide-react";
import { getTeachers } from "../../features/teacher/teacher.action";
import { getSubjects } from "../../features/subject/subject.action";
import { assignSubjectsOnBatch } from "../../features/batch/batch.action";
import type { IOpenModel, ModelType } from "../../types/comman.types";
import type { IAssignSubjectToBatchPayload } from "../../types/payload.types";
import RenderFields from "./RenderAssignSubjectFields";

// Helper to make a new assignment with a stable uid
const createInitialFields = (
  order: number = 1
): IAssignSubjectToBatchPayload & { uid: string } => ({
  uid: crypto.randomUUID(),
  teacherId: "",
  subjectId: "",
  name: "",
  order,
  mandatory: true,
});

export const assignSubjectSchema = Yup.object().shape({
  assignments: Yup.array()
    .of(
      Yup.object().shape({
        teacherId: Yup.string().required("Teacher is required"),
        subjectId: Yup.string().required("Subject is required"),
        order: Yup.number()
          .typeError("Order must be a number")
          .required("Order is required")
          .min(1, "Order must be at least 1"),
        mandatory: Yup.boolean(),
        name: Yup.string().optional(),
      })
    )
    .min(1, "At least one assignment is required"),
});

interface IAssignSubjectFormProps {
  formModel: IOpenModel<ModelType | null>;
  handleToggleForm: (id?: string, type?: ModelType) => void;
}

const AssignSubjectForm: React.FC<IAssignSubjectFormProps> = ({
  formModel,
  handleToggleForm,
}) => {
  console.log(formModel, "DATAAAA")
  const dispatch = useAppDispatch();
  const { batches, teachers, subjects, isLoading } = useAppSelector((state) => ({
    batches: state.batch.batches,
    teachers: state.teachers.records,
    subjects: state.subject.subjects,
    isLoading: state.ui.isLoading,
  }));

  // Fetch teachers & subjects if not already loaded
  useEffect(() => {
    if (!teachers.length) dispatch(getTeachers({}));
    if (!subjects.length) dispatch(getSubjects({}));
  }, [dispatch, teachers.length, subjects.length]);

  // Compute initial assignments
  const initialAssignments = useMemo(() => {
    if (!formModel.id || !batches.length) {
      return [createInitialFields(1)];
    }
    const batch = batches.find((b) => b._id === formModel.id);
    if (!batch) return [createInitialFields(1)];

    return batch.subjects.map((subject, idx) => ({
      uid: crypto.randomUUID(),
      teacherId: subject.teacher._id,
      subjectId: subject._id,
      name: subject.name,
      order: subject.order ?? idx + 1,
      mandatory: subject.mandatory,
    }));
  }, [formModel.id, batches]);

  const formik = useFormik<{ assignments: (IAssignSubjectToBatchPayload & { uid: string })[] }>({
    initialValues: {
      assignments: initialAssignments,
    },
    validationSchema: assignSubjectSchema,
    enableReinitialize: true, // important!
    onSubmit: async (values) => {
      try {
        // strip out uid before sending
        const payload = values.assignments.map(({ uid, ...rest }) => rest);
        await dispatch(assignSubjectsOnBatch({ id: formModel.id, data: payload })).unwrap();
        handleToggleForm();
      } catch (err) {
        console.error(err);
      }
    },
  });

  const handleAssignmentFields = (operation: "ADD" | "DELETE", index: number = -1) => {
    const prevValues = [...formik.values.assignments];
    if (operation === "ADD") {
      formik.setFieldValue("assignments", [...prevValues, createInitialFields(prevValues.length + 1)]);
    } else if (operation === "DELETE" && index > -1) {
      formik.setFieldValue(
        "assignments",
        prevValues.filter((_, i) => i !== index)
      );
    }
  };

  const handleCloseForm = () => {
    handleToggleForm();
    formik.resetForm();
  };

  return (
    <Dialog
      isOpen={formModel.toggle}
      onClose={handleCloseForm}
      title="Assign Subjects to Batch"
      closeOnOutsideClick={false}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 gap-4 max-h-[70vh] overflow-y-auto"
      >
        {formik.values.assignments.map((assignment, index) => (
          <RenderFields
            key={assignment.uid} // ✅ stable key
            assignment={assignment}
            index={index}
            formik={formik}
            handleAssignmentFields={handleAssignmentFields}
          />
        ))}

        <div className="flex justify-end gap-2">
          <IconButton
            type="button"
            variant="primary"
            className="w-10"
            onClick={() => handleAssignmentFields("ADD")}
            icon={<Plus />}
          />
        </div>

        <div className="flex justify-end gap-2 md:gap-5 pt-3 border-t border-gray-200">
          <Button size="md" variant="secondary" onClick={handleCloseForm}>
            Cancel
          </Button>
          <Button
            type="submit"
            size="md"
            variant={formik.isSubmitting || isLoading ? "secondary" : "primary"}
            disabled={!formik.isValid || isLoading}
          >
            {formik.isSubmitting || isLoading ? "Saving..." : "Save Assignments"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default AssignSubjectForm;
