import React, { useEffect, useState } from "react";
import { Card, Container, InfoItem, Loader, NoItems, Table } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { useParams } from "react-router-dom";
import { getTeacherById } from "../../features/teacher/teacher.action";
import { getAllBatches } from "../../features/batch/batch.action";
import type { IBatchResponse, ITeacherResponse } from "../../types/response.types";
import clsx from "clsx";
import Styles from "./Teachers.module.scss";
import { Mail, User, CheckCircle, XCircle, Contact } from "lucide-react";
import { formatedDate } from "../../utils/date-time";

// Table columns for teacher view
export const teacherBatchColumns = (teacherId: string) => [
  {
    key: "name",
    title: "Batch Name",
    render: (row: IBatchResponse) => row.name,
  },
  {
    key: "course",
    title: "Course",
    render: (row: IBatchResponse) => row.course.name,
  },
  {
    key: "schedule",
    title: "Schedule",
    render: (row: IBatchResponse) => formatedDate(row.schedule),
  },
  {
    key: "subjects",
    title: "Subjects Taught",
    render: (row: IBatchResponse) =>
      row.subjects
        .filter((s) => s.teacher && s.teacher._id === teacherId)
        .map((s) => s.name)
        .join(", ") || "No Subjects",
  },
  {
    key: "students",
    title: "Students",
    render: (row: IBatchResponse) =>
      `${row.maxCapacity - row.remainingSheets}`,
  },
  {
    key: "status",
    title: "Status",
    render: (row: IBatchResponse) =>
      row.status ? (
        <span className="flex items-center gap-1 text-green-600 font-medium">
          <CheckCircle size={16} /> Active
        </span>
      ) : (
        <span className="flex items-center gap-1 text-red-600 font-medium">
          <XCircle size={16} /> Inactive
        </span>
      ),
  },
];

const TeacherProfile: React.FC = () => {
  const { id: teacherId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [teacher, setTeacher] = useState<ITeacherResponse | null>(null);

  const { isLoading, batches } = useAppSelector((state) => ({
    isLoading: state.teachers.isLoading,
    batches: state.batch.batches,
  }));

  useEffect(() => {
    if (teacherId) {
      dispatch(getTeacherById(teacherId)).then((res: any) => {
        if (res.payload) setTeacher(res.payload);
      });
      dispatch(getAllBatches({ teacherId }));
    }
  }, [teacherId, dispatch]);

  if (isLoading) return <Loader />;
  if (!teacher) return <NoItems title="Teacher" />;

  return (
    <Container>
      {/* Profile Section */}
      <div className="flex flex-col lg:flex-row items-start gap-2 md:gap-4">
        {/* Profile Avatar */}
        <div
          className={clsx(
            Styles.ProfileLogo,
            "sm:w-48 md:w-56 lg:w-64 border-4 border-gray-200 rounded-2xl shadow-md overflow-hidden"
          )}
        >
          <img
            className="w-full h-full object-cover rounded-lg"
            src={teacher.avatar || "/default-avatar.png"}
            alt={teacher.name}
          />
        </div>

        {/* Teacher Info */}
        <div className="flex-1 flex flex-col gap-2 md:gap-5 p-3 md:p-1">
          {/* Name & About */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {teacher.name}
            </h1>
            {teacher.about && (
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {teacher.about}
              </p>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {teacher.phone && (
              <InfoItem title="Phone" subTitle={teacher.phone} icon={<Contact color="#0068fd" />} />
            )}
            <InfoItem title="Email" subTitle={teacher.email} icon={<Mail color="#0068fd" />} />
            <InfoItem title="Role" subTitle={teacher.role} icon={<User color="#0068fd" />} />
            <InfoItem
              title="Status"
              subTitle={teacher.status ? "Active" : "Inactive"}
              icon={
                teacher.status ? <CheckCircle className="text-green-500" /> : <XCircle className="text-red-500" />
              }
            />
          </div>
        </div>
      </div>

      {/* Expertise Section */}
      <Card className="mt-2 md:mt-3 p-4">
        <h2 className="text-xl md:text-2xl font-semibold mb-3">Expertise</h2>
        {teacher.expertise && teacher.expertise.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            {teacher.expertise.map((exp) => (
              <Card
                key={exp._id}
                className="px-3 py-1.5 md:px-4 md:py-4 bg-gradient-to-r from-indigo-50 to-white shadow-sm rounded-xl hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-indigo-700">{exp.name}</h3>
                <p className="text-sm text-gray-600">{exp.description}</p>
              </Card>
            ))}
          </div>
        ) : (
          <NoItems title="Expertise" />
        )}
      </Card>

      {/* Teaching Batches Section */}
      <Card className="mt-2 md:mt-3 p-4">
        <h2 className="text-xl md:text-2xl font-semibold mb-3">Teaching Batches</h2>
        {batches && batches.length > 0 ? (
          <Table columns={teacherBatchColumns(teacherId!)} data={batches} />
        ) : (
          <NoItems title="No Batch" />
        )}
      </Card>
    </Container>
  );
};

export default TeacherProfile;
