import { useEffect, useState } from "react";
import mapArr from './MapArr';
import FilterHeader from "./FilterHeader";


const Location = ({ filter, setFilter }) => {

    const [reveal, setReveal] = useState(false)
    const [view, setView] = useState("AREA")

    const [areaSelectedArr, setAreaSelectedArr] = useState([])
    const [selectionArr, setSelectionArr] = useState([])
    const [postCodes, setPostCodes] = useState([])
    const [addressesArr, setAddressesArr] = useState([])
    const [areasArr, setAreasArr] = useState([])


    /**
     * Set filter
     */
    useEffect(() => {
        setFilter && setFilter({ ...filter, addresses: addressesArr })
    }, [addressesArr])


    /**
     * Select regions from area selection
     */
    const handleAreaSelection = (selection) => {

        var newAreaSelectedArr = [...areaSelectedArr]
        var index = newAreaSelectedArr.indexOf(selection)

        if (index === -1) {
            newAreaSelectedArr.push(selection);
        } else {
            newAreaSelectedArr.splice(index, 1);
        }

        setAreaSelectedArr(newAreaSelectedArr)
    }


    /**
     * Build array of areas
     */
    useEffect(() => {

        var listOfAreas = []

        mapArr.map((map) => {
            if (!listOfAreas.includes(map.area)) {
                listOfAreas.push(map.area)
            }
        })

        setAreasArr(listOfAreas)

    }, [mapArr])


    /**
     * Filer Regions based on Areas
     */
    useEffect(() => {
        var newAvailableRegions = []

        areaSelectedArr.map((area) => {
            mapArr.map((map) => {
                if (map.area === area) {
                    newAvailableRegions.push(map.name)
                }
            })
        })

        setSelectionArr(newAvailableRegions)
    }, [areaSelectedArr, mapArr])



    /**
     * Get postcodes from selected regions
     */
    useEffect(() => {
        async function getPostCodes() {
            const res = await fetch(`./postCodes.json?`);
            const data = await res.json()

            let postCodeArr = []

            {
                selectionArr.map((selection) => {
                    mapArr.map((map) => {
                        if (map.name === selection) {

                            const latitudeRange = (lat) => (lat < map.latStarts && lat > map.latEnds)
                            const longitudeRange = (long) => (long > map.longStarts && long < map.longEnds)

                            data.map((postCode) => {
                                if (latitudeRange(postCode.latitude) && longitudeRange(postCode.longitude)) {
                                    postCodeArr.push(postCode)
                                }
                            })

                        }
                    })
                })
            }
            setPostCodes(postCodeArr)
        }
        getPostCodes()
    }, [mapArr, selectionArr])


    /**
     * Get list of selected addresses without duplication
     */
    useEffect(() => {
        var singleAddressesArr = []

        postCodes.map((code) => {
            if (singleAddressesArr.includes(code.place_name)) return
            singleAddressesArr.push(code.place_name)
        })

        setAddressesArr(singleAddressesArr)
    }, [postCodes])


    if (filter && filter.addresses) {
        return (
            <>
                <div
                    onClick={() => reveal ? setReveal(false) : setReveal(true)}
                    style={{
                        border: filter.addresses.length && filter.addresses.length > 0 ? "1px solid pink" : "1px solid grey",
                        backgroundColor: "white",
                        borderRadius: "8px",
                    }}
                >

                    <FilterHeader
                        headerTitle={'Location'}
                        headerSubTitle={`${filter.addresses.length} addresses in your filter`}
                        activeCondition={filter.addresses.length && filter.addresses.length > 0}

                    />

                    {reveal &&
                        <>

                            <div style={{ padding: "16px" }}>
                                <div style={{ height: "8px" }} />
                                <div
                                    onClick={(e) => { e.stopPropagation(); view === "AREA" ? setView("ADDRESS") : setView("AREA") }}
                                    style={{ width: "100%", textAlign: "center", border: "1px solid grey", display: "flex", borderRadius: "8px", overflow: "hidden" }}
                                >
                                    <div style={{
                                        width: "50%",
                                        height: "100%",
                                        backgroundColor: view === "AREA" && "black",
                                        padding: "16px",
                                        color: view === "AREA" && "white",
                                    }}>
                                        AREA
                                    </div>

                                    <div style={{
                                        width: "50%",
                                        height: "100%",
                                        backgroundColor: view === "ADDRESS" && "black",
                                        padding: "16px",
                                        color: view === "ADDRESS" && "white",
                                    }}>
                                        ADDRESSES
                                    </div>
                                </div>
                            </div>

                            {view === "AREA" && (
                                <>
                                    <div style={{ padding: "16px" }}>
                                        <h4>Area Map</h4>
                                    </div>


                                    <div style={{ height: "280px", margin: "-40px 0px 0px 4px" }}>
                                        {mapArr.map((map, idx) => {
                                            return (
                                                <div key={idx}>
                                                    <svg width="1600px" height="1600px" style={{ position: "absolute", zoom: "0.2" }}>
                                                        <g id={map.name} stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" style={{ cursor: "pointer" }}>
                                                            <path d={map.path} id="Rectangle" stroke="#979797" strokeWidth="4" fill={selectionArr.indexOf(map.name) === -1 ? "white" : "pink"}></path>
                                                        </g>
                                                    </svg>
                                                </div>
                                            )
                                        })}
                                    </div>


                                    <div style={{ padding: "16px" }}>

                                        <h4>Select Areas</h4>

                                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                                            {areasArr.map((area) => {
                                                return (
                                                    <div
                                                        key={area}
                                                        onClick={(e) => { e.stopPropagation(); handleAreaSelection(area) }}
                                                        style={{
                                                            backgroundColor: areaSelectedArr.indexOf(area) === -1 ? "white" : "pink",
                                                            width: "49%",
                                                            padding: "8px",
                                                            border: "1px solid grey",
                                                            textAlign: "center",
                                                            marginTop: "6px",
                                                            borderRadius: "4px",
                                                        }}
                                                    >
                                                        <div>{area}</div>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        <div style={{ height: "40px" }} />

                                    </div>
                                </>
                            )}

                            {view === "ADDRESS" && (
                                <div style={{ padding: "8px" }}>

                                    <h4>Addresses in your filter</h4>

                                    {addressesArr.length === 0 ? (
                                        <div>Select from the map to add addresses</div>
                                    ) : (
                                        <div>Remove addresses in your filter by tapping them.</div>
                                    )}


                                    <div style={{ height: "24px" }} />

                                    <div style={{ display: "flex", flexWrap: "wrap", height: "400px", overflow: "scroll" }}>
                                        {addressesArr.map((address, idx) => {
                                            return (
                                                <div
                                                    key={address}
                                                    style={{
                                                        padding: "8px 16px",
                                                        backgroundColor: "black",
                                                        color: "white",
                                                        margin: "8px 8px 0px 0px",
                                                        fontSize: "12px",
                                                        borderRadius: "8px"
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        var newAddressList = [...addressesArr]
                                                        newAddressList.splice(idx, 1)
                                                        setAddressesArr(newAddressList)
                                                    }}
                                                >
                                                    {address}
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <div style={{ height: "40px" }} />

                                </div>
                            )}
                        </>
                    }
                </div>
            </>
        )
    }
}

export default Location;