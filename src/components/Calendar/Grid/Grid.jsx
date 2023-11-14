import styles from "./Grid.module.css";
import { useContext, Fragment, useState, useEffect, useCallback } from "react";

import { CalendarContext } from "../Provider";
import RowElement, { RowHeader } from "./Row/Row";

// Hooks
import { useDates } from "../../../hooks/useDates";

const matrixStarter = {
    date: new Date(),
    weekday: "",
    day: 0,
    tasks: undefined,
    isOnHover: false,
    isResizing: false,
    dontShow: true
};

const Grid = () => {
    // Context
    const {
        month,
        year,
        calendarStretchRow,
        setCalendarStretchRow,
        calendarView,
        refetchTasks
    } = useContext(CalendarContext);
    const [matrixDates, setMatrixDates] = useState([
        Array(7).fill(matrixStarter),
        Array(7).fill(matrixStarter),
        Array(7).fill(matrixStarter),
        Array(7).fill(matrixStarter),
        Array(7).fill(matrixStarter),
        Array(7).fill(matrixStarter)
    ]);

    // Hook
    const { createMatrix, getNumberOfRows } = useDates();

    const generateMatrix = useCallback(async () => {
        const matrix = await createMatrix();

        setMatrixDates(matrix);
    }, [createMatrix, setMatrixDates]);

    useEffect(() => {
        generateMatrix();
    }, [
        setMatrixDates,
        month,
        year,
        createMatrix,
        generateMatrix,
        refetchTasks
    ]);

    useEffect(() => {
        // To fix bug when changing from "day" or "week" to "month view"
        // The row was shrinked to the prev view
        if (calendarView == "Month" && matrixDates.length < 3) {
            setMatrixDates([
                Array(7).fill(matrixStarter),
                Array(7).fill(matrixStarter),
                Array(7).fill(matrixStarter),
                Array(7).fill(matrixStarter),
                Array(7).fill(matrixStarter),
                Array(7).fill(matrixStarter)
            ]);
        }
    }, [calendarView, matrixDates.length]);

    return (
        <div
            style={{
                gridTemplateRows: `30px repeat(${getNumberOfRows()}, ${calendarView == "Month" ? calendarStretchRow : "1fr"
                    })`
            }}
            className={styles.grid}
        >
            <RowHeader
                click={() => {
                    if (setCalendarStretchRow)
                        setCalendarStretchRow(prev => (prev == "20vh" ? "1fr" : "20vh"));
                }}
                calendarStretchRow={calendarStretchRow}
                daysOfWeek={["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]}
            />
            {[...Array(getNumberOfRows())].map((_, index) => {
                return (
                    <Fragment key={index}>
                        <RowElement
                            matrixDates={matrixDates}
                            setMatrixDates={setMatrixDates}
                            datesRow={matrixDates[index]}
                        />
                    </Fragment>
                );
            })}
        </div>
    );
};
export default Grid;