import { useState } from 'react'
import Link from 'next/link';
import Location from '../components/Filter/Location'
import Rent from '../components/Filter/Rent'


const Map = () => {

    const [filter, setFilter] = useState({})
    console.log("filter: ", filter)

    return (
        <>
            <div style={{ height: "120px" }} />

            <div style={{padding: "16px"}}>
                <h1>Filter</h1>

                <Link href="/">
                    <h4>{'< Back to listings'}</h4>
                </Link>
            </div>

            <Location filter={filter} setFilter={setFilter} />
            <Rent filter={filter} setFilter={setFilter} />
        </>
    )
}

export default Map;