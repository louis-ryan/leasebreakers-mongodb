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
                />
            )
        case 1:
            return (
                <Part1
                    errors={props.props.errors}
                    form={props.props.form}
                    setPart={props.props.setPart}
                    handleChange={props.props.handleChange}
                />
            )
        case 2:
            return (
                <Part2
                    errors={props.props.errors}
                    formBools={props.props.formBools}
                    setFormBools={props.props.setFormBools}
                    setPart={props.props.setPart}
                    handleDate={props.props.handleDate}
                />
            )
        case 3:
            return (
                <Part3
                    formBools={props.props.formBools}
                    setFormBools={props.props.setFormBools}
                    setPart={props.props.setPart}
                />
            )
        case 4:
            return (
                <Part4
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
        <div className='effect-fullscreen' style={{ width: "100%", display: "flex", justifyContent: "center", paddingBottom: "40px" }}>
            <form style={{ width: "calc(100% - 32px)", maxWidth: "400px" }}>

                <div style={{ height: "40px" }} />

                <Parts props={props} />

            </form>
        </div>
    )
}

export default PropertyInfo;