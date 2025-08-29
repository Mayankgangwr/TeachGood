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
                <div className="flex">

                </div>
            ))}
            </div>
        </Container>
    )
};

export default Assignments;