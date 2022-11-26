

const ListingCardRight = ({ note }) => {


    return (
        <div style={{ display: "flex", flexWrap: "nowrap", overflowX: "scroll", transform: "scale(1.1)" }}>
            {note.pics.map((pic, idx) => {

                return (
                    <span key={idx}>
                        <img
                            alt="note image"
                            src={pic.url}
                            style={{ height: "320px" }}
                        />
                    </span>
                )

            })}
        </div>
    )
}

export default ListingCardRight;