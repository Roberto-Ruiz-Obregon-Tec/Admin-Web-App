import styles from "./Day.module.css";
import {
    useContext,
    useCallback,
    Fragment
} from "react";

import { CalendarContext } from "../../../Provider";

import Task from "./Task/Task";

// Icons
import Icons from "../../../../../icons";

const Day = ({ day, isToday, matrixDates, setMatrixDates }) => {
    const {
        currDay,
        month,
        year,
        calendarView,
        isCalendarLoading,
        isResizing,
        setToTaskResizing,
        setFromTaskResizing,
        isResizingFromRight,
        setDayClick
    } = useContext(CalendarContext);

    const isAnotherMonth = useCallback(
        (day) => {
            const _year = year;
            const _month = month;
            const _currDay = currDay;
            if (
                !Number.isFinite(_year) ||
                !Number.isFinite(_month) ||
                !Number.isFinite(_currDay)
            )
                return false;

            const thisDate = new Date(day);
            const currDate = new Date(_year, _month, currDay);

            return thisDate.getMonth() != currDate.getMonth();
        },
        [currDay, month, year]
    );

    const createTask = () => {
        alert("crear")
    };

    const createReplicas = (
        matrixWithState,
        coordenatesToEdit
    ) => {
        let finalReplicaMatrix = [];
        for (let i = 0; i < coordenatesToEdit.length; i++) {
            const c = coordenatesToEdit[i];
            let row = matrixWithState[c[0]];
            let singleDate = row[c[1]];
            if (!singleDate.tasks) continue;

            const refTask = singleDate.tasks[c[2]];
            const fromAux = refTask.taskRef.fromDate;
            const toAux = refTask.taskRef.toDate;

            const fromSwap = Math.min(fromAux, toAux);
            const toSwap = Math.max(fromAux, toAux);

            const fromRefTask = parseInt(fromSwap);
            const toRefTask = parseInt(toSwap);

            // First clear all tasks related to refTask
            let replicaMatrix = [];
            for (let j = 0; j < matrixWithState.length; j++) {
                let newRowForReplica = [];

                for (let k = 0; k < matrixWithState[j].length; k++) {
                    // We are on a specific day
                    const currDayMatrix = matrixWithState[j][k];
                    const currArrayTasksDayMatrix =
                        currDayMatrix.tasks;
                    let newArrayTasksDayMatrix = [];

                    if (!currArrayTasksDayMatrix) {
                        // Obviously we don't need to delete anything here
                        newArrayTasksDayMatrix = [];
                    } else {
                        // We need to delete that task
                        newArrayTasksDayMatrix = checkIfAlreadyTaskInDayAndDelete(
                            currArrayTasksDayMatrix,
                            refTask
                        );
                    }

                    newRowForReplica.push({
                        ...currDayMatrix,
                        tasks: newArrayTasksDayMatrix
                    });
                }

                replicaMatrix.push(newRowForReplica);
            }

            // Then create replicas of refTask
            for (let j = 0; j < replicaMatrix.length; j++) {
                let newRowForReplica = [];

                for (let k = 0; k < replicaMatrix[j].length; k++) {
                    // We are on a specific day
                    const currDayMatrix = replicaMatrix[j][k];
                    const timeCurrDayMatrix = currDayMatrix.date.getTime();
                    let newArrayTasksReplicaDayMatrix = [];

                    // This should be empty of ref task
                    if (currDayMatrix.tasks) {
                        newArrayTasksReplicaDayMatrix = [
                            ...newArrayTasksReplicaDayMatrix,
                            ...currDayMatrix.tasks
                        ];
                    }

                    if (
                        fromRefTask <= timeCurrDayMatrix &&
                        timeCurrDayMatrix <= toRefTask
                    ) {
                        // This date needs to be in between in order to create replica
                        newArrayTasksReplicaDayMatrix = [
                            ...newArrayTasksReplicaDayMatrix,
                            refTask
                        ];
                    }

                    newRowForReplica.push({
                        ...currDayMatrix,
                        tasks: newArrayTasksReplicaDayMatrix
                    });
                }

                finalReplicaMatrix.push(newRowForReplica);
            }
        }
        // finalReplicaMatrix should be ready
        setMatrixDates(finalReplicaMatrix);
    };

    const onHoverEditToDateTask = useCallback(() => {
        if (!matrixDates) return;
        if (!isResizing) return;
        let newMatrix = [];
        let coordenatesToEdit = [];
        let coordenatesToEditArrayIds = [];

        for (let i = 0; i < matrixDates.length; i++) {
            const rowElement = matrixDates[i];
            let newMatrixRow = [];

            for (let j = 0; j < rowElement.length; j++) {
                let element = rowElement[j];

                if (element.tasks) {
                    // Ours, so we need to go deeper
                    let newArrayTasks = [];

                    for (let k = 0; k < element.tasks.length; k++) {
                        const taskRefLoop = element.tasks[k];

                        if (taskRefLoop.isResizing) {
                            // Task that is resizing
                            if (isResizingFromRight) {
                                // To
                                newArrayTasks.push({
                                    ...element.tasks[k],
                                    taskRef: {
                                        ...element.tasks[k].taskRef,
                                        toDate: day.date.getTime(),
                                        singleDate:
                                            day.date.getTime() == element.tasks[k].taskRef.fromDate
                                    }
                                });

                                if (setToTaskResizing) setToTaskResizing(day.date.getTime());
                            } else {
                                // From
                                newArrayTasks.push({
                                    ...element.tasks[k],
                                    taskRef: {
                                        ...element.tasks[k].taskRef,
                                        fromDate: day.date.getTime(),
                                        singleDate:
                                            day.date.getTime() == element.tasks[k].taskRef.fromDate
                                    }
                                });

                                if (setFromTaskResizing)
                                    setFromTaskResizing(day.date.getTime());
                            }

                            if (
                                !coordenatesToEditArrayIds.includes(element.tasks[k].taskRef.id)
                            ) {
                                // Multiple task
                                // Then add to coordenates
                                coordenatesToEdit.push([i, j, k]);
                                coordenatesToEditArrayIds.push(element.tasks[k].taskRef.id);
                            }
                        } else {
                            newArrayTasks.push(taskRefLoop);
                        }
                    }

                    // We need to create replicas from resizing -> toDate
                    newMatrixRow.push({
                        date: rowElement[j].date,
                        weekday: rowElement[j].weekday,
                        day: rowElement[j].day,
                        dontShow: rowElement[j].dontShow,
                        tasks: newArrayTasks
                    });
                } else {
                    newMatrixRow.push(element);
                }
            }
            newMatrix.push(newMatrixRow);
        }

        createReplicas(newMatrix, coordenatesToEdit);
    }, [
        matrixDates,
        isResizing,
        setToTaskResizing,
        setFromTaskResizing,
        isResizingFromRight,
        createReplicas,
        day.date
    ]);

    const checkIfAlreadyTaskInDayAndDelete = (
        includesArr,
        task
    ) => {
        let newArray = [];

        for (let i = 0; i < includesArr.length; i++) {
            if (includesArr[i].taskRef.id != task.taskRef.id) {
                newArray.push(includesArr[i]);
            }
        }

        return newArray;
    };

    return (
        <div
            className={`${styles.day} ${isToday && styles.day_today} ${isAnotherMonth(
                day.date
            ) && styles.day_anotherMonth} ${calendarView == "Day" &&
            styles.day_day} ${(isCalendarLoading || day.dontShow) &&
            styles.loader}`}
            onMouseEnter={onHoverEditToDateTask}
        >
            {!day.dontShow && (
                <>
                    <div className={styles.day_number}>{day.day}</div>
                    <div className={styles.day_plus} onClick={createTask}>
                        {Icons.cross()}
                    </div>
                    <div className={styles.tasks}>
                        {day.tasks &&
                            day.tasks.length > 0 &&
                            day.tasks.map((task, index) => {
                                return (
                                    <Fragment key={index}>
                                        <Task
                                            matrixDates={matrixDates}
                                            setMatrixDates={setMatrixDates}
                                            task={task}
                                            day={day}
                                        />
                                    </Fragment>
                                );
                            })}
                    </div>
                </>
            )}
        </div>
    );
};

export default Day;