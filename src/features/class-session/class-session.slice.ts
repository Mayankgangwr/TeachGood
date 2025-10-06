import { createSlice } from "@reduxjs/toolkit";
import { deleteClass, getClasses, insertClass, updateClass } from "./class-session.action";
import moment from "moment";
import type { IClassSessionResponse } from "../../types/response.types";


interface IClassSessionState {
    currentClass: IClassSessionResponse | null;
    classes: IClassSessionResponse[];
    total: number;
    learningReport: any[];
    totalHours: number;
    fetched: boolean;
}

const initialState: IClassSessionState = {
    currentClass: null,
    classes: [],
    total: 0,
    learningReport: [],
    totalHours: 0,
    fetched: false,
};

const COLOR_PALETTE = [
    "bg-indigo-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-rose-400",
    "bg-purple-500",
    "bg-pink-400",
    "bg-blue-500",
    "bg-gray-500",
];

const UNKNOWN_SUBJECT = "Unknown";

const classSession = createSlice({
    name: 'classSession',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getClasses.fulfilled, (state, action) => {
            state.fetched = true;
            const classes = action.payload.records || [];
            state.total = action.payload.total || 0;
            state.classes = classes;

            const subjectHoursMap: Record<string, number> = {};

            for (const cls of classes) {
                const subject = cls.subject || UNKNOWN_SUBJECT;
                const start = moment(cls.startTime);
                const end = moment(cls.endTime);
                if (!start.isValid() || !end.isValid()) continue;

                const hours = moment.duration(end.diff(start)).asHours();
                subjectHoursMap[subject] = (subjectHoursMap[subject] || 0) + hours;
            }

            const sortedSubjects = Object.entries(subjectHoursMap)
                .map(([subject, hours]) => ({
                    subject,
                    hours: Number(hours.toFixed(2)),
                }))
                .sort((a, b) => b.hours - a.hours);

            const finalData = sortedSubjects.map((item, index) => ({
                ...item,
                color: COLOR_PALETTE[index] || "bg-gray-400",
            }));

            const totalHours = finalData.reduce((acc, curr) => acc + curr.hours, 0);
            state.learningReport = finalData;
            state.totalHours = totalHours;
        });
        builder.addCase(insertClass.fulfilled, (state, action) => {
            state.classes.push(action.payload);
            state.total = state.total + 1;
        });
        builder.addCase(updateClass.fulfilled, (state, action) => {
            const updated = action.payload;
            const index = state.classes.findIndex(cls => cls._id === updated._id);
            if (index !== -1) state.classes[index] = updated;
        });
        builder.addCase(deleteClass.fulfilled, (state, action) => {
            const classId = action.payload;
            const index = state.classes.findIndex((cls) => cls._id === classId);
            if (index !== -1) {
                state.classes.splice(index, 1);
                state.total = state.total - 1;
            }
        });
    }
});

export default classSession.reducer;
