import React, { useEffect } from "react";
import type { IOpenModel, ModelType } from "../../types/comman.types";
import Dialog from "../Dialog";
import FormAction from "../Form/FormAction";
import { useFormik } from "formik";
import { useCashfreePayment } from "../../hooks/useCashfreePayment";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import Select from "../Fields/Select";
import { getStudents } from "../../features/student/student.action";

interface IEnrollmentFormProps {
  formModel: IOpenModel<ModelType>;
  handleToggleForm: (id?: string, type?: ModelType) => void;
}

const EnrollmentForm: React.FC<IEnrollmentFormProps> = ({ formModel, handleToggleForm }) => {
  const { doPayment } = useCashfreePayment("sandbox");
  const dispatch = useAppDispatch();
  const { students, isLoading } = useAppSelector((state) => ({
    students: state.students.records,
    isLoading: state.ui.isLoading,
  }));

  useEffect(() => {
    if (students.length <= 0) {
      dispatch(getStudents({}));
    }
  }, [dispatch, students.length]);

  const formik = useFormik({
    initialValues: {
      studentId: "",
    },
    validationSchema: Yup.object().shape({
      studentId: Yup.string().required("Student is required"),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (formModel.id) {
          await doPayment(formModel.id, values.studentId);
        }
        handleToggleForm();
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <Dialog
      isOpen={formModel.toggle}
      onClose={() => handleToggleForm()}
      title="Enroll For Batch"
      closeOnOutsideClick={false}
    >
      <form className="grid grid-cols-1 gap-3 md:gap-5" onSubmit={formik.handleSubmit}>
        {/* Student Select */}
        <Select
          label="Student"
          options={students.map((s) => ({ label: s.name, value: s._id }))}
          selectValue={formik.values.studentId}
          onChange={(e) => formik.setFieldValue("studentId", e.target.value)}
          onBlur={formik.handleBlur}
          error={formik.touched.studentId ? formik.errors.studentId : undefined}
        />

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <FormAction
            disabled={!formik.isValid || isLoading}
            variant={formik.isSubmitting || isLoading ? "secondary" : "primary"}
            handleClose={handleToggleForm}
            handleSubmit={() => formik.submitForm()}
            submitBtnText="Submit"
          />
        </div>
      </form>

      {/* Optional Web SDK Button */}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Pay with Cashfree (Web SDK)</h2>
        <button
          className="btn btn-primary"
          onClick={() => doPayment(formModel.id, formik.values.studentId || students[0]?._id)}
          style={{ padding: "10px 20px", fontSize: "16px" }}
          disabled={!formik.values.studentId}
        >
          Pay ₹100
        </button>
      </div>
    </Dialog>
  );
};

export default EnrollmentForm;
