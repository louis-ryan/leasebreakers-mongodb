import { useState } from "react"

const ListingCardRight = ({ note }) => {
    console.log(note.pics)


    return (
        <div style={{ display: "flex", flexWrap: "nowrap", overflowX: "scroll" }}>
            {note.pics.map((pic, idx) => {

                return (
                    <span key={idx}>
                        <img
                            alt="note image"
                            src={pic.url}
                            style={{ height: "240px" }}
                        />
                    </span>
                )

            })}
        </div>
    )
}

export default ListingCardRight;