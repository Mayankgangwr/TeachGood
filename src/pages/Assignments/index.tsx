import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { AssignmentForm, BoxContainer, Button, Container, DocBtn, LinkBtn, NoItems } from "../../components";
import { getAssignmentById, getAssignments } from "../../features/assignment/assignment.action";
import { useNavigate } from "react-router-dom";
import { toggleSubmitAssignmentDialog } from "../../features/assignment/assignment.slice";
import { Github } from "lucide-react";
import AssignmentSubmitForm from "./AssignmentSubmitForm";
import { formatteDate } from "../../utils/date-time";
import { UserRoles } from "../../constants";
import type { IOpenModel, ModelType } from "../../types/comman.types";

const Assignments = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { assignments, total, user } = useAppSelector((state) => ({
        assignments: state.assignment.records,
        total: state.assignment.total,
        user: state.auth.user,
    }));

    const [formModel, setFormModel] = useState<IOpenModel<ModelType | null>>({
        type: null,
        toggle: false,
        id: "",
    });

    const handleModelToggle = useCallback((id: string = "", type: ModelType | null = null) => {
        setFormModel({ type, toggle: type !== null, id });
    }, []);


    console.log("assignments", assignments);

    useEffect(() => {
        dispatch(getAssignments());
    }, [dispatch]);

    const handleSubmitAssignment = (assignmentId: string) => {
        dispatch(getAssignmentById(assignmentId)).then(() =>
            dispatch(toggleSubmitAssignmentDialog(true))
        );
    }

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {assignments?.length ? assignments.map((assignment) => (
                        <div
                            key={assignment._id}
                            className="flex flex-col justify-between bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-3 py-2 bg-indigo-50 border-b border-indigo-100">
                                <div className="flex flex-col gap-0.5">
                                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                                        {assignment.title}
                                    </h3>
                                    <span className="text-xs text-gray-950">
                                        {formatteDate(assignment.dueDate)}
                                    </span>

                                </div>
                                <LinkBtn
                                    size="sm"
                                    onClick={() => navigate(`/assignments/${assignment._id}`)}
                                >
                                    View
                                </LinkBtn>
                            </div>

                            {/* Content */}
                            <section className="px-3 py-2 flex flex-col gap-3">
                                <div
                                    className="text-gray-700 text-sm max-h-24 overflow-hidden"
                                    dangerouslySetInnerHTML={{ __html: assignment.description }}
                                />

                                {/* Attachments */}
                                {assignment.attachments?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {assignment.attachments.map((file: string, index: number) => (
                                            <DocBtn key={`${file}-${index}`} fileName={file} />
                                        ))}
                                    </div>
                                )}

                                {/* GitHub Template Button */}
                                {assignment.githubTemplateUrl && (
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        className="flex items-center gap-2"
                                        onClick={() =>
                                            window.open(assignment.githubTemplateUrl, "_blank")
                                        }
                                    >
                                        <Github className="w-4 h-4" />
                                        Code Template
                                    </Button>
                                )}
                            </section>

                            {/* Footer */}
                            <footer className="px-3 py-2 bg-white border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                                <div className="flex-1 w-full max-w-md flex items-center gap-3">
                                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${assignment?.progress || 0}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-gray-500 whitespace-nowrap">
                                        {assignment?.progress || 0}%
                                    </span>
                                </div>

                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={() => handleSubmitAssignment(assignment._id)}
                                >
                                    Submit
                                </Button>
                            </footer>
                        </div>
                    )) : (
                        <NoItems title={"Assignment"} />
                    )}
                    {(formModel.type === "ADD" || formModel.type === "EDIT") && (
                        <AssignmentForm formModel={formModel} handleModelToggle={handleModelToggle} />
                    )}
                    {formModel.toggle && (
                        <AssignmentSubmitForm />
                    )}
                </div>
            </BoxContainer>
        </Container>

    );
};

export default Assignments;
