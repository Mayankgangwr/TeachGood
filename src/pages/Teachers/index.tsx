import React, { useEffect, useState } from "react";
import Styles from "./Teachers.module.scss";
import {
    BoxContainer,
    Container,
    Loader,
    NoItems,
    TeacherCard,
    CourseFilter,
    // TeacherForm,
} from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { UserRoles } from "../../constants";
import type { IModelOpen } from "../../types/comman.types";
import clsx from "clsx";
import { getTeachers } from "../../features/teacher/teacher.action";

const TeachersPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [formOpen, setFormOpen] = useState<IModelOpen>({
        isOpen: false,
        id: "",
    });

    const { user, teachers, total, isLoading } = useAppSelector((state) => ({
        user: state.auth.user,
        teachers: state.teachers.records,
        total: state.teachers.total,
        isLoading: state.teachers.isLoading,
    }));

    useEffect(() => {
        // Fetch teachers based on user role
        if (user && teachers.length <= 0) {
            if (user.role === UserRoles.Student) {
                // Students might not have access to teacher list
                dispatch(getTeachers({}));
            } else if (user.role === UserRoles.Teacher) {
                // Optionally, show only themselves
                dispatch(getTeachers({ teacherId: user._id }));
            } else {
                // Admin gets all teachers
                dispatch(getTeachers({}));
            }
        }
    }, [user, dispatch]);

    const handleEditTeacher = (teacherId: string) => {
        setFormOpen({ isOpen: true, id: teacherId });
    };

    return (
        <Container>
            <BoxContainer>
                {/* Header */}
                <div className={`flex justify-${total > 10 ? 'between' : 'end'} items-center`}>
                    {total > 10 && <CourseFilter />}
                    {/* {user?.role === UserRoles.Admin && (
                        <Button
                            variant="primary"
                            size="md"
                            onClick={() => setFormOpen({ isOpen: true, id: "" })}
                        >
                            Add Teacher
                        </Button>
                    )} */}
                </div>

                {/* Data list */}
                <div className="">
                    {isLoading ? (
                        <Loader />
                    ) : teachers && total > 0 ? (
                        <div
                            className={clsx(
                                Styles.TeacherList,
                                "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-3 lg:gap-4"
                            )}
                        >
                            {teachers.map((teacher) => (
                                <TeacherCard
                                    key={teacher._id}
                                    teacher={teacher}
                                    handleEditTeacher={handleEditTeacher}
                                />
                            ))}
                        </div>
                    ) : (
                        <NoItems title="teachers" />
                    )}
                </div>
            </BoxContainer>
        </Container>
    );
};

export default TeachersPage;
