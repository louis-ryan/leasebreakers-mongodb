import { Button } from 'semantic-ui-react';


const ListingCardLeft = ({ note }) => {


    return (
        <div style={{ position: "absolute", zIndex: "2", padding: "16px", display: "flex", justifyContent: "space-between" }}>

            {/* address */}
            <div className='note-tag'> 📍 {note.address && note.address} </div>

            {/* rooms */}
            <div className='note-tag'> 🛋️ {note.numRoom && note.numRoom} </div>

            {/* baths */}
            <div className='note-tag'> 🛀 {note.numBath && note.numBath} </div>

            {/*
                <Link href={`/${note._id}/edit`}>
                    <Button primary>Edit</Button>
                </Link> 
            */}
        </div>





    )
}

export default ListingCardLeft;