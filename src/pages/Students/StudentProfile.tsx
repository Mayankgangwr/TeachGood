import React, { useEffect, useState } from "react";
import { Card, Container, InfoItem, Loader, NoItems, Table } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { useParams } from "react-router-dom";
import { getStudentById } from "../../features/student/student.action";
import type { IEnrollmentResponse, IStudentResponse } from "../../types/response.types";
import clsx from "clsx";
import Styles from "./Students.module.scss";
import { Calendar, Contact, Home, Mail, User } from "lucide-react";
import { formatedDate } from "../../utils/date-time";
import EnrolledBatchList, { enrollmentColumns } from "../../components/Students/EnrolledBatchList";


const StudentProfile: React.FC = () => {
    const { id: studentId } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const [student, setStudent] = useState<IStudentResponse | null>(null);
    const [showEnrollments, setShowEnrollments] = useState(false);

    const { isLoading } = useAppSelector((state) => ({
        isLoading: state.students.isLoading,
    }));

    useEffect(() => {
        if (studentId) {
            dispatch(getStudentById(studentId)).then((res: any) => {
                if (res.payload) setStudent(res.payload);
            });
        }
    }, [studentId, dispatch]);

    if (isLoading) return <Loader />;
    if (!student) return <NoItems title="Student" />;

    return (
        <Container>
            <div className="flex flex-col lg:flex-row items-start gap-6">
                {/* Profile Avatar */}
                <div className={clsx(Styles.ProfileLogo, "w-full lg:w-72 border-4 border-gray-300 rounded-xl shadow-xl overflow-hidden")}>
                    <img
                        className="w-full h-full object-cover rounded-lg"
                        src={student.avatar || "/default-avatar.png"}
                        alt={student.name}
                    />
                </div>

                {/* Student Info */}
                
                <div className="w-full flex-1 flex flex-col gap-4">
                    <h1 className="text-4xl font-bold">{student.name}</h1>

                    {/* Personal Info Grid */}
                    <div className=" w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                        {student.phone && <InfoItem title="Studnet's Phone" subTitle={student.phone} icon={<Contact color="#0068fd" />} />}
                        {student.email && <InfoItem title="Studnet's Email" subTitle={student.email} icon={<Mail color="#0068fd" />} />}
                        {student.dateOfAdmission && <InfoItem title="Admission Date" subTitle={formatedDate(student.dateOfAdmission)} icon={<Calendar color="#0068fd" />} />}
                        {student.dateOfBirth && <InfoItem title="Date of Birth" subTitle={formatedDate(student.dateOfBirth)} icon={<Calendar color="#0068fd" />} />}
                        {student.address && <InfoItem title="Studnet's Address" subTitle={student.address} icon={<Home color="#0068fd" />} />}

                        {/* Guardian Info */}
                        {student.guardian?.name && (
                            <InfoItem
                                title={`${student.guardian.relation || "Father's"} Name`}
                                subTitle={`${student.guardian.name}${student.guardian.phone ? ` (+91 ${student.guardian.phone})` : ""}`}
                                icon={<User color="#0068fd" />}
                            />
                        )}
                        {student.guardian?.email && (
                            <InfoItem
                                title={`${student.guardian.relation || "Father"} Email`}
                                subTitle={student.guardian.email}
                                icon={<Mail color="#0068fd" />}
                            />
                        )}
                    </div>
                </div>
            </div>
            {/* Enrolled Batches */}
            <Card className="mt-6 pb-6">
                <h2 className="text-2xl font-semibold p-2">Enrolled Batches</h2>
                {student.enrollments && student.enrollments.length > 0 ? (
                    <Table columns={enrollmentColumns} data={student.enrollments} />
                ) : (
                    <NoItems title="Enrolled Batches" />
                )}
            </Card>
        </Container>
    );
};

export default StudentProfile;
