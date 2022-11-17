import InputHeader from "./InputHeader";

const Part3 = (props) => {

    return (
        <>

            <h4 onClick={() => props.setPart(2)}>
                {'< Back to Contract'}
            </h4>

            <div style={{ height: "16px" }} />

            <InputHeader header={'Part 4: Description'} />

            <div style={{ height: "24px" }} />

            Please provide a detailed description of your property
            <textarea
                name='description'
                onChange={props.handleChange}
                value={props.form.description}
                style={{ border: "1px solid grey", width: "100%", resize: "none", fontFamily: "unset", fontSize: "24px" }}
            />

            <div style={{ height: "24px" }} />

            <div
                className="button primary"
                onClick={() => props.setPart(4)}
            >
                Next
            </div>

        </>
    )
}

export default Part3;