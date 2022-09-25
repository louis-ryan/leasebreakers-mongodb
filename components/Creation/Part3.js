

const Part3 = (props) => {

    return (
        <>
            <h2>Does it have...</h2>

            <div style={{ margin: "0 0 1em" }}>

                <div style={{ display: "flex", justifyContent: "space-between", margin: "0 0 1em" }}>

                    <div
                        className="form-bool"
                        style={{
                            width: "30%",
                            opacity: props.formBools.petsAllowed === false ? "0.8" : "1",
                            filter: props.formBools.petsAllowed === false ? "brightness(0.5)" : "brightness(1)",
                        }}
                        onClick={() => props.setFormBools({
                            ...props.formBools,
                            petsAllowed: props.formBools.petsAllowed === false ? true : false
                        })}
                    >
                        <h1> 🐶 </h1>
                        <p>Pets Allowed</p>
                    </div>

                    <div
                        className="form-bool"
                        style={{
                            width: "30%",
                            opacity: props.formBools.outdoorArea === false ? "0.8" : "1",
                            filter: props.formBools.outdoorArea === false ? "brightness(0.5)" : "brightness(1)",
                        }}
                        onClick={() => props.setFormBools({
                            ...props.formBools,
                            outdoorArea: props.formBools.outdoorArea === false ? true : false
                        })}
                    >
                        <h1>🌲</h1>
                        <p>Outdoor Area</p>
                    </div>

                    <div
                        className="form-bool"
                        style={{
                            width: "30%",
                            opacity: props.formBools.parkingSpace === false ? "0.8" : "1",
                            filter: props.formBools.parkingSpace === false ? "brightness(0.5)" : "brightness(1)",
                        }}
                        onClick={() => props.setFormBools({
                            ...props.formBools,
                            parkingSpace: props.formBools.parkingSpace === false ? true : false
                        })}
                    >
                        <h1>🚗</h1>
                        <p>Parking Space</p>
                    </div>

                </div>

                Is it less than 1km to a...

                <div style={{ display: "flex", justifyContent: "space-between" }}>

                    <div
                        className="form-bool"
                        style={{
                            width: "44.6%",
                            opacity: props.formBools.supermarket === false ? "0.8" : "1",
                            filter: props.formBools.supermarket === false ? "brightness(0.5)" : "brightness(1)",
                        }}
                        onClick={() => props.setFormBools({
                            ...props.formBools,
                            supermarket: props.formBools.supermarket === false ? true : false
                        })}
                    >
                        <h1>🛒</h1>
                        <p>Supermarket</p>
                    </div>

                    <div
                        className="form-bool"
                        style={{
                            width: "44.6%",
                            opacity: props.formBools.trainStation === false ? "0.8" : "1",
                            filter: props.formBools.trainStation === false ? "brightness(0.5)" : "brightness(1)",
                        }}
                        onClick={() => props.setFormBools({
                            ...props.formBools,
                            trainStation: props.formBools.trainStation === false ? true : false
                        })}
                    >
                        <h1>🚉</h1>
                        <p>Trainstation</p>
                    </div>


                </div>
                <div
                    onClick={() => props.setPart(4)}
                    style={{ bottom: "24px", height: "60px", backgroundColor: "#1E304E", color: "white", textAlign: "center", alignItems: "center", paddingTop: "18px", borderRadius: "4px" }}
                >
                    Next
                </div>

            </div>

        </>
    )
}

export default Part3;