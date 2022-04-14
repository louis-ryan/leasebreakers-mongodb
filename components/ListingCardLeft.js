import { Button } from 'semantic-ui-react';
import Link from 'next/link';

const ListingCardLeft = ({ note }) => {
    return (
        <div style={{ padding: "24px" }}>
            <div>
                <Link href={`/${note._id}`}>
                    <a style={{ color: "white" }}>{note.address && note.address}</a>
                </Link>
            </div>
            <div>
                <Link href={`/${note._id}`}>
                    <Button primary>View</Button>
                </Link>
                <Link href={`/${note._id}/edit`}>
                    <Button primary>Edit</Button>
                </Link>
            </div>
        </div>
    )
}

export default ListingCardLeft;