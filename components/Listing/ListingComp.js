import Link from 'next/link';
import ListingCard from './ListingCard';


const ListingComp = ({ notes }) => {


    return (
        <div style={{ width: "100%" }}>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {notes && notes.map((note, idx) => {
                    return (
                        <ListingCard
                            key={idx}
                            note={note}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default ListingComp;