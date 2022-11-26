import ListingCard from './ListingCard';


const ListingComp = ({ notes, getNotes, rendering, unlimitedNotes, skipping, setSkipping, deviceSize }) => {


    return (
        <div style={{ width: "100%" }}>

            <div style={{ height: "40px" }} />

            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "8px" }}>
                <div>Viewing {skipping + 1} to {skipping + 5 > unlimitedNotes ? unlimitedNotes : skipping + 5} of {unlimitedNotes}</div>

            
                <div
                    onClick={() => {
                        if (skipping === 0) return
                        getNotes("SET_BROWSE", 5, skipping - 5)
                        setSkipping(skipping - 5)
                    }}
                >
                    PREV
                </div>
                <div
                    onClick={() => {
                        if (skipping + 5 >= unlimitedNotes) return
                        getNotes("SET_BROWSE", 5, skipping + 5)
                        setSkipping(skipping + 5)
                    }}
                >
                    NEXT
                </div>
            </div>

            {notes && notes.map((note, idx) => {
                return (
                    <ListingCard
                        key={idx}
                        note={note}
                        rendering={rendering}
                        deviceSize={deviceSize}
                    />
                )
            })}

            <div style={{ height: "80px" }} />

        </div>
    )
}

export default ListingComp;