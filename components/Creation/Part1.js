

const Part1 = (props) => {

    return (
        <>
            Post Code

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input placeholder='3' maxLength={1} name='postCode1' onChange={props.handleChange} style={{ border: props.errors.address && "2px solid red", width: "20%", height: "80px", textAlign: "center", fontSize: "24px", caretColor: "transparent" }} />
                <input placeholder='0' maxLength={1} name='postCode2' onChange={props.handleChange} style={{ border: props.errors.address && "2px solid red", width: "20%", height: "80px", textAlign: "center", fontSize: "24px", caretColor: "transparent"  }} />
                <input placeholder='0' maxLength={1} name='postCode3' onChange={props.handleChange} style={{ border: props.errors.address && "2px solid red", width: "20%", height: "80px", textAlign: "center", fontSize: "24px", caretColor: "transparent"  }} />
                <input placeholder='0' maxLength={1} name='postCode4' onChange={props.handleChange} style={{ border: props.errors.address && "2px solid red", width: "20%", height: "80px", textAlign: "center", fontSize: "24px", caretColor: "transparent"  }} />
            </div>

            {props.errors.address && <p style={{ background: "red", borderRadius: "8px", marginTop: "4px", padding: "8px" }}>
                {props.errors.address}
            </p>}

            {props.form.validAddresses && props.postCode > 2999 && (
                <div style={{ borderRadius: "8px", overflow: "hidden", marginTop: "4px" }}>
                    {props.form.validAddresses.map((address) => {
                        return (
                            <div
                                key={address}
                                style={{ width: "100%", height: "40px", backgroundColor: "white", paddingLeft: "16px", paddingTop: "8px" }}
                                onClick={() => props.handleAddress(address)}
                            >
                                {address}
                            </div>
                        )
                    })}
                </div>
            )}

            {props.form.address && (<div>{props.form.address}</div>)}

            <div style={{ height: "24px" }} />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <div>Living and Bedrooms</div>
                    <input placeholder='2' control='input' name='numRoom' type='number' onChange={props.handleChange} />
                </div>

                <div>
                    <div>Bathrooms</div>
                    <input placeholder='1' control='input' name='numBath' type='number' onChange={props.handleChange} />
                </div>
            </div>

            <div style={{ height: "24px" }} />

            Description
            <textarea placeholder='Description' name='description' onChange={props.handleChange} style={{ border: "1px solid grey", width: "100%", resize: "none", fontFamily: "unset" }} />

            <div
                onClick={() => props.setPart(2)}
                style={{ position: "absolute", width: "400px", bottom: "24px", height: "60px", backgroundColor: "#1E304E", color: "white", textAlign: "center", alignItems: "center", paddingTop: "18px", borderRadius: "4px" }}
            >
                Next
            </div>

        </>
    )
}

export default Part1;