import { CalendarDays, Clock, Video } from "lucide-react";
import Button, { type Variant } from "../Button";
import { formatteDate, formatTimeRange } from "../../utils/date-time";
import type { IClassSessionResponse } from "../../types/response.types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { UserRoles, type Role } from "../../constants";
import ConfirmationDialog from "../Dialog/ConfirmationDialog";
import { useState } from "react";
import type { IModelOpen } from "../../types/comman.types";
import { deleteClass } from "../../features/class-session/class-session.action";
import CardHeader from "../Card/Header";
import { type ActionMenuItem } from "../../types/comman.types"
import Card from "../Card";


interface ISingleCardProps {
    cls: IClassSessionResponse;
    variant: Variant;
    category: "IsLive" | "Upcoming" | "Completed";
    handleEditClass: (classId: string) => void;
}

const SingleClassCard: React.FC<ISingleCardProps> = ({
    cls,
    variant,
    category,
    handleEditClass,
}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const [confimeModel, setConfimeModel] = useState<IModelOpen>({
        isOpen: false,
        id: ""
    });

    const handleClose = () => {
        setConfimeModel(() => ({ isOpen: false, id: "" }));
    }

    const handleDelete = (classId: string) => {
        dispatch(deleteClass(classId)).then(() => handleClose);
    }

    const menuItems: ActionMenuItem[] =
        (user?.role && [UserRoles.Admin, UserRoles.Teacher].includes(user.role as any))
            ? [
                {
                    title: "Edit",
                    onClick: () => handleEditClass(cls._id),
                },
                {
                    title: "Delete",
                    onClick: () => setConfimeModel(() => ({
                        isOpen: true,
                        id: cls._id
                    })),
                }
            ]
            : [];

    return (
        <Card>
            {/* Header */}
            <CardHeader
                heading={<h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">{cls.title}</h3>}
                description={
                    <div className="flex items-center gap-0.5">
                        <span className="text-sm text-gray-700">{cls.batch.name}</span>
                    </div>
                }
                actions={menuItems}
            />
            {/* Content */}
            <div className="px-3 py-2 bg-gray-50 flex justify-between items-center">
                <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1 text-xs text-gray-500 flex-wrap">
                        <span className="flex items-center gap-1">
                            <CalendarDays size={14} /> {formatteDate(cls.startTime)}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock size={14} /> {formatTimeRange(cls.startTime, cls.endTime)}:
                            <span className="text-sm text-gray-700">by {cls.teacher?.name}</span>
                        </span>
                    </div>
                </div>
                <Button
                    variant={variant}
                    size="sm"
                    onClick={() =>
                        category !== "Completed" && window.open(cls.streamLink, "_blank")
                    }
                >
                    <Video className="mr-1" />
                    {category}
                </Button>
            </div>

            <ConfirmationDialog
                open={confimeModel.isOpen}
                onClose={handleClose}
                onConfirm={() => handleDelete(confimeModel.id)}
                title="Confirm Delete"
                description="Are you sure you want to delete this class?"
                confirmLabel="Delete"
                cancelLabel="Cancel"
                loadingText="Delete..."
            />
        </Card>
    );
};

export default SingleClassCard;
