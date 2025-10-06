import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BoxContainer, Button, Container, Form, Input } from "../../components";
import type { IOrganizationPayload } from "../../types/payload.types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { getOrganization, insertOrganization, updateOrganization } from "../../features/organization/organization.action";
import { setLoading } from "../../features/ui/ui.slice";

// ✅ Validation Schema
export const organizationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Organization name is required")
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name cannot exceed 100 characters"),

    email: Yup.string().required("Email is required").email("Invalid email format"),

    contactPhone: Yup.string()
        .required("Contact phone is required")
        .matches(/^[0-9]{10,15}$/, "Phone number must be 10–15 digits"),

    address: Yup.string()
        .required("Address is required")
        .max(200, "Address cannot exceed 200 characters"),

    domain: Yup.string()
        .required("Domain is required")
        .matches(/^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,11}?$/, "Invalid domain format"),

    logoImage: Yup.mixed().required("Course banner image is required"),

    status: Yup.boolean().default(true),
    isDeleted: Yup.boolean().default(false),
});

const Settings: React.FC = () => {
    const dispatch = useAppDispatch();
    const [preview, setPreview] = useState<string | null>(null);
    const { organization } = useAppSelector((state) => ({
        organization: state.organization.data,
        isLoading: state.organization.isLoading,
    }));

    // ✅ Initial Values (Edit vs Create)
    const getInitialValues = (): IOrganizationPayload => {
        if (organization) {
            return {
                _id: organization._id || undefined,
                name: organization.name,
                logoImage: organization.logo, // string URL
                email: organization.email,
                contactPhone: organization.contactPhone,
                address: organization.address,
                domain: organization.domain,
                status: organization.status ?? true,
                isDeleted: organization.isDeleted ?? false,
            };
        }
        return {
            name: "",
            logoImage: "",
            email: "",
            contactPhone: "",
            address: "",
            domain: "",
            status: true,
        };
    };

    const formik = useFormik<IOrganizationPayload>({
        initialValues: getInitialValues(),
        validationSchema: organizationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            dispatch(setLoading(true));

            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value as any);
            });

            try {
                if (organization && organization._id) {
                    await dispatch(updateOrganization({ id: organization._id, data: formData }));
                } else {
                    await dispatch(insertOrganization(formData));
                }
            } finally {
                dispatch(setLoading(false));
            }
        },
    });

    useEffect(() => {
        if (!organization) {
            dispatch(getOrganization());
        }
    }, [dispatch, organization]);

    return (
        <Container>
            <BoxContainer className="flex justify-center ">
                <div className="min-w-[425px] max-w-[500px]">
                    <Form
                        header={`Organization`}
                        handleSubmit={formik.handleSubmit}
                    >
                        {/* Organization Name */}
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            label="Organization name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Organization name"
                            error={formik.errors.name}
                        />
                        {/* ✅ File Upload with Preview */}
                        <div className="flex flex-col gap-2">
                            <Input
                                id="logoImage"
                                type="file"
                                label="Organization Logo"
                                accept="image/*"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    if (e.currentTarget.files && e.currentTarget.files[0]) {
                                        const file = e.currentTarget.files[0];
                                        formik.setFieldValue("logoImage", file);
                                        setPreview(URL.createObjectURL(file));
                                    }
                                }}
                                error={formik.errors.logoImage}
                            />

                            {(preview || (typeof formik.values.logoImage === "string" && formik.values.logoImage)) && (
                                <div className="mt-2">
                                    <img
                                        src={
                                            preview ||
                                            (typeof formik.values.logoImage === "string"
                                                ? formik.values.logoImage
                                                : "")
                                        }
                                        alt="Organization Logo Preview"
                                        className="w-full h-40 object-cover rounded-md border"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Email */}
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            label="Organization email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Organization email"
                            error={formik.errors.email}

                        />

                        {/* Contact Phone */}
                        <Input
                            id="contactPhone"
                            type="text"
                            name="contactPhone"
                            label="Organization contact number"
                            value={formik.values.contactPhone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Organization contact number"
                            error={formik.errors.contactPhone}
                        />

                        {/* Address */}
                        <Input
                            id="address"
                            type="text"
                            name="address"
                            label="Organization address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Organization address"
                            error={formik.errors.address}
                        />

                        {/* Domain */}
                        <Input
                            id="domain"
                            type="text"
                            name="domain"
                            label="Organization domain"
                            value={formik.values.domain}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Organization domain (e.g., myorg.com)"
                            error={formik.errors.domain}
                        />

                        {/* Status (toggle checkbox) */}
                        <div className="flex items-center gap-2 mt-4">
                            <input
                                id="status"
                                type="checkbox"
                                name="status"
                                checked={formik.values.status}
                                onChange={formik.handleChange}
                            />
                            <label htmlFor="status">Active</label>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={formik.isSubmitting}
                            className="mt-4 px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
                        >
                            {organization?._id ? "Update Organization" : "Create Organization"}
                        </Button>

                    </Form>
                </div>
            </BoxContainer>
        </Container>
    );
};

export default Settings;
