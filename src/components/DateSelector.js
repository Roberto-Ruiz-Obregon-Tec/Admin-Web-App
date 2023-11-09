import React from 'react';
import '../styles/wrappers/wrap.css';

function DateSelector(props) {
    const {
        currDate,
        setCurrDate,

        text,
        id
    } = props;

    return (
        <div style={{
            width: "100%",
            textAlign: "center"
        }}>
            <label style={{
                width: "100%"
            }} for="birthday">{text}</label>
            <input value={currDate} onChange={(e) => {
                setCurrDate(e.target.value);
            }} type="date" id={id} name="fecha"></input>
        </div>
    );
}

export default DateSelector;
