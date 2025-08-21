import React, { useState } from "react";
import type { IAssignmentPayload } from "../../types/payload.types";
import AssignmentFormDialog from "../../components/Dialog/AssignmentFormDialog";
import { Button } from "../../components";

const AssignmentForm = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState<Partial<IAssignmentPayload> | undefined>();

    const tenantId = "tenant123";
    const batchId = "batch456";
    const subjectId = "subject789";
    const userId = "userABC";

    const handleSubmit = (data: IAssignmentPayload) => {
        console.log("Submit data:", data);
        setModalOpen(false);
        // call your API to create or update here
    };

    return (
        <>
            <Button variant="primary" onClick={() => setModalOpen(() => true)}>
                New Assignment
            </Button>
            <AssignmentFormDialog
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={editData}
                tenantId={tenantId}
                batchId={batchId}
                subjectId={subjectId}
                createdBy={userId}
            />
        </>
    );
};

export default AssignmentForm
