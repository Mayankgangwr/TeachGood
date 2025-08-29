import React, { useState } from "react";
import clsx from "clsx";
import { X } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface IMultiUrlInputProps {
    label?: string;
    error?: string;
    initialURLs?: string[];
    onChange?: (urls: string[]) => void;
}

const UrlInput: React.FC<IMultiUrlInputProps> = ({ label, error, initialURLs = [], onChange }) => {
    console.log(initialURLs)
    const [urls, setUrls] = useState<string[]>(initialURLs);

    const formik = useFormik({
        initialValues: { url: "" },
        validationSchema: Yup.object({
            url: Yup.string()
                .trim()
                .required("URL is required")
                .url("Invalid URL format"),
        }),
        onSubmit: (values, { resetForm, setFieldError}) => {
            const trimmed = values.url.trim();
            if (urls.find((url) => url === trimmed)) {
                setFieldError("url", "This URL is already added");
                return;
            }
            if (trimmed) {
                const updated = [...urls, trimmed];
                setUrls(updated);
                onChange?.(updated);
                resetForm();
            }
        },
    });

    const handleRemoveUrl = (index: number) => {
        const updated = urls.filter((_, i) => i !== index);
        setUrls(updated);
        onChange?.(updated);
    };

    return (
        <div className="flex flex-col w-full">
            {label && (
                <label className="mb-1 text-sm font-semibold">
                    {label} <span className="text-red-600">*</span>
                </label>
            )}

            <div className="flex items-center gap-2 mb-2">
                <input
                    type="url"
                    name="url"
                    placeholder="Enter URL and press Enter"
                    value={formik.values.url}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            formik.submitForm();
                        }
                    }}
                    className={clsx(
                        "border rounded px-3 py-2 text-sm outline-none w-full transition-colors",
                        (formik.touched.url && formik.errors.url) || error
                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-300"
                            : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
                    )}
                />
                <button
                    type="button"
                    onClick={() => formik.submitForm()}
                    className="bg-[#0f6cbd] hover:bg-[#115ea3] text-white px-3 py-2 rounded transition-colors text-sm"
                >
                    Add
                </button>
            </div>

            {error ?
                <p className="mt-1 text-xs text-red-500">{error}</p>
                :
                formik.touched.url && formik.errors.url && (
                    <p className="mt-1 text-xs text-red-500">{formik.errors.url}</p>
                )}

            {urls.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {urls.map((url, idx) => (
                        <div
                            key={idx}
                            className="w-full flex items-center justify-between gap-1 bg-gray-100 rounded px-2 py-1 text-sm"
                        >
                            <a href={url} target="_blank" rel="noopener noreferrer" className="truncate max-w-[90%]">
                                {url}
                            </a>
                            <button type="button" onClick={() => handleRemoveUrl(idx)} className="text-gray-500 hover:text-red-500">
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UrlInput;
