import { useCallback, useContext } from "react";
import { FireError } from '../utils/alertHandler';

import { CalendarContext } from "../components/Calendar/Provider";
import {
    getEvents
} from "../client/events";

export const useDates = () => {
    const {
        month,
        year,
        calendarView,
        currDay,
        setIsCalendarLoading,
        setAllUsersCalendar,
        setAllTagsCalendar
    } = useContext(CalendarContext);


    const fetchTasks = useCallback(
        async (
            time,
            latestTime
        ) => {
            try {
                if (setIsCalendarLoading) setIsCalendarLoading(true);
                const response = await getEvents();
                if (setIsCalendarLoading) setIsCalendarLoading(false);
                return response;
            } catch (error) {
                if (setIsCalendarLoading) setIsCalendarLoading(false);
                console.error(error);
                FireError("Error al traer los eventos");
                return undefined;
            }
        },
        [setAllUsersCalendar, setAllTagsCalendar]
    );

    const getTaskType = (allTasks, fromDate) => {
        let res = [];
        if (!allTasks) return [];
        for (let i = 0; i < allTasks.length; i++) {
            if (
                allTasks[i].startDate <= fromDate &&
                fromDate <= allTasks[i].endDate
            ) {
                res.push(allTasks[i]);
            }
        }

        return res;
    };

    // FETCHING
    const getDaysInMonth = async (
        _month,
        _year,
        needsToFetch = true
    ) => {
        if (!Number.isFinite(_year) || !Number.isFinite(_month)) return [];

        let date = new Date(_year, _month, 1);
        let allTasks = undefined;

        if (needsToFetch) {
            allTasks = await fetchTasks(
                new Date(_year, _month - 2, 1).getTime(),
                new Date(_year, _month + 1, 1).getTime()
            );
        }

        if (!allTasks || !needsToFetch) {
            let days = [];
            while (date.getMonth() === _month) {
                let thisDate = new Date(date);
                days.push({
                    date: thisDate,
                    weekday: thisDate.toLocaleDateString("en-US", { weekday: "long" }),
                    day: parseInt(
                        thisDate.toLocaleDateString("en-US", { day: "numeric" })
                    ),
                    tasks: []
                });
                date.setDate(date.getDate() + 1);
            }
            return days;
        }

        // With data
        let dateData = new Date(_year, _month, 1);
        let daysData = [];
        while (dateData.getMonth() === _month) {
            let thisDate = new Date(dateData);
            daysData.push({
                date: thisDate,
                weekday: thisDate.toLocaleDateString("en-US", { weekday: "long" }),
                day: parseInt(thisDate.toLocaleDateString("en-US", { day: "numeric" })),
                tasks: getTaskType(allTasks, thisDate.getTime())
            });
            dateData.setDate(dateData.getDate() + 1);
        }

        return daysData;
    };

    const getDaysInMonthStatic = (
        _month,
        _year
    ) => {
        if (!Number.isFinite(_year) || !Number.isFinite(_month)) return [];
        let date = new Date(_year, _month, 1);
        let days = [];
        while (date.getMonth() === _month) {
            let thisDate = new Date(date);
            days.push({
                date: thisDate,
                weekday: thisDate.toLocaleDateString("en-US", { weekday: "long" }),
                day: parseInt(thisDate.toLocaleDateString("en-US", { day: "numeric" })),
                tasks: []
            });
            date.setDate(date.getDate() + 1);
        }
        return days;
    };

    const getDaysInWeek = async (
        _month,
        _year,
        _day
    ) => {
        if (
            !Number.isFinite(_year) ||
            !Number.isFinite(_month) ||
            !Number.isFinite(_day)
        )
            return [];

        let date = new Date(_year, _month, _day);
        let dateFetch = new Date(_year, _month, _day - 30);
        let date2 = new Date(_year, _month, _day + 10);
        const allTasks = await fetchTasks(
            dateFetch.getTime(),
            date2.getTime()
        );

        let days = [];

        if (!allTasks) {
            for (let i = -date.getDay(); i <= 6 - date.getDay(); i++) {
                let thisDate = new Date(_year, _month, _day + i);
                days.push({
                    date: thisDate,
                    weekday: thisDate.toLocaleDateString("en-US", { weekday: "long" }),
                    day: parseInt(
                        thisDate.toLocaleDateString("en-US", { day: "numeric" })
                    ),
                    tasks: []
                });
            }

            return [days];
        }

        // With Data
        for (let i = -date.getDay(); i <= 6 - date.getDay(); i++) {
            let thisDate = new Date(_year, _month, _day + i);
            days.push({
                date: thisDate,
                weekday: thisDate.toLocaleDateString("en-US", { weekday: "long" }),
                day: parseInt(thisDate.toLocaleDateString("en-US", { day: "numeric" })),
                tasks: getTaskType(allTasks, thisDate.getTime())
            });
        }

        return [days];
    };

    // ROWS
    const getNumberOfRows = useCallback(() => {
        if (calendarView == "Month") return getNumberOfRowsInMonth();
        return 1;
    }, [calendarView, month, year]);

    const getNumberOfRowsInMonth = useCallback(() => {
        const dates = getDaysInMonthStatic(month, year);
        let numberOfSundays = 0;
        for (let i = 0; i < dates.length; i++) {
            if (dates[i].weekday == "Sunday") {
                numberOfSundays += 1;
            }
        }
        if (dates[0].weekday != "Sunday") {
            numberOfSundays += 1;
        }

        return numberOfSundays;
    }, [month, year]);

    // MATRIX
    const createMatrix = useCallback(async () => {
        if (calendarView == "Month") return await createMatrixMonth();
        if (calendarView == "Week")
            return await getDaysInWeek(month, year, currDay);
        if (calendarView == "Day")
            return await createMatrixDay(month, year, currDay);
        return [];
    }, [calendarView, month, year, currDay]);

    const createMatrixDay = async (
        _month,
        _year,
        _day
    ) => {
        if (
            !Number.isFinite(_year) ||
            !Number.isFinite(_month) ||
            !Number.isFinite(_day)
        )
            return [];

        // Get day
        let thisDate = new Date(_year, _month, _day);

        let date = new Date(_year, _month, _day - 30);
        let date2 = new Date(_year, _month, _day + 3);
        const allTasks = await fetchTasks(
            date.getTime(),
            date2.getTime()
        );

        let days = [];

        if (allTasks) {
            // Data
            days.push({
                date: thisDate,
                weekday: thisDate.toLocaleDateString("en-US", { weekday: "long" }),
                day: parseInt(thisDate.toLocaleDateString("en-US", { day: "numeric" })),
                tasks: getTaskType(allTasks, thisDate.getTime())
            });

            return [days];
        }
        // Static
        days.push({
            date: thisDate,
            weekday: thisDate.toLocaleDateString("en-US", { weekday: "long" }),
            day: parseInt(thisDate.toLocaleDateString("en-US", { day: "numeric" })),
            tasks: []
        });

        return [days];
    };

    const createMatrixMonth = useCallback(async () => {
        let matrix = [];
        const numberOfRows = await getNumberOfRows();
        const dates = await getDaysInMonth(month, year, true);

        const auxMonth = month;
        const auxYear = year;

        if (!Number.isFinite(auxMonth) || !Number.isFinite(auxYear)) {
            return [];
        }

        // Build rows
        // FIRST ROW
        const prevMonth = auxMonth == 0 ? 11 : auxMonth - 1;
        const prevYear = auxMonth == 0 ? auxYear - 1 : auxYear;
        const prevDates = await getDaysInMonth(
            prevMonth,
            prevYear,
            true
        );

        // dates[0].date.getDay() -> is the number of complementary dates it needs
        const complementaryPrevDates = prevDates.slice(
            prevDates.length - dates[0].date.getDay(),
            prevDates.length
        );

        // I need 7 - complementaryDates.length more dates to add up to 7 in a week
        matrix.push([
            ...complementaryPrevDates,
            ...dates.slice(0, 7 - complementaryPrevDates.length)
        ]);

        let index = 7 - complementaryPrevDates.length;

        // Substract 2, so first and last row not count in loop
        for (let i = 0; i < numberOfRows - 2; i++) {
            matrix.push([...dates.slice(index, index + 7)]);
            index += 7;
        }

        // LAST ROW
        const nextMonth = auxMonth == 11 ? 0 : auxMonth + 1;
        const nextYear = auxMonth == 11 ? auxYear + 1 : auxYear;
        const nextDates = await getDaysInMonth(
            nextMonth,
            nextYear,
            true
        );

        // 6 - dates[dates.length - 1].date.getDay() -> is the number of complementary dates it needs
        const complementaryNextDates = nextDates.slice(
            0,
            6 - dates[dates.length - 1].date.getDay()
        );

        matrix.push([
            ...dates.slice(index, dates.length),
            ...complementaryNextDates
        ]);

        return matrix;
    }, [month, year, getNumberOfRows]);

    // Return utils
    return {
        getNumberOfRows,
        createMatrix
    };
};