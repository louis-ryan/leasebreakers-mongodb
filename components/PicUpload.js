import React from "react";

const boxStyle = { height: "120px", width: "30%", backgroundColor: "lightgrey", marginBottom: "24px", display: "flex", justifyContent: "center", overflow: "hidden", borderRadius: "4px" }

const UploaderBox = ({ uploadPhoto }) => {
    return (
        <div style={boxStyle}>
                <label for="file-upload" class="file-upload" style={{padding: "40%"}}> UPLOAD </label>
                <input id="file-upload" type="file" name="image" accept="image/png, image/jpeg" onChange={uploadPhoto} style={{ display: "none" }} />
        </div >
    )
}

const ImageBox = ({ form, id }) => {
    return (
        <div style={boxStyle}>
            <img src={form.pics && form.pics[id] && form.pics[id].url}
                style={{ width: "100%" }}
            />
            {/* <h3 onClick={() => {
        var newForm = form
        newForm.pics.splice(id, 1)

        setForm(newForm);
    }}>
        DELETE
    </h3> */}
        </div>
    )
}

const InactiveBox = ({ }) => {
    return (
        <div style={boxStyle} />
    )
}

const PicUpload = ({ id, uploadPhoto, form }) => {

    if (form.pics) {

        if (id === form.pics.length) {

            return <UploaderBox uploadPhoto={uploadPhoto} />

        } else if (form.pics[id] && form.pics[id].url) {

            return <ImageBox form={form} id={id} />

        } else {

            return <InactiveBox />
        }
    } else {

        if (id === 0) {

            return <UploaderBox uploadPhoto={uploadPhoto} />

        } else {

            return <InactiveBox />
        }

    }


}


export default PicUpload;