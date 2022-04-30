import { Button } from 'semantic-ui-react';


const ListingCardLeft = ({ note, user }) => {


    return (
        <div style={{ position: "absolute", zIndex: "2", padding: "16px", display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", justifyContent: "left" }}>

                {/* address */}
                <div className='note-tag'> Close to {note.address && note.address} </div>

                {/* rooms */}
                <div className='note-tag'> {note.numRoom && note.numRoom} rooms </div>

                {/* baths */}
                <div className='note-tag'> {note.numBath && note.numBath} baths </div>

            </div>

            <div style={{ display: "flex", justifyContent: "right" }}>

                {/* listed by you */}
                {user && user.sub === note.breakerId &&
                    <div className='note-tag-yours'> YOUR POST </div>
                }

            </div>


            {/*
                <Link href={`/${note._id}/edit`}>
                    <Button primary>Edit</Button>
                </Link> 
                */}

        </div>
    )
}

export default ListingCardLeft;