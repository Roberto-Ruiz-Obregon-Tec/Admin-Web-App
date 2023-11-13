import styles from "./Calendar.module.css";

// Components
import TopCalendar from "./Top/Top";
import Provider from "./Provider";
// import GridCalendar from "./Grid/Grid";

const Calendar = () => {

    return (
        <Provider>
            <div className={styles.calendar}>
                <div className={styles.calendar_container}>
                    <TopCalendar />
                    {/* <GridCalendar /> */}
                </div>
            </div>
        </Provider>
    );
};
export default Calendar;