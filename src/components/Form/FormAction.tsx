
import React from "react";
import Button from "../Button";

interface IFormActionProps {
    disabled: boolean;
    variant: "secondary" | "primary";
    handleClose: () => void;
    handleSubmit: () => void;
    submitBtnText: string;
    cancelBtnText?: string;
}
const FormAction: React.FC<IFormActionProps> = ({ disabled, variant, handleClose, handleSubmit, submitBtnText = "Submit", cancelBtnText = "Cancel" }) => (
    <div className="w-full flex justify-end gap-2 md:gap-5 pt-3 border-t border-gray-200">
        <Button size="sm" variant="secondary" onClick={handleClose}>
            {cancelBtnText}
        </Button>
        <Button
            type="submit"
            size="sm"
            variant={variant}
            disabled={disabled}
            onClick={handleSubmit}
        >
            {submitBtnText}
        </Button>
    </div>
);

export default FormAction;