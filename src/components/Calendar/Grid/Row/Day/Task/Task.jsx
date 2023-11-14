import { useContext } from "react";
import styles from "./Task.module.css";
import { stringToColour, invertColor } from "../../../../../../utils/invertColors";
import { CalendarContext } from "../../../../Provider";


const Task = ({
    task,
    day
}) => {
    const { isCalendarLoading } = useContext(CalendarContext);

    const openTask = () => {
        
    };

    const isTerminalLeft = () => {
        const dateOfMonthCurr = new Date(day.date).getDate();
        const monthCurr = new Date(day.date).getMonth();
        const yearCurr = new Date(day.date).getFullYear();

        const dateOfMonthEvent = new Date(task.startDate).getDate() + 1;
        const monthEvent = new Date(task.startDate).getMonth();
        const yearEvent = new Date(task.startDate).getFullYear();

        return (
            dateOfMonthCurr === dateOfMonthEvent &&
            monthCurr === monthEvent &&
            yearCurr === yearEvent
        );
    };

    const isTerminalRight = () => {
        const dateOfMonthCurr = new Date(day.date).getDate();
        const monthCurr = new Date(day.date).getMonth();
        const yearCurr = new Date(day.date).getFullYear();

        const dateOfMonthEvent = new Date(task.endDate).getDate();
        const monthEvent = new Date(task.endDate).getMonth();
        const yearEvent = new Date(task.endDate).getFullYear();

        return (
            dateOfMonthCurr === dateOfMonthEvent &&
            monthCurr === monthEvent &&
            yearCurr === yearEvent
        );
    };

    return (
        <div className={`${styles.task_all} ${isCalendarLoading && styles.hidden}`}>
            <div
                onClick={openTask}
                className={`${styles.task} ${isTerminalLeft() && styles.terminal_left} ${isTerminalRight() && styles.terminal_right}`}
                title="Abrir evento"
                style={{
                    backgroundColor: stringToColour(task._id)
                }}
            >
                {isTerminalLeft() && (
                    <div style={{
                        color: invertColor(stringToColour(task._id), true)
                    }} className={styles.text}>
                        {task.eventName}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Task;