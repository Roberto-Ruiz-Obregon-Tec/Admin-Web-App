import React from 'react';
import styles from "./Date.module.css";

function DateSelector(props) {
    const {
        currDate,
        setCurrDate,

        text,
        id
    } = props;

    return (
        <div className={styles.container}>
            <label htmlFor="birthday">{text}</label>
            <input value={currDate} onChange={(e) => {
                setCurrDate(e.target.value);
            }} type="date" id={id} name="fecha"></input>
        </div>
    );
}

export default DateSelector;
