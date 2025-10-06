import React, { useEffect, useMemo, useState } from "react";
import { Checkbox, Dialog, FormAction, Input, TextArea } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { IOpenModel, ModelType } from "../../types/comman.types";
import Loader from "../../components/Loader";
import { getSubjects } from "../../features/subject/subject.action";
import { upsertTeacher } from "../../features/teacher/teacher.action";

// ✅ Validation Schema
const teacherMetaSchema = Yup.object().shape({
    about: Yup.string().required("About is required"),
    experience: Yup.string().required("Experience is required"),
    expertise: Yup.array().of(Yup.string().required()).min(1, "Select at least one subject"),
});

interface ITeacherMetaFormProps {
    formModel: IOpenModel<ModelType | null>;
    handleToggleForm: (id?: string, type?: ModelType) => void;
}

const TeacherMetaForm: React.FC<ITeacherMetaFormProps> = ({ formModel, handleToggleForm }) => {
    const dispatch = useAppDispatch();
    const { subjects, teachers, isLoading } = useAppSelector((state) => ({
        subjects: state.subject.subjects,
        teachers: state.teachers.records,
        isLoading: state.ui.isLoading
    }));

    const [loading, setLoading] = useState(false);

    // ✅ Load expertise if empty
    useEffect(() => {
        if (subjects.length <= 0) {
            dispatch(getSubjects({}));
        }
    }, [dispatch, subjects.length]);

    // ✅ Current teacher
    const currentTeacher = useMemo(
        () => teachers.find((t) => t._id === formModel.id),
        [formModel.id, teachers]
    );

    const formik = useFormik({
        initialValues: {
            teacherId: formModel.id || "",
            about: currentTeacher?.about || "",
            experience: currentTeacher?.experience?.toString() || "",
            expertise: currentTeacher?.expertise?.map((s) => s._id) || [],
        },
        validationSchema: teacherMetaSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                await dispatch(upsertTeacher({ id: values.teacherId, data: values }));
                handleClose();
            } finally {
                setLoading(false);
            }
        },
    });

    const handleClose = () => {
        formik.resetForm();
        handleToggleForm();
    };

    const error = (field: keyof typeof formik.values) =>
        formik.touched[field] && formik.errors[field]
            ? (formik.errors[field] as string)
            : undefined;

    return (
        <Dialog
            isOpen={formModel.toggle}
            onClose={handleClose}
            title="Update Teacher Info"
            closeOnOutsideClick={false}
        >
            {loading ? (
                <div className="flex justify-center py-10">
                    <Loader />
                </div>
            ) : (
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    {/* Experience */}
                    <Input
                        id="experience"
                        type="text"
                        label="Experience (in years)"
                        placeholder="e.g., 5"
                        {...formik.getFieldProps("experience")}
                        error={error("experience")}
                    />


                    {/* About */}
                    <TextArea
                        id="about"
                        label="About"
                        placeholder="Write something about the teacher"
                        {...formik.getFieldProps("about")}
                        error={error("about")}
                    />


                    {/* Subjects Multi Select */}
                    <div className="flex flex-wrap gap-2 items-center">
                        {subjects.map((subject, index) => {
                            const isChecked = formik.values.expertise.includes(subject._id);

                            return (
                                <Checkbox
                                    key={index}
                                    label={subject.name}
                                    checked={isChecked}
                                    onChange={(e) => {
                                        const { checked } = e.target;
                                        let updatedExpertise = [...formik.values.expertise];

                                        if (checked && !updatedExpertise.includes(subject._id)) {
                                            updatedExpertise.push(subject._id);
                                        } else {
                                            updatedExpertise = updatedExpertise.filter((id) => id !== subject._id);
                                        }

                                        formik.setFieldValue("expertise", updatedExpertise);
                                    }}
                                />
                            );
                        })}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2">
                        <FormAction
                            disabled={!formik.isValid || isLoading}
                            variant={formik.isSubmitting || isLoading ? "secondary" : "primary"}
                            handleClose={handleClose}
                            handleSubmit={() => formik.submitForm()}
                            submitBtnText={formModel.id ? "Update Subject" : "Create Subject"}
                        />
                    </div>
                </form>
            )}
        </Dialog>
    );
};

export default TeacherMetaForm;
