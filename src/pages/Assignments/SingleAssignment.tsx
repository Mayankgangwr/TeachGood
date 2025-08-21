import React, { useEffect, useState } from "react";
import {
    Calendar,
    FileText,
    User,
    BookOpen,
    ClipboardList,
    Paperclip,
    Github,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { useParams, useNavigate } from "react-router-dom";
import { getAssignmentById } from "../../features/assignment/assignment.action";
import AssignmentDetailsHeader from "./Header/AssignmentDetailsHeader";
import { Button, Container } from "../../components";
import Loader from "../../components/Loader";

const SingleAssignment: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { assignmentId } = useParams<{ assignmentId: string }>();
    const { assignment, loading, user } = useAppSelector((state) => ({
        assignment: state.assignment.currentAssignment,
        loading: state.assignment.loading,
        user: state.auth.user,
    }));
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!assignmentId) {
            navigate(-1);
            return;
        }
        if (!assignment || assignment._id !== assignmentId) {
            dispatch(getAssignmentById(assignmentId))
                .unwrap()
                .catch(() => setError(true));
        }
    }, [assignmentId, assignment, dispatch, navigate]);

    if (loading) {
        return (
            <Container>
                <div className="mt-16 text-center text-gray-500 text-lg font-medium">
                    <Loader />
                </div>
            </Container>
        );
    }

    if (error || !assignment) {
        return (
            <Container>
                <div className="mt-16 text-center text-red-600 text-lg font-semibold">
                    Assignment not found.
                </div>
            </Container>
        );
    }

    const progress = 0;

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth < 768)
        checkScreen()
        window.addEventListener("resize", checkScreen)
        return () => window.removeEventListener("resize", checkScreen)
    }, [])

    return (
        <>
            <Container className="my-0 md:my-8 mb-[35px]">
                <AssignmentDetailsHeader
                    submitted={false}
                    studentName={user?.name || "Mayank Gangwar"}
                    assignmentTitle={assignment.title}
                    dueDate={assignment.dueDate}
                    className="border-b pb-4 mb-1 md:mb-5 lg:mb-6"
                />

                <article className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
                    <header className="grid grid-cols-2 sm:grid-cols-10 md:grid-cols-12 gap-2 md:gap-6 p-4 md:p-6 text-gray-700 border-b border-gray-100 items-center">
                        {/* Course & Subject */}
                        <div className="flex items-center justify-start sm:justify-center gap-3 col-span-6 md:col-span-4">
                            <BookOpen className="text-green-600" size={20} />
                            <span className="text-sm font-medium">
                                {assignment.batch.course.name}
                                {assignment.batch.subject?.title ? ` — ${assignment.batch.subject.title}` : ""}
                            </span>
                        </div>

                        {/* Teacher Name */}
                        <div className="flex items-center justify-start sm:justify-center gap-3 col-span-4 md:col-span-4">
                            <User className="text-blue-600" size={20} />
                            <span className="text-sm font-medium">{assignment.teacher.name}</span>
                        </div>

                        {/* Date */}
                        <div className="flex items-center justify-start sm:justify-center gap-3 col-span-10 md:col-span-4">
                            <Calendar className="text-rose-600" size={20} />
                            <time
                                dateTime={new Date(assignment.createdAt).toISOString()}
                                className="text-sm font-medium"
                            >
                                Created {new Date(assignment.createdAt).toLocaleString()}
                            </time>
                        </div>
                    </header>
                    <section className="p-4 md:p-6 border-b border-gray-100">
                        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4">
                            <FileText className="text-indigo-600" size={22} /> Description
                        </h2>
                        <div
                            className="prose max-w-none text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: assignment.description }}
                        />
                    </section>

                    <section className="p-4 md:p-6 border-b border-gray-100">
                        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4">
                            <ClipboardList className="text-amber-600" size={22} /> Instructions
                        </h2>
                        <div
                            className="prose max-w-none text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: assignment.instructions }}
                        />
                    </section>

                    {assignment.attachments?.length > 0 && (
                        <section className="p-3 md:p-6 border-b border-gray-100">
                            <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4">
                                <Paperclip className="text-pink-600" size={22} /> Attachments
                            </h2>
                            <div className="bg-gray-50 p-2.5 md:p-4 rounded-lg border border-gray-200">
                                <ul className="space-y-2">
                                    {assignment.attachments.map((file: string, index: number) => (
                                        <li key={index}>
                                            <a
                                                href={file}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline text-sm"
                                            >
                                                {file.split("/").pop()}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    )}

                    {assignment.githubTemplateUrl && (
                        <section className="p-4 md:p-6 ">
                            <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4">
                                <Github className="text-gray-800" size={22} /> GitHub Template
                            </h2>
                            <a
                                href={assignment.githubTemplateUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-blue-600 hover:underline break-words text-sm"
                            >
                                {assignment.githubTemplateUrl}
                            </a>
                        </section>
                    )}
                </article>


            </Container>
            <footer className="px-3 md:px-6 py-3 md:py-4 fixed bg-white rounded shadow-md border-t border-indigo-200 flex justify-end items-center !bottom-[60px] md:!bottom-0 gap-3" style={{ width: '-webkit-fill-available' }}>
                {/* Progress Section (Horizontal) */}
                <div className="flex flex-col md:flex-row item-start md:items-center gap-0 md:gap-3 flex-1">
                    <p className="text-sm md:text-lg font-semibold text-gray-600 whitespace-nowrap">
                        Assignment Progress
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full max-w-md flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5 md:h-2 overflow-hidden">
                            <div
                                className="bg-indigo-500 h-1.5 md:h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                            {progress}%
                        </span>
                    </div>
                </div>
                <Button
                    size={isMobile ? "sm" : "md"}
                    variant="primary"
                    onClick={() => alert("Submit feature coming soon!")}
                >
                    Submit Assignment
                </Button>
            </footer>
        </>
    );
};

export default SingleAssignment;
