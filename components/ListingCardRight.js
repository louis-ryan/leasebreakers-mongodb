import { useState } from "react"

const imgBoxStyle = {
    width: "240px",
    overflow: "hidden",
    background: "black",
    textAlign: "center",
}

const buttonStyle = {
    width: "40px",
    height: "100%",
    background: "grey",
    textAlign: "center",
    paddingTop: "116px"
}

const ListingCardRight = ({ note }) => {

    const [activeUrl, setActiveUrl] = useState(0)

    const handleImgChange = (direction) => {
        if (direction === "next") {
            if (activeUrl < note.pics.length - 1) {
                setActiveUrl(activeUrl + 1)
            } else {
                setActiveUrl(0)
            }
        }
        if (direction === "prev") {
            if (activeUrl > 0) {
                setActiveUrl(activeUrl - 1)
            } else {
                setActiveUrl(note.pics.length - 1)
            }
        }
    }

    return (
        <div style={{ display: "flex" }}>
            <div
                style={buttonStyle}
                onClick={() => { handleImgChange("prev") }}
            >
                prev
            </div>
            <div style={imgBoxStyle}>
                <img
                    alt="note image"
                    src={note.pics[activeUrl].url}
                    style={{ height: "240px" }}
                />
            </div>
            <div
                style={buttonStyle}
                onClick={() => { handleImgChange("next") }}
            >
                next
            </div>
        </div>
    )
}

export default ListingCardRight;