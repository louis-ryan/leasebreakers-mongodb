import { useState } from "react";
import InputHeader from "./InputHeader";
import DatePicker from "react-datepicker";

const Part2 = (props) => {

    const [calendarDate, setCalendarDate] = useState(new Date())

    const handleNextButton = {
        opacity: props.form.contractEnds && props.form.rent ? "1" : "0.5",
        pointerEvents: props.form.contractEnds && props.form.rent ? "inherit" : "none",
    }

    const handleCalendar = (e) => {
        setCalendarDate(e)
        props.handleContractEnds(e)
    }


    return (
        <>
            <h4 onClick={() => props.setPart(1)}>
                {'< Back to Property'}
            </h4>

            <div style={{ height: "16px" }} />

            <InputHeader header={'Part 3: Contract'} />

            <div>End of current contract</div>
            <DatePicker
                id="date_picker"
                selected={calendarDate}
                value={calendarDate}
                onChange={(e) => handleCalendar(e)}
            />

            <div style={{ height: "24px" }} />

            <div style={{ display: "flex" }}>
                <div
                    onClick={() => props.handleContractTerminates(props.form.contractTerminates ? false : true)}
                    style={{ height: "40px", width: "64px", minWidth: "64px", border: "1px solid grey", borderRadius: "40px", backgroundColor: `${props.form.contractTerminates ? "pink" : "grey"}` }}
                >
                    <div style={{ height: "32px", width: "32px", margin: "3px", backgroundColor: "white", border: "1px solid grey", borderRadius: "50%", transform: `translateX(${props.form.contractTerminates ? "24px" : "0px"})`, transition: "300ms", cursor: "pointer" }} />
                </div>

                <div style={{ width: "16px" }} />

                <div>Contract extension after this date is not possible</div>
            </div>

            <div style={{ height: "80px" }} />

            <div>Rent Calculated Weekly</div>
            <div className="rent-input">
                <div style={{ fontSize: "32px", margin: "24px 8px 0px 0px" }}>$</div>
                <input
                    className="rent-field"
                    value={props.form.rent === 0 ? '' : props.form.rent}
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