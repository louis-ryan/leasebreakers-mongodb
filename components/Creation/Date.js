const Date = (props) => {

    const inputIsNumber = (e) => (e.target.value === "0" || e.target.value === "1" || e.target.value === "2" || e.target.value === "3" || e.target.value === "4" || e.target.value === "5" || e.target.value === "6" || e.target.value === "7" || e.target.value === "8" || e.target.value === "9")
    const placeholderVal = (id) => { if (id === 1 || id === 2) { return "D" } if (id === 3 || id === 4) { return "M" } if (id === 5 || id === 6 || id === 7 || id === 8) { return "Y" } }


    return (
        <>
            Current contract ends:

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => {
                    return (
                        <input
                            key={id}
                            placeholder={placeholderVal(id)}
                            maxLength={1}
                            name={`postCode${id}`}
                            onChange={(e) => {
                                props.errors.address = ""
                                props.handleDate(e);
                                if (!document) return
                                if (id > 7) return
                                if (!inputIsNumber(e)) return
                                document.getElementsByName(`postCode${id + 1}`)[0].focus();
                            }}
                            style={{
                                border: props.errors.address && "2px solid #a57583",
                                marginRight: id === 2  && "16px" ,
                                marginLeft: id === 5 && "16px" ,
                                width: "10%", height: "80px", textAlign: "center", fontSize: "24px", caretColor: "transparent"
                            }}
                            autoComplete="new-password"
                        />
                    )
                })
                }
            </div>

            {props.errors.address && (
                <p style={{ background: "#a57583", borderRadius: "4px", marginTop: "4px", padding: "8px" }}>
                    {props.errors.address}
                </p>
            )}
        </>
    )
}

export default Date;