import React, { useState } from "react";
import { useAppSelector } from "../../../hooks/redux.hook";
import { Link } from "react-router-dom";
import type { IModelOpen } from "../../../types/comman.types";
import { NoItems, SingleClassCard, ClassForm } from "../../../components";

const LiveClasses: React.FC = () => {
    const { classes } = useAppSelector((state) => ({
        classes: state.classSession.classes,
    }));

    const [formOpen, setFormOpen] = useState<IModelOpen>({
        isOpen: false,
        id: "",
    });

    const now = new Date();

    // Filter strictly upcoming classes (future start time only)
    const LiveClasses = classes
        .filter((cls) => new Date(cls.startTime) <= now && new Date(cls.endTime) >=now)
        .sort(
            (a, b) =>
                new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        )
        .slice(0, 4);

    const handleEditClass = (classId: string) => {
        setFormOpen({ isOpen: true, id:classId });
    };

    return (
        <div className="w-full rounded-2xl bg-white shadow-sm border border-gray-100 p-2 md:p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-800">Live Classes</h3>
                <Link to="/classes" className="text-xs text-indigo-600 hover:underline">
                    View All
                </Link>
            </div>

            {/* Class List */}
            <div className="space-y-3">
                {LiveClasses.length > 0 ? (
                    LiveClasses.map((cls) => (
                        <SingleClassCard
                            key={cls._id}
                            cls={cls}
                            variant="primary"
                            category="IsLive"
                            handleEditClass={handleEditClass}
                        />
                    ))
                ) : (
                    <NoItems title="upcoming class" />
                )}
            </div>

            {/* Form Modal */}
            <ClassForm
                formOpen={formOpen}
                handleToggleForm={(toggle: boolean) =>
                    setFormOpen({ isOpen: toggle, id: "" })
                }
            />
        </div>
    );
};

export default LiveClasses;
