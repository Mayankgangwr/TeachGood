import React, { useEffect, useMemo } from "react";
import Dialog from "../Dialog";
import type { IOpenModel, ModelType } from "../../types/comman.types";
import Button from "../Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { insertBatch, updateBatch } from "../../features/batch/batch.action";
import Input from "../Fields/Input";
import Select from "../Fields/Select";
import moment from "moment";
import { getCourses } from "../../features/courses/courses.action";
import type { IBatchPayload } from "../../types/payload.types";

export const batchSchema = Yup.object().shape({
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

interface IBatchFormProps {
  formModel: IOpenModel<ModelType | null>;
  handleToggleForm: () => void;
}

const BatchForm: React.FC<IBatchFormProps> = ({ formModel, handleToggleForm }) => {
  const dispatch = useAppDispatch();

  const { batches, isLoading, courses } = useAppSelector((state) => ({
    batches: state.batch.batches,
    isLoading: state.ui.isLoading,
    courses: state.course.courses,
  }));

  // Fetch courses if not already fetched
  useEffect(() => {
    if (courses.length <= 0) {
      dispatch(getCourses({}));
    }
  }, [dispatch, courses.length]);

  // Get the batch being edited (if any)
  const editingBatch = useMemo(
    () => batches.find((b) => b._id === formModel.id),
    [batches, formModel.id]
  );

  // Memoized initial values for Formik
  const initialValues = useMemo<IBatchPayload>(() => {
    if (editingBatch) {
      return {
        courseId: editingBatch.course._id,
        name: editingBatch.name,
        schedule: new Date(editingBatch.schedule),
        maxCapacity: editingBatch.maxCapacity,
        fee: editingBatch.fee,
        duration: editingBatch.duration, // duration in months e.g 12 means 12 months
        accessibility: editingBatch.accessibility,  // duration in months e.g 12 means 12 months
      };
    }
    return {
      courseId: "",
      name: "",
      schedule: new Date(),
      maxCapacity: 0,
      fee: {
        amount: 0,
        currency: "INR",
      },
      duration: 6, // duration in months e.g 12 means 12 months
      accessibility: 12,  // duration in months e.g 12 means 12 months
    };
  }, [editingBatch]);

  const formik = useFormik<IBatchPayload>({
    initialValues,
    validationSchema: batchSchema,
    enableReinitialize: true, // important for editing different batches
    onSubmit: async (values) => {
      try {
        if (formModel.id) {
          await dispatch(updateBatch({ id: formModel.id, data: values }));
        } else {
          await dispatch(insertBatch(values));
        }
        handleToggleForm(); // close form after submit
      } catch (err) {
        console.error(err);
      }
    },
  });

  const handleCloseBatchForm = () => {
    formik.resetForm({ values: initialValues }); // reset fields
    handleToggleForm();
  };

  const error = (field: keyof typeof formik.values) =>
    formik.touched[field] && formik.errors[field]
      ? (formik.errors[field] as string)
      : undefined;

  return (
    <Dialog
      isOpen={formModel.toggle}
      onClose={handleCloseBatchForm}
      title={formModel.id ? "Edit Batch" : "Create Batch"}
      closeOnOutsideClick={false}
    >
      <form className="grid grid-cols-1 gap-3 md:gap-5" onSubmit={formik.handleSubmit}>
        <Select
          label="Course"
          options={courses.map((c) => ({ label: c.name, value: c._id }))}
          selectValue={formik.values.courseId}
          onChange={(e) => formik.setFieldValue("courseId", e.target.value)}
          onBlur={formik.handleBlur}
          error={error("courseId")}
        />

        <Input
          id="name"
          type="text"
          label="Batch Name"
          placeholder="Enter batch name"
          {...formik.getFieldProps("name")}
          error={error("name")}
        />

        <Input
          id="schedule"
          type="datetime-local"
          label="Schedule"
          value={
            formik.values.schedule
              ? moment(formik.values.schedule).format("YYYY-MM-DDTHH:mm")
              : ""
          }
          onChange={(e) => formik.setFieldValue("schedule", e.target.value)}
          onBlur={formik.handleBlur}
          error={error("schedule")}
        />

        <Input
          id="maxCapacity"
          type="number"
          label="Max Capacity"
          placeholder="Enter max batch capacity"
          {...formik.getFieldProps("maxCapacity")}
          error={error("maxCapacity")}
        />

        {/* Fee & Duration */}
        <div className="grid grid-cols-2 gap-2">
          <Input
            id="fee.amount"
            type="number"
            label="Fees Amount"
            placeholder="Enter fees amount"
            value={formik.values.fee?.amount ?? 0}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.fee?.amount}
          />

          <Input
            id="fee.currency"
            type="text"
            label="Fees Currency"
            placeholder="Enter fees currency"
            value={formik.values.fee?.currency ?? "INR"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.fee?.currency}
          />

          <Input
            id="duration"
            type="number"
            label="Batch Duration (months)"
            placeholder="Enter batch duration in months"
            {...formik.getFieldProps("duration")}
            error={error("duration")}
          />

          <Input
            id="accessibility"
            type="number"
            label="Batch Accessibility (months)"
            placeholder="Enter batch accessibility in months"
            {...formik.getFieldProps("accessibility")}
            error={error("accessibility")}
          />
        </div>

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

export default BatchForm;
