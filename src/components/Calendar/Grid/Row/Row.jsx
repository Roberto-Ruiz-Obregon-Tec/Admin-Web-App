import styles from "./Row.module.css";
import DayComponent from "./Day/Day";
import { Fragment, useContext } from "react";
import { CalendarContext } from "../../Provider";

import Icons from "../../../../icons/index";


export const RowHeader = ({
    daysOfWeek,
    click,
    calendarStretchRow
}) => {
    const { calendarView, currDay, year, month } = useContext(CalendarContext);

    return (
        <>
            {calendarView == "Day" && currDay && year && month && (
                <div className={styles.row_header}>
                    <div
                        className={`${styles.row_header_div} ${styles.row_header_div_all}`}
                    >
                        {daysOfWeek[new Date(year, month, currDay).getDay()]}
                    </div>
                </div>
            )}
            {calendarView != "Day" && (
                <div className={styles.row_header}>
                    {calendarView == "Month" && (
                        <div
                            onClick={click}
                            title={`${calendarStretchRow == "20vh" ? "Shrink rows" : "Expand rows"
                                }`}
                            className={`${styles.row_header_svg} ${calendarStretchRow ==
                                "20vh" && styles.row_header_svg_rotate}`}
                        >
                            {Icons.chevronDown()}
                        </div>
                    )}

                    {daysOfWeek &&
                        daysOfWeek.map((date, index) => {
                            return (
                                <div className={styles.row_header_div} key={index}>
                                    {date}
                                </div>
                            );
                        })}
                </div>
            )}
        </>
    );
};

const matrixStarter = {
    date: new Date(),
    weekday: "",
    day: 0,
    tasks: undefined,
    isOnHover: false,
    isResizing: false,
    dontShow: true
};

const Row = ({ datesRow, matrixDates, setMatrixDates }) => {
    const getToday = (date) => {
        const today = new Date();

        return (
            today.getFullYear() === date.getFullYear() &&
            today.getMonth() === date.getMonth() &&
            today.getDate() === date.getDate()
        );
    };

    return (
        <div className={styles.row}>
            {datesRow &&
                datesRow.map((date, index) => {
                    return (
                        <Fragment key={index}>
                            <DayComponent
                                matrixDates={matrixDates}
                                setMatrixDates={setMatrixDates}
                                isToday={getToday(date.date)}
                                day={date}
                            />
                        </Fragment>
                    );
                })}
            {!datesRow &&
                Array(7)
                    .fill(matrixStarter)
                    .map((date, index) => {
                        return (
                            <Fragment key={index}>
                                <DayComponent
                                    matrixDates={matrixDates}
                                    setMatrixDates={setMatrixDates}
                                    isToday={getToday(date.date)}
                                    day={date}
                                />
                            </Fragment>
                        );
                    })}
        </div>
    );
};

export default Row;