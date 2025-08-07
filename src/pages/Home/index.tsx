import React, { useCallback, useEffect, useRef } from "react";
import { Container } from "../../components";
import Styles from "./Home.module.scss";
import clsx from "clsx";
import WelcomeHeader from "./WelcomeHeader";
import UpcomingTasks from "./UpcomingTasks";
import PerformanceCard from "./Cards/PerformanceCard";
import ActiveCourses from "./Cards/ActiveCourses";
import UpcomingClasses from "./Cards/UpcomingClasses";
import SummeryCard from "./Cards/SummeryCard";
import LearningTimeReportCard from "./Cards/LearningTimeReportCard";
import DailyActivityTimeline from "./Cards/DailyActivityTimeline";
import UpdatesPanel from "./Cards/UpdatesPanel";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { getClasses } from "../../features/class-session/class-session.action";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { classes, fetched, user } = useAppSelector((state) => ({
    classes: state.classSession.classes,
    fetched: state.classSession.fetched,
    user: state.auth.user
  }));

  const hasDispatched = useRef(false); // NEW GUARD

useEffect(() => {
  console.log("Effect called:", { userId: user?._id, classesLength: classes.length, fetched });

  if (user && !fetched && !hasDispatched.current) {
    hasDispatched.current = true;
    dispatch(getClasses({ studentId: user._id }));
  }
}, [user, fetched]);



  return (
    <Container>
      {/* Wrapper for 2 panels - responsive flex layout */}
      <div className={clsx(Styles.Home, "w-full flex flex-col md:flex-row gap-3 items-start")}>
        {/* Left Panel - takes 100% on mobile, 75% on md+ */}
        <div className={clsx(Styles.LeftPanel, "w-full gap-2 md:gap-3 md:w-3/4")}>
          <WelcomeHeader studentName="Mayank Gangwar" />

          {/* Responsive grid: 1 col on mobile, 3 cols on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-3  gap-2 md:gap-3">
            <UpcomingClasses />
            <div className="flex md:hidden  flex-col gap-2">
              <UpcomingTasks />
            </div>
            <LearningTimeReportCard />
            <ActiveCourses />
          </div>
          <div className="hidden md:block">
            <SummeryCard />
            <DailyActivityTimeline />
          </div>
        </div>

        {/* Right Panel - 100% on mobile, 25% on md+ */}
        <div className={clsx(Styles.RightPanel, "hidden md:flex w-full gap-2 md:gap-3 md:w-1/4")}>
          <UpdatesPanel />
          <UpcomingTasks />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
