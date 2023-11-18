import React, { useState, useEffect } from "react";
import Calendar from "../../../components/Calendar/Calendar";
import { FireError } from '../../../utils/alertHandler';
import LoaderPages from './Loader/LoaderPages';
import { getEvents } from '../../../client/events';
import NavHistory from "../../../components/NavHistory/NavHistory";
import Title from "../../../components/Title/Title";
import Icons from "../../../icons/index";
import Table from "../../../components/Table/Table";
import styles from "./Events.module.css";

function EventsTable() {

    const [events, setEvent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const even = await getEvents();
                setIsLoading(false);
                setEvent(even);
            } catch (error) {
                setIsLoading(false);
                FireError(error.response.data.message);
            }
        })();
    }, []);


    const getFormatedDate = (date) => {
        const dateObject = new Date(date);

        return dateObject.getDate() + "/" + (dateObject.getMonth() + 1) + "/" + dateObject.getFullYear();
    };

    const getMatrix = () => {
        if (events.length === 0) return [];

        const matrix = []

        // El orden impora
        const possibleKeys = [
            "eventName",
            "startDate",
            "location",
            "endDate",
            "description"
        ]

        const needsTransformation = new Set();
        needsTransformation.add("startDate");
        needsTransformation.add("endDate");

        for (let i = 0; i < events.length; i++) {
            const row = [];
            const evento = events[i];

            for (let j = 0; j < possibleKeys.length; j++) {
                const key = possibleKeys[j];
                if (needsTransformation.has(key)) {
                    row.push(evento[key] ? getFormatedDate(evento[key]) : "dd/mm/yyyy");
                } else {
                    row.push(evento[key] !== "" ? evento[key] : "");
                }
            }

            matrix.push(row);
        }
        return matrix;
    };

    return (
        <>
            {isLoading && (
                <LoaderPages />
            )}
            {!isLoading && (
                <>
                    <Table
                        matrixData={getMatrix()}
                        arrayHeaders={[
                            "Nombre evento",
                            "Fecha de inicio",
                            "Localización",
                            "Fecha fin",
                            "Descripción"
                        ]}
                        percentages={[20, 10, 20, 10, 40]}
                    />
                </>
            )}
        </>
    );
}

function EventsCalendar() {
    return (
        <div className={styles.calendar}>
            <Calendar />
        </div>
    );
}

function Events() {
    const [view, setView] = useState("calendar");
    return (
        <div>
            <NavHistory>
                Gestión de contenido / Eventos
            </NavHistory>
            <div className={styles.top}>
                <Title>
                    {Icons.events()}
                    {view === "calendar" ? "Calendario" : "Lista"} de eventos
                </Title>
                <div className={styles.modes}>
                    <button onClick={() => {
                        setView("calendar")
                    }} className={`${view === "calendar" && styles.choosen}`}>Calendario</button>
                    <button onClick={() => {
                        setView("table")
                    }} className={`${view === "table" && styles.choosen}`}>Tabla</button>
                </div>
            </div>
            {view === "calendar" && (
                <EventsCalendar />
            )}
            {view === "table" && (
                <EventsTable />
            )}
        </div>
    )
}

export default Events;