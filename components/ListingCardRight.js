

const ListingCardRight = ({ note }) => {


    return (
        <div style={{ display: "flex", flexWrap: "nowrap", overflowX: "scroll", borderRadius: "4px" }}>
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