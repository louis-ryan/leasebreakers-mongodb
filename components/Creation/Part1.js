const Part1 = (props) => {

    const handleNextButton = {
        opacity: props.form.postCode && props.form.address ? "1" : "0.5",
        pointerEvents: props.form.postCode && props.form.address ? "inherit" : "none",
    }


    return (
        <>
            <h2>Property</h2>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <div>Living/Bedrooms</div>
                    <input placeholder='2' control='input' name='numRoom' type='number' onChange={props.handleChange} style={{ textAlign: "center" }} />
                </div>

                <div style={{ width: "16px" }} />

                <div>
                    <div>Bathrooms</div>
                    <input placeholder='1' control='input' name='numBath' type='number' onChange={props.handleChange} style={{ textAlign: "center" }} />
                </div>
            </div>

            <div style={{ height: "24px" }} />

            Description
            <textarea placeholder='Description' name='description' onChange={props.handleChange} style={{ border: "1px solid grey", width: "100%", resize: "none", fontFamily: "unset" }} />

            <div style={{ height: "24px" }} />

            <div
                className="button primary"
                onClick={() => props.setPart(2)}
                style={handleNextButton}
            >
                Next
            </div>

        </>
    )
}


export default Part1;