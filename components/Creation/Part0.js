import PostCode from "./PostCode"

const Part1 = (props) => {

    const handleNextButton = {
        opacity: props.form.postCode && props.form.address ? "1" : "0.5",
        pointerEvents: props.form.postCode && props.form.address ? "inherit" : "none",
    }


    return (
        <>
            <h2>Location</h2>

            <PostCode
                handlePost={props.handlePost}
                errors={props.errors}
            />

            {props.validAddresses && props.postCode > 2999 && (
                <>

                    <div style={{ height: "24px" }} />

                    Address

                    <div style={{ borderRadius: "8px", overflow: "hidden", marginTop: "4px", border: "#1E304E 1px solid" }}>
                        {props.validAddresses.map((address) => {
                            return (
                                <div
                                    key={address}
                                    style={{ width: "100%", height: "40px", backgroundColor: "white", paddingLeft: "16px", paddingTop: "8px" }}
                                    onClick={() => props.handleAddress(address)}>
                                    {address}
                                </div>
                            )
                        })}
                    </div>
                </>
            )}

            {props.form.address && (<div>{props.form.address}</div>)}

            <div style={{ height: "24px" }} />

            <div
                className="button primary"
                onClick={() => props.setPart(1)}
                style={handleNextButton}
            >
                Next
            </div>

        </>
    )
}


export default Part1;