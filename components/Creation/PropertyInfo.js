import Part1 from './Part1';
import Part2 from './Part2'

const Parts = ((props) => {

    switch (props.props.part) {
        case 1:
            return (
                <Part1
                    errors={props.props.errors }
                    form={props.props.form}
                    setPart={props.props.setPart}
                    handleChange={props.props.handleChange}
                    handleAddress={props.props.handleAddress}
                    postCode={props.props.postCode}
                />
            )
        case 2:
            return (
                <Part2 
                    formBools={props.props.formBools}
                    setFormBools={props.props.setFormBools}
                    setPart={props.props.setPart}
                />
            )
    }

})

const PropertyInfo = (props) => {


    return (
        <div style={{ backgroundColor: "#8596b2", width: "100%", display: "flex", justifyContent: "center" }}>
            <form style={{ width: "calc(100% - 32px)", maxWidth: "400px" }}>

                <div style={{ height: "40px" }} />

                <Parts props={props} />

            </form>
        </div>
    )
}

export default PropertyInfo;