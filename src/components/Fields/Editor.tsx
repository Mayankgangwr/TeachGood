// Editor.tsx
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface IEditorProps {
    value: string;
    onChange: (data: string) => void;
    editorHeight?: number;
}

const Editor: React.FC<IEditorProps> = ({
    value,
    onChange,
    editorHeight = 150,
}) => {
    /**
     * Custom upload adapter to handle image uploads.
     */
    const CustomUploadAdapter = (loader: any) => ({
        upload: async () => {
            try {
                const file: File = await loader.file;
                const formData = new FormData();
                formData.append("file", file);

                const response = await fetch("http://localhost:3000/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Image upload failed");
                }

                const data = await response.json();
                return { default: data.url }; // CKEditor expects an object with `default` key
            } catch (error) {
                console.error("Upload error:", error);
                throw error;
            }
        },
        abort: () => {
            console.warn("Upload aborted");
        },
    });

    /**
     * Plugin to integrate custom upload adapter.
     */
    const CustomUploadAdapterPlugin = (editor: any) => {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) =>
            CustomUploadAdapter(loader);
    };

    return (
        <div
            className="w-full"
            // Prevent dialog from closing when interacting with the editor
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
        >
            <CKEditor
                editor={ClassicEditor as any}
                data={value}
                onChange={(_, editor) => onChange(editor.getData())}
                config={{
                    extraPlugins: [CustomUploadAdapterPlugin],
                    placeholder: "Write your product description here...",
                    toolbar: {
                        items: [
                            "heading",
                            "|",
                            "bold",
                            "italic",
                            "underline",
                            "link",
                            "bulletedList",
                            "numberedList",
                            "|",
                            "insertTable",
                            "blockQuote",
                            "|",
                            "imageUpload",
                            "undo",
                            "redo",
                        ],
                    },
                    image: {
                        toolbar: [
                            "imageTextAlternative",
                            "imageStyle:full",
                            "imageStyle:side",
                        ],
                    },
                    table: {
                        contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
                    },
                }}
                onReady={(editor) => {
                    const root = editor.editing.view.document.getRoot();
                    if (root) {
                        editor.editing.view.change((writer) => {
                            writer.setStyle("min-height", `${editorHeight}px`, root);
                        });
                    }
                }}
            />
        </div>
    );
};

export default Editor;
