import React, { useEffect, useState, useCallback } from "react";
import Styles from "./Batches.module.scss";
import {
    AssignSubjectForm,
    BatchCard,
    BatchForm,
    BoxContainer,
    Button,
    Container,
    Loader,
    NoItems,
} from "../../components";
import { UserRoles } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import type { IOpenModel, ModelType } from "../../types/comman.types";
import clsx from "clsx";
import type { IBatchResponse } from "../../types/response.types";
import { getAllBatches } from "../../features/batch/batch.action";
import { getSubjects } from "../../features/subject/subject.action";
import EnrollmentForm from "../../components/Enrollments/EnrollmentForm";

const BatchesPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user, batches, subjects, total, isLoading } = useAppSelector((state) => ({
        user: state.auth.user,
        batches: state.batch.batches,
        subjects: state.subject.subjects,
        total: state.batch.total,
        isLoading: state.ui.isLoading,
    }));

    useEffect(() => {
        const payload: any = {};
        if (user?.role === UserRoles.Teacher) {
            payload.teacherId = user._id
        }
        if (batches.length <= 0) dispatch(getAllBatches(payload));
        if (subjects.length <= 0) dispatch(getSubjects({}));
    }, [dispatch, batches.length, subjects.length]);

    const [formModel, setFormModel] = useState<IOpenModel<ModelType | null>>({
        type: null,
        toggle: false,
        id: "",
    });

    const handleModelToggle = useCallback((id: string = "", type: ModelType | null = null) => {
        setFormModel({ type, toggle: type !== null, id });
    }, []);

    return (
        <Container>
            <BoxContainer>
                {/* Header */}
                <div className="flex justify-end items-center">
                    {user?.role !== UserRoles.Student && (
                        <Button
                            variant="primary"
                            size="md"
                            onClick={() => handleModelToggle("", "ADD")}
                        >
                            Add New Batch
                        </Button>
                    )}
                </div>

                {/* Data list */}
                <div className="mt-3">
                    {isLoading ? (
                        <Loader />
                    ) : batches && total > 0 ? (
                        <div
                            className={clsx(
                                Styles.CouseList,
                                "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6"
                            )}
                        >
                            {batches.map((batch: IBatchResponse) => (
                                <BatchCard
                                    key={batch._id}
                                    batch={batch}
                                    handleModelToggle={handleModelToggle}
                                />
                            ))}
                        </div>
                    ) : (
                        <NoItems title="batches" />
                    )}
                </div>
            </BoxContainer>

            {(formModel.type === 'ADD' || formModel.type === 'EDIT') && (
                <BatchForm formModel={formModel} handleToggleForm={handleModelToggle} />
            )}
            {/* Assign Subject Modal */}
            {formModel.type === "ASSIGN_SUBJECT" && (
                <AssignSubjectForm formModel={formModel} handleToggleForm={handleModelToggle} />
            )}
            {formModel.type === "STUDENTENROLLFROMBATCH" && (
                <EnrollmentForm formModel={formModel} handleToggleForm={handleModelToggle} />
            )}
        </Container>
    );
};

export default BatchesPage;
