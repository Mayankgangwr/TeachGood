import React, { useState, useMemo, useEffect } from "react";
import { Button, Dialog, Input, Select } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { IModelOpen } from "../../types/comman.types";
import type { ICoursePayload } from "../../types/payload.types";
import { insertCourse, updateCourse } from "../../features/courses/courses.action";
import Loader from "../../components/Loader";
import { getDepartments } from "../../features/department/department.action";

// ✅ Validation Schema
const courseSchema = Yup.object().shape({
  departmentId: Yup.string().required("Department id is required"),
  name: Yup.string().required("Course name is required"),
  description: Yup.string().required("Description is required"),
  level: Yup.string().required("Level is required"),
  duration: Yup.string().required("Duration is required"),
  bannerImage: Yup.mixed().required("Course banner image is required"),
});

interface ICourseFormProps {
  formOpen: IModelOpen;
  handleToggleForm: (toggle: boolean) => void;
}

const CourseForm: React.FC<ICourseFormProps> = ({ formOpen, handleToggleForm }) => {
  const dispatch = useAppDispatch();
  const { courses, departments } = useAppSelector((state) => ({
    courses: state.course.courses,
    departments: state.departments.departments
  }));


  useEffect(() => {
    if (departments.length <= 0) {
      dispatch(getDepartments({}));
    }
  }, [dispatch, departments.length]);


  const [loading, setLoading] = useState(false);

  // ✅ Preview state
  const [preview, setPreview] = useState<string | null>(null);

  // ✅ If editing, find course
  const editingCourse = useMemo(
    () => courses.find((c) => c._id === formOpen.id),
    [formOpen.id, courses]
  );

  // ✅ Initial values
  const getInitialValues = (): ICoursePayload => {
    if (editingCourse) {
      return {
        departmentId: editingCourse?.department?._id || "",
        name: editingCourse.name,
        description: editingCourse.description,
        level: editingCourse.level,
        duration: editingCourse.duration,
        bannerImage: editingCourse.banner,
      };
    }
    return {
      departmentId: "",
      name: "",
      description: "",
      level: "",
      duration: "",
      bannerImage: "",
    };
  };

  const formik = useFormik<ICoursePayload>({
    initialValues: getInitialValues(),
    validationSchema: courseSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value as any);
        });

        if (formOpen.id) {
          await dispatch(updateCourse({ id: formOpen.id, data: formData }));
        } else {
          await dispatch(insertCourse(formData));
        }
        handleCloseCourseForm();
      } finally {
        setLoading(false);
      }
    },
  });

  const handleCloseCourseForm = () => {
    formik.resetForm({ values: getInitialValues() });
    setPreview(null);
    handleToggleForm(false);
  };

  const error = (field: keyof typeof formik.values) =>
    formik.touched[field] && formik.errors[field]
      ? (formik.errors[field] as string)
      : undefined;

  const FormAction = () => (
    <div className="w-full flex justify-end gap-2 md:gap-5 pt-3 border-t border-gray-200">
      <Button size="md" variant="secondary" onClick={handleCloseCourseForm}>
        Cancel
      </Button>
      <Button
        type="button"
        size="md"
        variant={loading ? "secondary" : "primary"}
        disabled={loading}
        onClick={async () => {
          // Mark all fields as touched
          formik.setTouched({
            departmentId: true,
            name: true,
            description: true,
            level: true,
            duration: true,
            bannerImage: true,
          });

          // Wait a tick to ensure touched state updates
          await new Promise((resolve) => setTimeout(resolve, 0));

          // Validate the form
          const errors = await formik.validateForm();

          if (Object.keys(errors).length === 0) {
            formik.submitForm();
          }
        }}
      >
        {formOpen.id ? "Update Course" : "Create Course"}
      </Button>

    </div>
  );


  return (
    <Dialog
      isOpen={formOpen.isOpen}
      onClose={handleCloseCourseForm}
      title={formOpen.id ? "Edit Course" : "Create Course"}
      closeOnOutsideClick={false}
    >
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader />
        </div>
      ) : (

        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-3 md:gap-5">
          <Select
            label="Department"
            options={departments.map((el) => ({ label: el.name, value: el._id }))}
            selectValue={formik.values.departmentId}
            onChange={(e) => {
              const val = e.target.value;
              formik.setFieldValue("departmentId", val)
            }}
            onBlur={formik.handleBlur}
            error={error("departmentId")}
          />
          <Input
            id="name"
            type="text"
            label="Course Name"
            placeholder="Enter course name"
            {...formik.getFieldProps("name")}
            error={error("name")}
          />

          <Input
            id="description"
            type="text"
            label="Description"
            placeholder="Enter description"
            {...formik.getFieldProps("description")}
            error={error("description")}
          />

          <Input
            id="level"
            type="text"
            label="Level"
            placeholder="Beginner, Intermediate, Advanced"
            {...formik.getFieldProps("level")}
            error={error("level")}
          />

          <Input
            id="duration"
            type="text"
            label="Duration"
            placeholder="e.g., 6 weeks"
            {...formik.getFieldProps("duration")}
            error={error("duration")}
          />

          {/* ✅ File Upload with Preview */}
          <div className="flex flex-col gap-2">
            <Input
              id="bannerImage"
              type="file"
              label="Course Image"
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.currentTarget.files && e.currentTarget.files[0]) {
                  const file = e.currentTarget.files[0];
                  formik.setFieldValue("bannerImage", file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
              error={error("bannerImage")}
            />

            {(preview || typeof formik.values.bannerImage === "string") && (
              <div className="mt-2">
                <img
                  src={
                    preview ||
                    (typeof formik.values.bannerImage === "string"
                      ? formik.values.bannerImage
                      : "")
                  }
                  alt="Course Preview"
                  className="w-full h-40 object-cover rounded-md border"
                />
              </div>
            )}
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <FormAction />
          </div>
        </form>
      )
      }
    </Dialog >
  );
};

export default CourseForm;
