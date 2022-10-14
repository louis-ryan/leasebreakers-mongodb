import ContractEnds from "./ContractEnds"

const Part2 = (props) => {

    const handleNextButton = {
        opacity: props.form.contractEnds && props.form.rent ? "1" : "0.5",
        pointerEvents: props.form.contractEnds && props.form.rent ? "inherit" : "none",
    }

    return (
        <>
            <h4 onClick={() => props.setPart(1)}>
                {'< Back to Property'}
            </h4>

            <div style={{ height: "16px" }} />

            <h2>Contract</h2>

            <ContractEnds
                handleContractEnds={props.handleContractEnds}
                errors={props.errors}
                endDate={props.endDate}
            />

            <div style={{ height: "8px" }} />

            <div
                className="button secondary"
                onClick={() => props.handleClearEndDate()}
            >
                CLEAR
            </div>

            <div style={{ height: "40px" }} />


            <div>Rent Calculated Weekly</div>
            <input
                value={props.form.rent}
                placeholder='0.00'
                control='input'
                name='rent'
                type='number'
                onChange={props.handleRent}
                style={{ width: "100%", fontSize: "32px", height: "80px", paddingLeft: "40px", }}
            />

            <div style={{ left: "32px", position: "absolute", fontSize: "32px", marginTop: "-60px" }}>$</div>

            <div style={{ left: "300px", position: "absolute", fontSize: "32px", marginTop: "-60px" }}>AUD</div>

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