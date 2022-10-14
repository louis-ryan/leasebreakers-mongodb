import { useState, useEffect } from 'react';

const Details = ({ note}) => {

    return (
        <div
            className='effect-fullscreen'
            style={{ padding: "8px", backgroundColor: "white" }}
        >
            <div>
                Property Location:
                <h3>{note.address}, VIC</h3>
            </div>

            <div>
                Name of Breaker:
                <h3>{note.breakerName}</h3>
            </div>

            <div>
                Description:
                <h3>{note.description}</h3>
            </div>
        </div>
    )
}

export default Details;