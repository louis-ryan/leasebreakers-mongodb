import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import Location from './Location'
import Rent from './Rent'


const FilterComp = ({ filter, setFilter, getNotes, notes, deviceSize }) => {

    const { user } = useUser();

    const [reveal, setReveal] = useState("NONE")


    /**
     * Update backend with latest filtering options
     */
    const updateFilter = async () => {
        try {
            const res = await fetch('api/filters', {
                method: 'POST',
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    addresses: filter.addresses,
                    selectedAreas: filter.selectedAreas,
                    rent: filter.rent,
                    minRentVal: filter.minRentVal,
                    maxRentVal: filter.maxRentVal,
                    selectedRentVal: filter.selectedRentVal,
                    userId: user.sub
                })
            })
            const { data } = await res.json();
            console.log(data)
        } catch (error) {
            console.log("THIS SHOULD BE A MODAL SAYING SORRY");
        }
    }

    return (
        <div style={{ marginTop: "24px", borderRadius: "8px", }}>

            <Location reveal={reveal} setReveal={setReveal} deviceSize={deviceSize} filter={filter} setFilter={setFilter} getNotes={getNotes} />

            <div style={{ height: "8px" }} />

            <Rent reveal={reveal} setReveal={setReveal} deviceSize={deviceSize} filter={filter} setFilter={setFilter} notes={notes} />

            <div style={{ height: "8px" }} />

            <div
                onClick={() => { updateFilter() }}
                style={{ margin: "16px 8px", width: "calc(100% - 16px)", padding: "24px", textAlign: "center", backgroundColor: "black", color: "white", cursor: "pointer" }}
            >
                UPDATE YOUR FILTER
            </div>
        </div>
    )
}

export default FilterComp;