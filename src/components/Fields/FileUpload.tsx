import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Trash2 } from "lucide-react";

interface IFileUploadProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    initialData?: string[];
    label?: string;
    error?: string;
    multiple?: boolean;
    accept?: string;
    onChange?: (files: File[], removedUrls?: string[]) => void;
    handleRemoveFile?: (idx: number) => void;
}

interface Preview {
    file: File;
    url: string | null;
}

interface FilePreviewProps {
    url?: string | null;   // can be existing URL or object URL
    file?: File;           // file for name (when not image)
    index: number;
    onRemove: (index: number) => void;
}

/**
 * 🔹 Small reusable preview component
 */
const FilePreview: React.FC<FilePreviewProps> = ({ url, file, index, onRemove }) => {
    return (
        <div className="relative w-20 h-20 border rounded overflow-hidden group">
            {url ? (
                <img
                    src={url}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:blur-sm"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-500 p-1 text-center transition-transform duration-200 group-hover:blur-sm">
                    {file?.name || "File"}
                </div>
            )}

            <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 hover:bg-gray-200/50"
            >
                <Trash2 size={20} color="black" />
            </button>
        </div>
    );
};

const FileUpload: React.FC<IFileUploadProps> = ({
    label,
    error,
    multiple = false,
    accept,
    onChange,
    handleRemoveFile,
    initialData = [],
    ...props
}) => {
    const [previews, setPreviews] = useState<Preview[]>([]);

    const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const filesArray = Array.from(e.target.files);

        const newPreviews = filesArray.map((file) => ({
            file,
            url: file.type.startsWith("image/")
                ? URL.createObjectURL(file)
                : null,
        }));

        const updated = [...previews, ...newPreviews];
        setPreviews(updated);

        onChange?.(updated.map((p) => p.file));
    };

    const removeFile = (index: number) => {
        const updated = previews.filter((_, i) => i !== index);
        setPreviews(updated);
        onChange?.(updated.map((p) => p.file));
    };

    useEffect(() => {
        return () => {
            previews.forEach((p) => p.url && URL.revokeObjectURL(p.url));
        };
    }, [previews]);

    return (
        <div className="flex flex-col w-full">
            {label && (
                <label className="mb-1 text-sm font-semibold">
                    {label} <span className="text-red-600">*</span>
                </label>
            )}

            <input
                type="file"
                multiple={multiple}
                accept={accept}
                {...props}
                onChange={handleFilesChange}
                className={clsx(
                    "border rounded px-3 py-2 text-sm outline-none transition-colors",
                    error
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-300"
                        : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
                )}
            />

            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

            {/* Existing files */}
            {initialData.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {initialData.map((url, idx) => (
                        <FilePreview
                            key={idx}
                            url={url}
                            index={idx}
                            onRemove={(i) => handleRemoveFile?.(i)}
                        />
                    ))}
                </div>
            )}

            {/* Newly added files */}
            {previews.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {previews.map((p, idx) => (
                        <FilePreview
                            key={idx}
                            url={p.url}
                            file={p.file}
                            index={idx}
                            onRemove={removeFile}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileUpload;
