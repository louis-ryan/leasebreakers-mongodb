import { useState } from 'react';
import Location from './Location'
import Rent from './Rent'
import Rooms from './Rooms'
import Details from './Details'
import MoveIn from './MoveIn'


const FilterComp = ({ filter, setFilter, updateFilter, getNotes, notes, deviceSize }) => {

    const [reveal, setReveal] = useState("NONE")


    return (
        <div style={{ marginTop: "24px", borderRadius: "8px", }}>

            <Location reveal={reveal} setReveal={setReveal} deviceSize={deviceSize} filter={filter} setFilter={setFilter} getNotes={getNotes} />

            <div style={{ height: "8px" }} />

            <Rent reveal={reveal} setReveal={setReveal} deviceSize={deviceSize} filter={filter} setFilter={setFilter} notes={notes} />

            <div style={{ height: "8px" }} />

            <Rooms reveal={reveal} setReveal={setReveal} deviceSize={deviceSize} filter={filter} setFilter={setFilter} />

            <div style={{ height: "8px" }} />

            <Details reveal={reveal} setReveal={setReveal} deviceSize={deviceSize} filter={filter} setFilter={setFilter} />

            <div style={{ height: "8px" }} />

            <MoveIn reveal={reveal} setReveal={setReveal} deviceSize={deviceSize} filter={filter} setFilter={setFilter} />

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