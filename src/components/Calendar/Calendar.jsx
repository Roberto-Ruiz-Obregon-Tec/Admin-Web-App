import styles from "./Calendar.module.css";

// Components
import TopCalendar from "./Top/Top";
// import GridCalendar from "./Grid/Grid";

const Calendar = () => {

    return (
        <div className={styles.calendar}>
            <h1>Calendario eventos</h1>
            <div className={styles.calendar_container}>
                <TopCalendar />
                {/* <GridCalendar /> */}
            </div>
        </div>
    );
};
export default Calendar;