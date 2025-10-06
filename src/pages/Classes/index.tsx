import React, { useEffect, useState } from "react";
import {
  BoxContainer,
  Button,
  ClassCards,
  ClassesFilter,
  Container,
  NoItems,
  ClassForm
} from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { getClasses } from "../../features/class-session/class-session.action";
import { UserRoles } from "../../constants";
import type { IModelOpen } from "../../types/comman.types";
import type { IClassSessionResponse } from "../../types/response.types";

interface IClassesProps {}

const Classes: React.FC<IClassesProps> = () => {
  const dispatch = useAppDispatch();

  const [formOpen, setFormOpen] = useState<IModelOpen>({
    isOpen: false,
    id: "",
  });

  const { classes, fetched, user } = useAppSelector((state) => ({
    classes: state.classSession.classes,
    fetched: state.classSession.fetched,
    user: state.auth.user,
  }));

  useEffect(()=>{
    if(classes.length<=0){
      dispatch(getClasses({}))
    }
  }, [dispatch]);
  // useEffect(() => {
  //   if (user && !fetched) {
  //     if (user.role === UserRoles.Student) {
  //       dispatch(getClasses({ studentId: user._id }));
  //     } else if (user.role === UserRoles.Teacher) {
  //       dispatch(getClasses({ teacherId: user._id }));
  //     }
  //   }
  // }, [user, fetched, dispatch]);

  const handleEditClass = (classId: string) => {
    setFormOpen({ isOpen: true, id: classId });
  };

  // --- Classify by time ---
  const now = new Date();

  const classifyClasses = (classes: IClassSessionResponse[]) => {
    const live: IClassSessionResponse[] = [];
    const upcoming: IClassSessionResponse[] = [];
    const completed: IClassSessionResponse[] = [];

    classes.forEach((cls) => {
      const start = new Date(cls.startTime);
      const end = new Date(cls.endTime);

      if (start <= now && end >= now) {
        live.push(cls);
      } else if (start > now) {
        upcoming.push(cls);
      } else {
        completed.push(cls);
      }
    });

    // sort them
    upcoming.sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );
    completed.sort(
      (a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime()
    );

    return { live, upcoming, completed };
  };

  const { live, upcoming, completed } = classifyClasses(classes);

  const isEmpty =
    live.length === 0 && upcoming.length === 0 && completed.length === 0;

  return (
    <Container>
      <BoxContainer>
        <div className="flex justify-between items-center">
          <ClassesFilter />
          {user?.role !== UserRoles.Student && (
            <Button variant="primary" size="md" onClick={() => setFormOpen({ isOpen: true, id: "" })}>
              Add Class
            </Button>
          )}
        </div>

        {/* Empty State */}
        {isEmpty && (
            <NoItems title="class" />
        )}

        {/* Live Classes */}
        {live.length > 0 && (
          <ClassCards
            classSession={live}
            title={<>🔴 Live Classes</>}
            category="IsLive"
            handleEditClass={handleEditClass}
          />
        )}

        {/* Upcoming Classes */}
        {upcoming.length > 0 && (
          <ClassCards
            classSession={upcoming}
            title={<>⏳ Upcoming Classes</>}
            category="Upcoming"
            handleEditClass={handleEditClass}
          />
        )}

        {/* Completed Classes */}
        {completed.length > 0 && (
          <ClassCards
            classSession={completed}
            title={<>✅ Completed Classes</>}
            category="Completed"
            handleEditClass={handleEditClass}
          />
        )}
      </BoxContainer>

      <ClassForm
        formOpen={formOpen}
        handleToggleForm={(toggle: boolean) =>
          setFormOpen({ isOpen: toggle, id: "" })
        }
      />
    </Container>
  );
};

export default Classes;
