import Part0 from './Part0';
import Part1 from './Part1';
import Part2 from './Part2';
import Part3 from './Part3';
import Part4 from './Part4';


const Parts = ((props) => {

    switch (props.props.part) {
        case 0:
            return (
                <Part0
                    errors={props.props.errors}
                    form={props.props.form}
                    setPart={props.props.setPart}
                    handleChange={props.props.handleChange}
                    handlePost={props.props.handlePost}
                    handleAddress={props.props.handleAddress}
                    postCode={props.props.postCode}
                    validAddresses={props.props.validAddresses}
                    latInPx={props.props.latInPx}
                    longInPx={props.props.longInPx}
                    handleClearPost={props.props.handleClearPost}
                    post={props.props.post}
                />
            )
        case 1:
            return (
                <Part1
                    errors={props.props.errors}
                    form={props.props.form}
                    setPart={props.props.setPart}
                    handleChange={props.props.handleChange}
                    formBools={props.props.formBools}
                    setFormBools={props.props.setFormBools}
                />
            )
        case 2:
            return (
                <Part2
                    errors={props.props.errors}
                    setPart={props.props.setPart}
                    form={props.props.form}
                    setForm={props.props.setForm}
                    handleContractEnds={props.props.handleContractEnds}
                    handleContractTerminates={props.props.handleContractTerminates}
                    handleMoveInDate={props.props.handleMoveInDate}
                    handleRent={props.props.handleRent}
                />
            )
        case 3:
            return (
                <Part3
                    errors={props.props.errors}
                    setPart={props.props.setPart}
                    form={props.props.form}
                    handleChange={props.props.handleChange}
                />
            )
        case 4:
            return (
                <Part4
                    errors={props.props.errors}
                    setPart={props.props.setPart}
                    form={props.props.form}
                    setForm={props.props.setForm}
                    compressFile={props.props.compressFile}
                    handleSubmit={props.props.handleSubmit}
                />
            )
    }

})

const PropertyInfo = (props) => {


    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div
                style={{
                    width: props.device === "DESKTOP" ? "920px" : "100%",
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "white",
                    border: "1px solid grey",
                    borderRadius: "16px"
                }}
            >
                <form style={{
                    width: "calc(100% - 32px)",
                    maxWidth: "400px",
                    padding: "40px 0px"
                }}>

                    <Parts props={props} />

                </form>
            </div>
        </div>
    )
}

export default PropertyInfo;