import React, { useState } from "react";
import Dialog from "./index";
import Button from "../Button";
interface ConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void> | void;
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    isDanger?: boolean;
    loadingText?: string;
    children?: React.ReactNode;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    open,
    onClose,
    onConfirm,
    title = "Are you sure?",
    description,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    isDanger = false,
    loadingText = "Processing...",
    children,
}) => {
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        try {
            setLoading(true);
            await onConfirm?.();
            onClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            isOpen={open}
            onClose={onClose}
            title={title}
            description={description}
            actions={
                <>
                    <Button variant="secondary" onClick={onClose} disabled={loading}>
                        {cancelLabel}
                    </Button>
                    <Button
                        variant={isDanger ? "danger" : "primary"}
                        onClick={handleConfirm}
                        isLoading={loading}
                    >
                        {loading ? loadingText : confirmLabel}
                    </Button>
                </>
            }
        >
            {children}
        </Dialog>
    );
};

export default ConfirmationDialog;
