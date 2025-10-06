import React, { useEffect, useState } from "react";
import Styles from "./Students.module.scss";
import {
    BoxContainer,
    Container,
    Loader,
    NoItems,
    StudentCard,
    CourseFilter,
    // StudentForm,
} from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { UserRoles } from "../../constants";
import type { IModelOpen, IOpenModel, ModelType } from "../../types/comman.types";
import clsx from "clsx";
import { getStudents } from "../../features/student/student.action";
import StudentForm from "../../components/Students/StudentForm";
import EnrolledBatchList from "../../components/Students/EnrolledBatchList";

const StudentsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [enrollmentListToggle, setEnrollmentListToggle] = useState<IModelOpen>({
        isOpen: false,
        id: ""

    });

    const [openModel, setOpenModel] = useState<IOpenModel<ModelType | null>>({
        type: null,
        toggle: false,
        id: ""
    });

    const handleModelToggle = (id: string = "", type: ModelType | null = null) => {
        if (id && type) {
            setOpenModel(() => ({ type, toggle: true, id }));
            return;
        }
        setOpenModel(() => ({ type: null, toggle: false, id: "" }))
    }

    const { user, students, total, isLoading } = useAppSelector((state) => ({
        user: state.auth.user,
        students: state.students.records,
        total: state.students.total,
        isLoading: state.students.isLoading,
    }));

    useEffect(() => {
        if (user && students.length <= 0) {
            if (user.role === UserRoles.Student) {
                // Students can see only their own profile
                dispatch(getStudents({ studentId: user._id }));
            } else {
                // Admin/Teacher can see all students
                dispatch(getStudents({}));
            }
        }
    }, [user, dispatch]);

    return (
        <Container>
            <BoxContainer>
                {/* Header */}
                <div className={`flex justify-${total > 10 ? 'between' : 'end'} items-center`}>
                    {total > 10 && <CourseFilter />}
                </div>

                {/* Data list */}
                <div className="">
                    {isLoading ? (
                        <Loader />
                    ) : students && total > 0 ? (
                        <div
                            className={clsx(
                                Styles.StudentList,
                                "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6"
                            )}
                        >
                            {students.map((student) => (
                                <StudentCard
                                    key={student._id}
                                    student={student}
                                    handleToggleForm={handleModelToggle}
                                    handleListToggle={(toggleData: IModelOpen) => setEnrollmentListToggle(() => toggleData)}

                                />
                            ))}
                        </div>
                    ) : (
                        <NoItems title="students" />
                    )}

                    {openModel.type === "EDIT" && (
                        <StudentForm
                            formModel={openModel}
                            handleToggleForm={handleModelToggle}
                        />
                    )}
                    {enrollmentListToggle.isOpen && (
                        <EnrolledBatchList
                            listToggle={enrollmentListToggle}
                            handleClose={() => setEnrollmentListToggle(() => ({ id: "", isOpen: false }))}
                        />
                    )}
                </div>
            </BoxContainer>
        </Container>
    );
};

export default StudentsPage;
