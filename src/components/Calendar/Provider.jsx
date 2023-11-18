import {
    createContext,
    useState,
    useEffect
} from "react";

export const CalendarContext = createContext({});

const Calendar = ({ children }) => {
    // State
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [currDay, setCurrDay] = useState(new Date().getDate());

    const [calendarStretchRow, setCalendarStretchRow] = useState("1fr");

    const [calendarView, setCalendarView] = useState("Month");
    const [isCalendarLoading, setIsCalendarLoading] = useState(false);

    const [isResizing, setIsResizing] = useState(false);
    const [taskIdResizing, setTaskIdResizing] = useState(0);
    const [fromTaskResizing, setFromTaskResizing] = useState(0);
    const [toTaskResizing, setToTaskResizing] = useState(0);
    const [isResizingFromRight, setIsResizingFromRight] = useState(true);

    // Tasks modal state
    const [idTask, setIdTask] = useState(0);
    const [isSingleDateTask, setIsSingleDateTask] = useState(false);
    const [fromTask, setFromTask] = useState(0);
    const [toTask, setToTask] = useState(0);
    const [nameTask, setNameTask] = useState("");
    const [descriptionTask, setDescriptionTask] = useState("");
    const [usersTask, setUsersTask] = useState([]);
    const [tagsTask, setTagsTask] = useState([]);
    const [isLoadingTask, setIsLoadingTask] = useState(false);
    const [isTaskModalOnEditing, setIsTaskModalOnEditing] = useState(
        false
    );

    const [allUsersCalendar, setAllUsersCalendar] = useState([]);
    const [allTagsCalendar, setAllTagsCalendar] = useState([]);

    // Create tasks
    const [dayClick, setDayClick] = useState(undefined);
    const [refetchTasks, setRefetchTasks] = useState(false);

    useEffect(() => {
        changeCalendarForPhone();
        window.addEventListener("resize", changeCalendarForPhone);

        return () => {
            window.removeEventListener("resize", changeCalendarForPhone);
        };
    }, []);

    const changeCalendarForPhone = () => {
        if (window.innerWidth < 600) {
            setCalendarView("Day");
        }
    };

    return (
        <CalendarContext.Provider
            value={{
                month,
                year,
                calendarStretchRow,
                calendarView,
                currDay,
                isCalendarLoading,
                isResizing,
                taskIdResizing,
                fromTaskResizing,
                toTaskResizing,
                isResizingFromRight,
                idTask,
                isSingleDateTask,
                fromTask,
                toTask,
                nameTask,
                descriptionTask,
                usersTask,
                tagsTask,
                isLoadingTask,
                isTaskModalOnEditing,
                allUsersCalendar,
                allTagsCalendar,
                dayClick,
                refetchTasks,

                setMonth,
                setYear,
                setCalendarStretchRow,
                setCalendarView,
                setCurrDay,
                setIsCalendarLoading,
                setIsResizing,
                setTaskIdResizing,
                setFromTaskResizing,
                setToTaskResizing,
                setIsResizingFromRight,
                setIdTask,
                setIsSingleDateTask,
                setFromTask,
                setToTask,
                setNameTask,
                setDescriptionTask,
                setUsersTask,
                setTagsTask,
                setIsLoadingTask,
                setIsTaskModalOnEditing,
                setAllUsersCalendar,
                setAllTagsCalendar,
                setDayClick,
                setRefetchTasks
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
};
export default Calendar;