import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { AssignmentCard, Container } from "../../components";
import { getAssignments } from "../../features/assignment/assignment.action";

const Assignments = () => {
    const dispatch = useAppDispatch();
    const { assignments } = useAppSelector((state) => ({
        assignments: state.assignment.assignments,
    }));

    useEffect(() => {
        dispatch(getAssignments())
    }, [dispatch])


    return (
        <Container>
            <div className=" grid grid-cols-4">
                {assignments.map((assignment) => (
                    <div className="w-full rounded-2xl bg-white shadow-sm border border-gray-100 p-2 md:p-4">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-semibold text-gray-800">{assignment.title}</h3>
                            <button className="text-xs text-indigo-600 hover:underline">View All</button>
                        </div>

                        {/* Class List */}
                        <div className="space-y-3">
                            
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    )
};

export default Assignments;