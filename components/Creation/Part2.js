import { useState } from "react";
import DatePicker from "react-datepicker";

const Part2 = (props) => {

    const [calendarDate, setCalendarDate] = useState(new Date())

    const handleNextButton = {
        opacity: props.form.contractEnds && props.form.rent ? "1" : "0.5",
        pointerEvents: props.form.contractEnds && props.form.rent ? "inherit" : "none",
    }

    const handleCalendar = (e) => {
        setCalendarDate(e)
        props.handleContractEnds(Math.floor(e / 1000))
    }


    return (
        <>
            <h4 onClick={() => props.setPart(1)}>
                {'< Back to Property'}
            </h4>

            <div style={{ height: "16px" }} />

            <h2>Contract</h2>


            <div>End of contract</div>
            <DatePicker
                id="date_picker"
                selected={calendarDate}
                onChange={(e) => handleCalendar(e) }
                startOpen={true}
                shouldCloseOnSelect
                fixedHeight
                autofocus
                open
            />


            <div style={{ height: "320px" }} />


            <div>Rent Calculated Weekly</div>
            <div className="rent-input">
                <div style={{ fontSize: "32px", margin: "24px 8px 0px 0px" }}>$</div>
                <input
                    className="rent-field"
                    value={props.form.rent}
                    placeholder='0'
                    control='input'
                    name='rent'
                    type='number'
                    onChange={props.handleRent}
                    style={{ width: "100%", fontSize: "32px", height: "80px", border: "none" }}
                />
                <div style={{ fontSize: "32px", margin: "24px 0px 0px 8px" }}>AUD</div>
            </div>






            <div style={{ height: "40px" }} />

            <div
                className="button primary"
                onClick={() => props.setPart(3)}
                style={handleNextButton}
            >
                Next
            </div>

        </>
    )
}

export default Part2;