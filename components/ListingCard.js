import { useUser } from '@auth0/nextjs-auth0';
import ListingCardRight from './ListingCardRight';
import ListingCardLeft from './ListingCardLeft';
import Link from 'next/link';

const ListingCard = ({ note }) => {

    const { user, error, isLoading } = useUser()

    return (
        <Link href={`/${note._id}`}>
            <div
                key={note._id}
                style={{
                    height: "100%",
                    margin: "8px 0px",
                    width: "100%",
                    background: "white",
                    borderRadius: "4px",
                    boxShadow: "0px 0px 42px 2px rgba(0,0,0,0.6)",
                    border: user.sub === note.breakerId && "8px #5D4A26 solid"
                }}
                className="note-container"
            >
                <ListingCardLeft note={note} user={user} />
                <ListingCardRight note={note} />
            </div>
        </Link>
    )
}

export default ListingCard;