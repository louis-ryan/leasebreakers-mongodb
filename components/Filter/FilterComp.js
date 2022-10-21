import { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import Location from './Location'
import Rent from './Rent'


const FilterComp = () => {

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
        <div style={{ width: "360px" }}>
            <div style={{ height: "40px" }} />

            <Location filter={filter} setFilter={setFilter} />
            <Rent filter={filter} setFilter={setFilter} />

            <div onClick={() => { updateFilter() }}>
                UPDATE YOUR FILTER
            </div>
        </div>
    )
}

export default FilterComp;