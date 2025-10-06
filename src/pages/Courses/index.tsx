import React, { useEffect, useState } from "react";
import Styles from "./Courses.module.scss";
import {
    BoxContainer,
    Button,
    Container,
    CourseCard,
    CourseFilter,
    CourseForm,
    Loader,
    NoItems,
} from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { UserRoles } from "../../constants";
import type { IModelOpen } from "../../types/comman.types";
import clsx from "clsx";
import { getCourses } from "../../features/courses/courses.action";

const Courses: React.FC = () => {
    const dispatch = useAppDispatch();
    const [formOpen, setFormOpen] = useState<IModelOpen>({
        isOpen: false,
        id: "",
    });

    const { user, courses, total, isLoading } = useAppSelector((state) => ({
        user: state.auth.user,
        courses: state.course.courses,
        total: state.course.total,
        isLoading: state.course.isLoading,
    }));

    useEffect(() => {
        if (user) {
            if (user.role === UserRoles.Student) {
                dispatch(getCourses({ studentId: user._id }));
            } else if (user.role === UserRoles.Teacher) {
                dispatch(getCourses({ teacherId: user._id }));
            } else {
                dispatch(getCourses({}));
            }
        }
    }, [user, dispatch]);



    const handleEditCourse = (courseId: string) => {
        setFormOpen({ isOpen: true, id: courseId });
    };

    return (
        <Container>
            <BoxContainer>
                {/* Header */}
                <div className={`flex justify-${total > 10 ? 'between' : 'end'} items-center`}>
                    {total > 10 && <CourseFilter />}
                    {user?.role !== UserRoles.Student && (
                        <Button variant="primary" size="md" onClick={() => setFormOpen({ isOpen: true, id: "" })}>
                            Add Course
                        </Button>
                    )}
                </div>

                {/* Data list */}
                <div className="mt-3">
                    {isLoading ? (
                        <Loader />
                    ) : courses && total > 0 ? (
                        <div
                            className={clsx(
                                Styles.CouseList,
                                "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6"
                            )}
                        >
                            {courses.map((course) => (
                                <CourseCard
                                    key={course._id}
                                    course={course}
                                    handleEditCourse={handleEditCourse}
                                />
                            ))}
                        </div>
                    ) : (
                        <NoItems title="courses" />
                    )}
                </div>
            </BoxContainer>
            <CourseForm
                formOpen={formOpen}
                handleToggleForm={(toggle: boolean) =>
                    setFormOpen({ isOpen: toggle, id: "" })
                }
            />
        </Container>
    );
};

export default Courses;
