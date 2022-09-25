import Date from "./Date"

const Part2 = (props) => {

    return (
        <>
            <h2>Contract</h2>

            <Date
                handleDate={props.handleDate}
                errors={props.errors}
            />


            <div className="button primary" onClick={() => props.setPart(3)}>
                Next
            </div>

        </>
    )
}

export default Part2;