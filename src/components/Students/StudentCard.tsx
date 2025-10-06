import React from "react";
import Card from "../Card";
import type { IStudentResponse } from "../../types/response.types";
import Persona from "../Persona";
import clsx from "clsx";
import Styles from "./Student.module.scss";
import IconButton from "../Button/IconButton";
import { BookOpen, Calendar, DollarSign, Hash, Mail, Pencil, Home, User } from "lucide-react";
import type { IModelOpen, ModelType } from "../../types/comman.types";
import { formatedDate } from "../../utils/date-time";
import { LinkBtn } from "../Button";
import { Link } from "react-router-dom";

interface IStudentCardProps {
    student: IStudentResponse;
    handleToggleForm: (studentId?: string, type?: ModelType) => void;
    handleListToggle: (toggleData: IModelOpen) => void;
}

interface InfoItemProps {
    title: string;
    subTitle?: React.ReactNode;
    icon?: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ title, subTitle, icon }) => {
    return (
        <div className="flex items-center gap-2 px-2 py-1.5">
            {icon && (
                <div className="flex items-center justify-center w-8 h-8 rounded bg-indigo-100">
                    {icon}
                </div>
            )}
            <div className="flex flex-col items-start gap-0">
                <span className="text-sm font-semibold text-[#464646]">{title}</span>
                {subTitle && (
                    <span className="text-xs font-semibold text-[#808080]">{subTitle}</span>
                )}
            </div>
        </div>
    )
}

const StudentCard: React.FC<IStudentCardProps> = React.memo(({ student, handleToggleForm, handleListToggle }) => {
    const { _id: id, name, email, phone, avatar, enrollments, guardian, dateOfAdmission, dateOfBirth, address } = student;
    const enrollment = enrollments[0];

    return (
        <Card>
            {/* Student Profile Header */}
            <div className={clsx(Styles.bgColor, "flex items-start px-2 pt-2 pb-1 justify-between border-b")}>
                <Persona status="online" avatarUrl={avatar} />
                <div className={clsx(Styles.Intro, "flex flex-col items-start gap-0")}>
                    <Link to={`${id}`}><span className="text-base font-extrabold text-gray-50">{name}</span></Link>
                    <span className="text-xs font-normal text-gray-100">{`+91 ${phone} | ${formatedDate(dateOfAdmission)}`}</span>
                    <span className="text-xs font-normal text-gray-100">{email}</span>
                </div>
                {handleToggleForm && (
                    <IconButton
                        variant="secondary"
                        className="mt-1 bg-indigo-200"
                        icon={<Pencil color="#0068fd" size={12} />}
                        onClick={() => handleToggleForm(id, "EDIT")}
                    />
                )}

            </div>
            {enrollment && (
                <div className={clsx(Styles.AccadmincInfo, "relative flex flex-col items-start bg-gray-100 px-1.5")}>
                    <InfoItem title={"Active Course"} subTitle={enrollment.batch.name} icon={<BookOpen color="#0068fd" />} />
                    <div className="flex justify-between items-center w-full">
                        <InfoItem title={"Fees"} subTitle={enrollment.fee.amount} icon={<DollarSign color="#0068fd" />} />
                        <InfoItem title={"Enroll Id"} subTitle={`#${enrollment._id}`} icon={<Hash color="#0068fd" />} />
                    </div>
                    <div className="absolute right-2 top-1">
                        <LinkBtn onClick={() => handleListToggle({ id, isOpen: true })} children={`See All Courses`} size={"sm"} />
                    </div>
                </div>
            )}
            <div className={clsx(Styles.PersonalInfo)}>
                <div className={clsx(Styles.Header, "flex items-center px-1.5 bg-gray-100 py-2 justify-between ")}>
                    <span className="text-base font-extrabold text-gray-900">{`Student Personal Information`}</span>
                </div>
                <div className={clsx(Styles.AccadmincInfo, "flex flex-col items-start bg-gray-100  pb-1 px-1.5")}>
                    {address && (
                        <InfoItem
                            key="address"
                            title="Address"
                            subTitle={address}
                            icon={<Home color="#0068fd" />}
                        />
                    )}
                    {guardian?.name && (
                        <InfoItem
                            key="guardian-name"
                            title={`${guardian.relation || 'Father'} Name`}
                            subTitle={`${guardian.name} ${guardian.phone && `(+91 ${guardian.phone})`}`}
                            icon={<User color="#0068fd" />}
                        />
                    )}
                    <div className="flex justify-between items-center w-full">
                        {guardian?.email && (
                            <InfoItem
                                key="guardian-email"
                                title={`${guardian.relation || 'Father'}'s Email`}
                                subTitle={guardian.email}
                                icon={<Mail color="#0068fd" />}
                            />
                        )}
                        {dateOfBirth && (
                            <InfoItem
                                key="date-of-birth"
                                title="DOB"
                                subTitle={formatedDate(dateOfBirth)}
                                icon={<Calendar color="#0068fd" />}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );

});

export default StudentCard;