

const Part1 = (props) => {

    return (
        <>
            Post Code

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input placeholder='3' maxLength={1} name='postCode1' onChange={props.handlePost} style={{ border: props.errors.address && "2px solid red", width: "20%", height: "80px", textAlign: "center", fontSize: "24px", caretColor: "transparent" }} />
                <input placeholder='0' maxLength={1} name='postCode2' onChange={props.handlePost} style={{ border: props.errors.address && "2px solid red", width: "20%", height: "80px", textAlign: "center", fontSize: "24px", caretColor: "transparent" }} />
                <input placeholder='0' maxLength={1} name='postCode3' onChange={props.handlePost} style={{ border: props.errors.address && "2px solid red", width: "20%", height: "80px", textAlign: "center", fontSize: "24px", caretColor: "transparent" }} />
                <input placeholder='0' maxLength={1} name='postCode4' onChange={props.handlePost} style={{ border: props.errors.address && "2px solid red", width: "20%", height: "80px", textAlign: "center", fontSize: "24px", caretColor: "transparent" }} />
            </div>

            {props.errors.address && <p style={{ background: "red", borderRadius: "8px", marginTop: "4px", padding: "8px" }}>
                {props.errors.address}
            </p>}

            {props.validAddresses && props.postCode > 2999 && (
                <>
                    Address

                    <div style={{ borderRadius: "8px", overflow: "hidden", marginTop: "4px" }}>
                        {props.validAddresses.map((address) => {
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
                </>
            )}

            {props.form.address && (<div>{props.form.address}</div>)}

            <div style={{ height: "24px" }} />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <div>Living/Bedrooms</div>
                    <input placeholder='2' control='input' name='numRoom' type='number' onChange={props.handleChange} style={{ textAlign: "center" }} />
                </div>

                <div style={{width: "16px"}} />

                <div>
                    <div>Bathrooms</div>
                    <input placeholder='1' control='input' name='numBath' type='number' onChange={props.handleChange} style={{ textAlign: "center" }} />
                </div>
            </div>

            <div style={{ height: "24px" }} />

            Description
            <textarea placeholder='Description' name='description' onChange={props.handleChange} style={{ border: "1px solid grey", width: "100%", resize: "none", fontFamily: "unset" }} />

            <div
                onClick={() => props.setPart(2)}
                style={{ bottom: "24px", height: "60px", backgroundColor: "#1E304E", color: "white", textAlign: "center", alignItems: "center", paddingTop: "18px", borderRadius: "4px", marginTop: "40px" }}
            >
                Next
            </div>

        </>
    )
}

export default Part1;