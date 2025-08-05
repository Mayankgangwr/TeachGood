import React from "react";
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

const HomePage: React.FC = () => {
  return (
    <Container>
      {/* Wrapper for 2 panels - responsive flex layout */}
      <div className={clsx(Styles.Home, "w-full flex flex-col md:flex-row gap-3 items-start")}>
        {/* Left Panel - takes 100% on mobile, 75% on md+ */}
        <div className={clsx(Styles.LeftPanel, "w-full gap-2 md:gap-3 md:w-3/4")}>
          <WelcomeHeader studentName="Mayank Gangwar" />

          {/* Responsive grid: 1 col on mobile, 3 cols on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-3  gap-2 md:gap-3">
            <PerformanceCard />
            <div className="block md:hidden">
              <DailyActivityTimeline />
            </div>
            <ActiveCourses />
            <LearningTimeReportCard />
          </div>
          <div className="hidden md:block">
            <SummeryCard />
            <DailyActivityTimeline />
          </div>
        </div>

        {/* Right Panel - 100% on mobile, 25% on md+ */}
        <div className={clsx(Styles.RightPanel, "w-full gap-2 md:gap-3 md:w-1/4")}>
          <UpcomingClasses />
          <UpcomingTasks />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
