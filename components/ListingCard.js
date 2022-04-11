import ListingCardRight from './ListingCardRight';
import ListingCardLeft from './ListingCardLeft';

const ListingCard = ({ note }) => {
    return (
        <div
            className="card"
            key={note._id}
            style={{ width: "100%", margin: "8px 0px", display: "flex", justifyContent: "space-between" }}
        >
            <ListingCardLeft note={note} />
            <ListingCardRight note={note} />
        </div>
    )
}

export default ListingCard;