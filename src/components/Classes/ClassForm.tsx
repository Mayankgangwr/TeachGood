import React, { useEffect, useMemo, useState } from "react";
import { Button, Dialog, Select, Input } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { IModelOpen, ISelectOptions } from "../../types/comman.types";
import Loader from "../../components/Loader";
import type { IClassSessionPayload } from "../../types/payload.types";
import { insertClass, updateClass } from "../../features/class-session/class-session.action";
import moment from "moment";
import { getAllBatches } from "../../features/batch/batch.action";

// ✅ Validation Schema
const classSchema = Yup.object().shape({
    batchId: Yup.string().required("Batch is required"),
    subjectId: Yup.string().required("Subject is required"),
    title: Yup.string().required("Title is required"),
    startTime: Yup.date().required("Start time is required"),
    endTime: Yup.date()
        .required("End time is required")
        .min(Yup.ref("startTime"), "End time must be after start time"),
    isLive: Yup.boolean().required(),
    streamLink: Yup.string().url("Invalid link").required(),
});

interface IClassFormProps {
    formOpen: IModelOpen;
    handleToggleForm: (toggle: boolean) => void;
}

const ClassForm: React.FC<IClassFormProps> = ({ formOpen, handleToggleForm }) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

    // ✅ Selectors
    const batches = useAppSelector((state) => state.batch.batches);
    const classes = useAppSelector((state) => state.classSession.classes);

    useEffect(() => {
        if (batches.length <= 0) dispatch(getAllBatches({}));
    }, [dispatch]);

    // ✅ If edit, find existing class
    const editingClass = useMemo(
        () => classes.find((cls) => cls._id === formOpen.id),
        [formOpen.id, classes]
    );

    // ✅ Batch Options
    const batchOptions = useMemo<ISelectOptions[]>(() => {
        return [
            ...(batches?.map((batch) => ({
                label: batch.course.name,
                value: batch._id,
            })) ?? []),
        ];
    }, [batches]);

    // ✅ Build initial values dynamically (Create vs Edit)
    const getInitialValues = (): IClassSessionPayload => {
        if (editingClass) {
            return {
                batchId: editingClass.batch._id,
                subjectId: editingClass.subjectId,
                title: editingClass.title,
                startTime: editingClass.startTime,
                endTime: editingClass.endTime,
                isLive: editingClass.isLive,
                streamLink: editingClass.streamLink,
            };
        }
        return {
            batchId: "",
            subjectId: "",
            title: "",
            startTime: "",
            endTime: "",
            isLive: false,
            streamLink: "",
        };
    };

    const formik = useFormik<IClassSessionPayload>({
        initialValues: getInitialValues(),
        validationSchema: classSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                if (formOpen.id) {
                    await dispatch(updateClass({ id: formOpen.id, data: values }));
                } else {
                    await dispatch(insertClass(values));
                }
                handleCloseClassForm();
            } finally {
                setLoading(false);
            }
        },
    });

    const handleCloseClassForm = () => {
        formik.resetForm({ values: getInitialValues() });
        handleToggleForm(false);
    };

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


    const error = (field: keyof typeof formik.values) =>
        formik.touched[field] && formik.errors[field]
            ? (formik.errors[field] as string)
            : undefined;

    const FormAction = () => (
        <div className="w-full flex justify-end gap-2 md:gap-5 pt-3 border-t border-gray-200">
            <Button size="sm" variant="secondary" onClick={handleCloseClassForm}>
                Cancel
            </Button>
            <Button
                type="submit"
                size="sm"
                variant={formik.isSubmitting || loading ? "secondary" : "primary"}
                disabled={!formik.isValid || loading}
                onClick={() => formik.submitForm()}
            >
                {formOpen.id ? "Update Class" : "Create Class"}
            </Button>
        </div>
    );

    return (
        <Dialog
            isOpen={formOpen.isOpen}
            onClose={handleCloseClassForm}
            title={formOpen.id ? "Edit Class Session" : "Create Class Session"}
            closeOnOutsideClick={false}
            actions={<FormAction />}
        >
            {loading ? (
                <div className="flex justify-center py-10">
                    <Loader />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-3 md:gap-5">
                    {/* Batch Select */}
                    <Select
                        label="Batch"
                        options={batchOptions}
                        selectValue={formik.values.batchId}
                        onChange={(e) => formik.setFieldValue("batchId", e.target.value)}
                        onBlur={formik.handleBlur}
                        error={error("batchId")}
                    />

                    {/* Subject Select */}
                    {formik.values.batchId && (
                        <Select
                            label="Subject"
                            options={subjectOptions}
                            selectValue={formik.values.subjectId}
                            onChange={(e) => formik.setFieldValue("subjectId", e.target.value)}
                            onBlur={formik.handleBlur}
                            error={error("subjectId")}
                        />
                    )}

                    {/* Title */}
                    <Input
                        id="title"
                        type="text"
                        label="Class Title"
                        placeholder="Enter class title"
                        {...formik.getFieldProps("title")}
                        error={error("title")}
                    />

                    {/* Start Time */}
                    <Input
                        id="startTime"
                        type="datetime-local"
                        label="Start Time"
                        value={
                            formik.values.startTime
                                ? moment(formik.values.startTime).local().format("YYYY-MM-DDTHH:mm")
                                : ""
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={error("startTime")}
                    />

                    {/* End Time */}
                    <Input
                        id="endTime"
                        type="datetime-local"
                        label="End Time"
                        value={
                            formik.values.endTime
                                ? moment(formik.values.endTime).local().format("YYYY-MM-DDTHH:mm")
                                : ""
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={error("endTime")}
                    />

                    {/* Stream Link */}
                    <Input
                        id="streamLink"
                        type="url"
                        label="Stream Link"
                        placeholder="Enter stream link"
                        {...formik.getFieldProps("streamLink")}
                        error={error("streamLink")}
                    />
                </div>
            )}
        </Dialog>
    );
};

export default ClassForm;
