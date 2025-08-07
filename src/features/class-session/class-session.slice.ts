import { createSlice } from "@reduxjs/toolkit";
import { getClasses } from "./class-session.action";
import moment from "moment";

interface IClassSessionState {
    currentClass: any;
    classes: any[];
    learningReport: any[];
    totalHours: number;
    fetched: boolean;
}

const initialState: IClassSessionState = {
    currentClass: null,
    classes: [],
    learningReport: [],
    totalHours: 0,
    fetched: false
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
            const classes = action.payload || [];
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
    }
});

export default classSession.reducer;
