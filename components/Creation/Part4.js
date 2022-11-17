import InputHeader from "./InputHeader";
import PicUpload from "./PicUpload";


const PicsWrapper = `display: flex; flex-wrap: wrap; justify-content: space-between;`;


const Part4 = (props) => {

    return (
        <>

            <h4 onClick={() => props.setPart(3)}>
                {'< Back to Description'}
            </h4>

            <div style={{ height: "16px" }} />

            <InputHeader header={'Part 5: Photos'} />

            Upload some photos

            <div style={{ height: "4px" }} />

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((id) => {
                    return (
                        <PicUpload
                            key={id}
                            id={id}
                            uploadPhoto={props.compressFile}
                            form={props.form}
                            setForm={props.setForm}
                        />
                    )
                })}
            </div>

            <div
                onClick={() => props.handleSubmit()}
                style={{ bottom: "24px", height: "60px", backgroundColor: "black", color: "white", textAlign: "center", alignItems: "center", paddingTop: "18px", borderRadius: "4px", marginTop: "40px" }}
            >
                Create post
            </div>

        </>
    )
}

export default Part4;