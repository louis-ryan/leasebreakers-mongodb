import InputHeader from "./InputHeader";

const Part2 = (props) => {

    const handleNextButton = {
        opacity: props.form.contractEnds && props.form.rent ? "1" : "0.5",
        pointerEvents: props.form.contractEnds && props.form.rent ? "inherit" : "none",
    }


    return (
        <>
            <div style={{ height: "16px" }} />

            <InputHeader header={'Part 3: Contract'} />

            <div>End of current contract</div>

            <input
                type="date"
                onChange={(e) => props.handleContractEnds(e.target.value)}
                style={{ width: "100%", fontFamily: "sans-serif", padding: "24px", fontSize: "24px" }}
            />

            <div style={{ height: "24px" }} />

            <div style={{ display: "flex", backgroundColor: "#e5e1e5", padding: "16px", borderRadius: "8px" }}>
                <div
                    onClick={() => props.handleContractTerminates(props.form.contractTerminates ? false : true)}
                    style={{ height: "24px", minWidth: "40px", border: "1px solid grey", borderRadius: "40px", backgroundColor: `${!props.form.contractTerminates ? "pink" : "grey"}`, transform: "translateY(8px)" }}
                >
                    <div style={{ height: "20px", width: "20px", margin: "1px", backgroundColor: "white", border: "1px solid grey", borderRadius: "50%", transform: `translateX(${!props.form.contractTerminates ? "15px" : "0px"})`, transition: "300ms", cursor: "pointer" }} />
                </div>

                <div style={{ width: "16px" }} />

                <div>{'Contract extension after this date is possible.'}</div>
            </div>

            <div style={{fontSize: "12px"}}>{'Further negotiations will be up to the new tennant.'}</div>

            <div style={{ height: "24px" }} />

            <div>Earliest possible move in date for new tennant</div>

            <input
                type="date"
                onChange={(e) => props.handleMoveInDate(e.target.value)}
                style={{ width: "100%", fontFamily: "sans-serif", padding: "24px", fontSize: "24px" }}
            />

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

            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <div
                    className="button secondary"
                    onClick={() => props.setPart(1)}
                    style={{ width: "48%" }}
                >
                    Back
                </div>

                <div
                    className="button primary"
                    onClick={() => props.setPart(3)}
                    style={{ ...handleNextButton, width: "48%" }}
                >
                    Next
                </div>
            </div>

        </>
    )
}

export default Part2;