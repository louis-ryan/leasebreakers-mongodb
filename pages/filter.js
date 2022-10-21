import { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import Location from '../components/Filter/Location'
import Rent from '../components/Filter/Rent'


const Map = () => {

    const { user, error, isLoading } = useUser();

    const [filter, setFilter] = useState({})


    /**
    * Format form
    */
    useEffect(() => {
        if (!user) return

        setFilter({
            ...filter,
            userId: user.sub
        })
    }, [user])


    /**
     * Update backend with latest filtering options
     */
    const updateFilter = async () => {
        try {
            const res = await fetch('api/filters', {
                method: 'POST',
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify(filter)
            })
            console.log("res, ", res)
        } catch (error) {
            console.log("THIS SHOULD BE A MODAL SAYING SORRY");
        }
    }

    return (
        <>
            <div style={{ height: "40px" }} />

            <div style={{ padding: "16px" }}>
                <h1>Filter</h1>

                <Link href="/">
                    <h4>{'< Back to listings'}</h4>
                </Link>
            </div>

            <Location filter={filter} setFilter={setFilter} />
            <Rent filter={filter} setFilter={setFilter} />

            <div onClick={() => { updateFilter() }}>
                UPDATE YOUR FILTER
            </div>
        </>
    )
}

export default Map;