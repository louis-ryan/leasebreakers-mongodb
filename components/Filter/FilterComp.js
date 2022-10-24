import { useUser } from '@auth0/nextjs-auth0';
import Location from './Location'
import Rent from './Rent'


const FilterComp = ({ filter, setFilter, notes }) => {

    const { user, error, isLoading } = useUser();


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
                    areas: filter.areas,
                    userId: filter.userId
                })
            })
            console.log("res, ", res)
        } catch (error) {
            console.log("THIS SHOULD BE A MODAL SAYING SORRY");
        }
    }

    return (
        <div style={{ marginTop: "24px", borderRadius: "8px", }}>

            <Location filter={filter} setFilter={setFilter} />

            <div style={{ height: "8px" }} />

            <Rent filter={filter} setFilter={setFilter} notes={notes} />

            <div style={{ height: "8px" }} />

            <div
                onClick={() => { updateFilter() }}
                style={{ width: "100%", padding: "16px", textAlign: "center", border: "4px solid grey", borderRadius: "8px" }}
            >
                UPDATE YOUR FILTER
            </div>
        </div>
    )
}

export default FilterComp;