import ListingCardRight from './ListingCardRight';
import ListingCardLeft from './ListingCardLeft';

const ListingCard = ({ note }) => {
    return (
        <div
            key={note._id}
            style={{height: "100%", margin: "8px 0px", width: "100%", overflowX: "scroll", background: "white"}}
        >
            <ListingCardLeft note={note} />
            <ListingCardRight note={note} />
        </div>
    )
}

export default ListingCard;