import styles from "./Top.module.css";

import BtnChildren from "../../Form/Button/Button";
import { useContext, useCallback } from "react";
import { CalendarContext } from "../Provider";

import Icons from "../../../icons/index";

const TopCalendar = () => {
    const {
        month,
        year,
        setMonth,
        setYear,
        calendarView,
        setCalendarView,
        setCurrDay,
        currDay
    } = useContext(CalendarContext);

    const getFormatedTitle = (_month, _year) => {
        // Vars undefined
        if (!Number.isFinite(_year) || !Number.isFinite(_month)) {
            return "";
        }

        let date = new Date(_year, _month, 1);
        const month = date.toLocaleString("default", { month: "long" });
        return `${month} ${_year}`;
    };

    const updateStates = useCallback(
        (newDate, _year, _month, _currDay, aux) => {
            // Check month
            if (newDate.getMonth() != new Date(_year, _month, 1).getMonth()) {
                if (setMonth) setMonth(prev => prev + aux);
            }
            // Check year
            if (newDate.getFullYear() != new Date(_year, _month, 1).getFullYear()) {
                if (setYear) setYear(prev => prev + aux);
            }

            // Update state
            if (setCurrDay) setCurrDay(newDate.getDate());
        },
        [setMonth, setCurrDay, setYear]
    );

    const moveDirection = useCallback(
        (direction) => {
            const aux = direction == "left" ? -1 : 1;

            // Month
            const _year = year;
            const _month = month;
            const _currDay = currDay;
            if (
                !Number.isFinite(_year) ||
                !Number.isFinite(_month) ||
                !Number.isFinite(_currDay)
            )
                return;

            if (calendarView == "Month" && setMonth && setYear) {
                if (direction == "left" && _month == 0) {
                    setMonth(11);
                    setYear(prev => prev + aux);
                } else if (direction == "right" && _month == 11) {
                    setMonth(0);
                    setYear(prev => prev + aux);
                } else {
                    setMonth(prev => prev + aux);
                }
            } else if (calendarView == "Week") {
                updateStates(
                    new Date(_year, _month, _currDay + aux * 7),
                    _year,
                    _month,
                    _currDay,
                    aux
                );
            } else if (calendarView == "Day") {
                updateStates(
                    new Date(_year, _month, _currDay + aux),
                    _year,
                    _month,
                    _currDay,
                    aux
                );
            }
        },
        [year, month, currDay, calendarView, setMonth, setYear, updateStates]
    );

    const getToday = () => {
        if (setMonth && setYear && setCurrDay) {
            setMonth(new Date().getMonth());
            setYear(new Date().getFullYear());
            setCurrDay(new Date().getDate());
        }
    };

    return (
        <div className={styles.calendar_container_top}>
            <div className={styles.calendar_container_top_left}>
                <div className={styles.calendar_container_top_left_arrows}>
                    <BtnChildren
                        onClick={() => {
                            moveDirection("left");
                        }}
                        attr="btn-arrow-left-calendar"
                        title="Tabla anterior"
                    >
                        {Icons.chevronLeft()}
                    </BtnChildren>
                    <BtnChildren
                        onClick={() => {
                            moveDirection("right");
                        }}
                        attr="btn-arrow-right-calendar"
                        title="Siguiente tabla"
                    >
                        {Icons.chevronRight()}
                    </BtnChildren>

                </div>
                <BtnChildren
                    onClick={getToday}
                    attr="btn-today-calendar"
                >
                    Hoy
                </BtnChildren>
            </div>
            <div className={styles.calendar_container_top_center}>
                {getFormatedTitle(month, year)}
            </div>
            <div className={styles.calendar_container_top_right}>
                <BtnChildren
                    onClick={() => {
                        if (window.innerWidth < 600) return;
                        if (setCalendarView) setCalendarView("Month");
                        getToday();
                    }}
                    attr={`${calendarView != "Month" ? "btn-month-calendar-disabled" : "btn-month-calendar"}`}
                >
                    Mes
                </BtnChildren>
                <BtnChildren
                    onClick={() => {
                        if (window.innerWidth < 600) return;
                        if (setCalendarView) setCalendarView("Week");
                        getToday();
                    }}
                    attr={`${calendarView != "Week" ? "btn-week-calendar-disabled" : "btn-week-calendar"}`}
                >
                    Semana
                </BtnChildren>
                <BtnChildren
                    onClick={() => {
                        if (window.innerWidth < 600) return;
                        if (setCalendarView) setCalendarView("Day");
                        getToday();
                    }}
                    attr={`${calendarView != "Day" ? "btn-day-calendar-disabled" : "btn-day-calendar"}`}
                >
                    Día
                </BtnChildren>
            </div>
        </div>
    );
};

export default TopCalendar;