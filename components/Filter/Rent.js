import { useEffect, useRef, useState } from "react";
import FilterHeader from "./FilterHeader";


const MapFilter = ({ filter, setFilter, notes }) => {

    const [reveal, setReveal] = useState(false)

    const [minVal, setMinVal] = useState(null)
    const [maxVal, setMaxVal] = useState(null)
    const [selectedVal, setSelectedVal] = useState(minVal)

    console.log(minVal, "< >", maxVal, "(", selectedVal, ")")

    /**
     * Map notes and assign Min and Max to range
     */
    useEffect(() => {
        var rentArr = []
        notes.map((note) => {
            if (!note.rent) return
            rentArr.push(note.rent)
        })
        var sortedRentArr = rentArr.sort((a, b) => { return a - b })
        setMinVal(sortedRentArr[0])
        setMaxVal(sortedRentArr[sortedRentArr.length - 1])
    })




    return (
        <>
            <div
                onClick={() => reveal ? setReveal(false) : setReveal(true)}
                style={{
                    border: "" ? "1px solid pink" : "1px solid grey",
                    backgroundColor: "white",
                    borderRadius: "8px",
                }}
            >

                <FilterHeader
                    headerTitle={'Rent'}
                    headerSubTitle={`Range of values`}
                    activeCondition={""}

                />

                {reveal &&
                    <>
                        <div style={{ padding: "16px" }}>

                            <input
                                type="range"
                                min={minVal}
                                max={maxVal}
                                step="1"
                                style={{ width: "100%" }}
                                onChange={(e) => setSelectedVal(e.target.valueAsNumber)}
                            />
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default MapFilter;