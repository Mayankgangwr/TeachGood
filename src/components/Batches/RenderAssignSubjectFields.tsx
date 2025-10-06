import { useMemo } from "react";
import type { IAssignSubjectToBatchPayload } from "../../types/payload.types";
import Select from "../Fields/Select";
import Input from "../Fields/Input";
import Checkbox from "../Fields/Checkbox";
import IconButton from "../Button/IconButton";
import { Minus } from "lucide-react";
import { useAppSelector } from "../../hooks/redux.hook";
import React from "react";

interface IRenderFieldsProps {
  assignment: IAssignSubjectToBatchPayload & { uid: string };
  index: number;
  formik: any;
  handleAssignmentFields: (operation: "ADD" | "DELETE", index: number) => void;
}

const initialFields: IAssignSubjectToBatchPayload = {
  teacherId: "",
  subjectId: "",
  name: "",
  order: 1,
  mandatory: true,
};

const RenderFieldsComponent: React.FC<IRenderFieldsProps> = ({
  assignment,
  index,
  formik,
  handleAssignmentFields,
}) => {
  const { teachers, subjects } = useAppSelector((state) => ({
    teachers: state.teachers.records,
    subjects: state.subject.subjects,
  }));

  // Memoize teacher options
  const teacherOptions = useMemo(
    () =>
      teachers
        .filter((teacher) => teacher.expertise?.length)
        .map((teacher) => ({ value: teacher._id, label: teacher.name })),
    [teachers]
  );

  // Memoize subject options based on selected teacher
  const subjectOptions = useMemo(() => {
    const teacher = teachers.find((t) => t._id === assignment.teacherId);
    if (!teacher?.expertise?.length) return [];
    return teacher.expertise.map((subject) => ({
      value: subject._id,
      label: subject.name,
    }));
  }, [assignment.teacherId, teachers]);

  const getError = (field: keyof typeof initialFields, index: number) => {
    const touched = (formik.touched.assignments?.[index] as any)?.[field];
    const err = (formik.errors.assignments?.[index] as any)?.[field];
    return touched && err ? err : undefined;
  };


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border border-gray-200 p-3 rounded-md relative">
      <Select
        id="teacherId"
        label="Teacher"
        options={teacherOptions}
        selectValue={assignment.teacherId}
        onChange={(e) =>
          formik.setFieldValue(`assignments.${index}.teacherId`, e.target.value)
        }
        onBlur={formik.handleBlur}
        error={getError("teacherId", index)}
      />

      <Select
        id="subjectId"
        label="Subject"
        options={subjectOptions}
        selectValue={assignment.subjectId}
        onChange={(e) => {
          const sub = subjects.find((s) => s._id === e.target.value);
          if (!sub) return;
          formik.setFieldValue(`assignments.${index}.subjectId`, e.target.value);
          formik.setFieldValue(`assignments.${index}.name`, sub.name);
        }}
        onBlur={formik.handleBlur}
        error={getError("subjectId", index)}
      />

      <Input
        id={`assignments.${index}.name`}
        type="text"
        label="Batch Name"
        placeholder="Enter batch name"
        value={assignment.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={getError("name", index)}
      />

      <Input
        id={`assignments.${index}.order`}
        type="number"
        label="Order"
        placeholder="Enter order"
        value={assignment.order}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={getError("order", index)}
      />

      <Checkbox
        id={`assignments.${index}.mandatory`}
        label="Mandatory"
        checked={assignment.mandatory}
        onChange={(e) =>
          formik.setFieldValue(
            `assignments.${index}.mandatory`,
            e.target.checked
          )
        }
        onBlur={formik.handleBlur}
      />

      {formik.values.assignments.length > 1 && (
        <IconButton
          type="button"
          className="absolute bottom-1.5 right-3"
          onClick={() => handleAssignmentFields("DELETE", index)}
          icon={<Minus />}
        />
      )}
    </div>
  );
};

// ✅ Wrap in React.memo so it only re-renders if assignment or index change
const RenderFields = React.memo(RenderFieldsComponent, (prev, next) => {
  // shallow compare assignment object and index
  return (
    prev.index === next.index &&
    prev.assignment.teacherId === next.assignment.teacherId &&
    prev.assignment.subjectId === next.assignment.subjectId &&
    prev.assignment.name === next.assignment.name &&
    prev.assignment.order === next.assignment.order &&
    prev.assignment.mandatory === next.assignment.mandatory
  );
});

export default RenderFields;
