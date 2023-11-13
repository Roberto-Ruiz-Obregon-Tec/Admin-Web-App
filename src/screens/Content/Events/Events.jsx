import React, { useState, useEffect, useContext } from "react";
import Calendar from "../../../components/Calendar/Calendar";
import { FireError } from '../../../utils/alertHandler';
import LoaderPages from './Loader/LoaderPages';
import { getEvent } from '../../../client/events';
import { ContentContext } from "../Content";
import { OPEN_EVENT } from "../store/modalReducer";
import NavHistory from "../../../components/NavHistory/NavHistory";
import Title from "../../../components/Title/Title";
import Icons from "../../../icons/index";
import Table from "../../../components/Table/Table";

function EventsTable() {

    const { modalDispatch } = useContext(ContentContext);
    const [events, setEvent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const even = await getEvent();
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

    const openInfo = (i) => {
        try {
            if (i < 0 || i >= events.length) return;
            const eventos = events[i];
            modalDispatch({
                type: OPEN_EVENT,
                payload: eventos
            });
        } catch { };
    };
}

function EventsCalendar() {
    return (
        <div>
            <NavHistory>
                Gestión de contenido / Eventos
            </NavHistory>
            <Title>
                {Icons.events()}
                Lista de eventos
            </Title>
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
                        percentages={[30, 10, 10, 10, 40]}
                        clickOnCell={openInfo}
                    />
                </>
            )}
            <Calendar />
        </div>
    );
}

export default EventsCalendar;