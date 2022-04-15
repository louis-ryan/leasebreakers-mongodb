import { useState } from "react"

const ListingCardRight = ({ note }) => {
    console.log(note.pics)


    return (
        <div>
            {/* <div
                onClick={() => { handleImgChange("prev") }}
            >
                prev
            </div> */}

            <div style={{display: "flex", flexWrap: "nowrap"}}>
                {note.pics.map((pic, idx) => {

                    return (
                        <span
                            key={idx}
                        >
                            <img
                                alt="note image"
                                src={pic.url}
                                style={{ height: "240px" }}
                            />
                        </span>
                    )

                })}
            </div>

            {/* <div
                onClick={() => { handleImgChange("next") }}
            >
                next
            </div> */}
        </div>
    )
}

export default ListingCardRight;