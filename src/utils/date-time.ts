import moment from "moment";

export const formatteDate = (date: any) => {
    if (!date) return "";
    return moment(date).format("dddd, D MMMM YYYY");
};

export const formatedDate = (date: any) => {
    if (!date) return "";
    return moment(date).format("DD MMM YYYY");
};

export const formatTimeRange = (start: string, end: string) =>
    `${moment(start).format("hh:mm A")} - ${moment(end).format("hh:mm A")}`;

