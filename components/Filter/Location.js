import { useEffect, useState } from "react";
import mapArr from './MapArr';
import FilterHeader from "./FilterHeader";


const Location = ({ reveal, setReveal, deviceSize, filter, setFilter, getNotes }) => {

    const [view, setView] = useState("AREA")

    // const [selectedRegions, setSelectedRegions] = useState([])

    const [areaSelectedArr, setAreaSelectedArr] = useState([])
    const [selectionArr, setSelectionArr] = useState([])
    const [areasArr, setAreasArr] = useState([])

    var newSelectedRegions = []


    const handleFilterAdd = (postCodes) => {

        var singleAddressesArr = []

        postCodes.map((code) => {
            if (singleAddressesArr.includes(code.place_name)) return
            singleAddressesArr.push(code.place_name)
        })

        setFilter({ ...filter, addresses: singleAddressesArr })
        getNotes()
    }


    const filterAddressesFromRegions = (selectionArr) => {
        async function getPostCodes() {
            const res = await fetch(`./postCodes.json?`);
            const data = await res.json()
            let postCodeArr = []
            selectionArr.map((selection) => {
                mapArr.map((map) => {
                    if (map.name === selection) {
                        const latitudeRange = (lat) => (lat < map.latStarts && lat > map.latEnds)
                        const longitudeRange = (long) => (long > map.longStarts && long < map.longEnds)
                        data.map((postCode) => {
                            if (
                                latitudeRange(postCode.latitude) &&
                                longitudeRange(postCode.longitude)
                            ) {
                                postCodeArr.push(postCode)
                            }
                        })

                    }
                })
            })
            handleFilterAdd(postCodeArr)
        }
        getPostCodes()

    }


    const filterRegionsFromAreas = (areaSelectedArr) => {
        var newAvailableRegions = []
        areaSelectedArr.map((area) => {
            mapArr.map((map) => {
                if (map.area === area) {
                    newAvailableRegions.push(map.name)
                }
            })
        })
        setSelectionArr(newAvailableRegions)
        filterAddressesFromRegions(newAvailableRegions)
    }


    const handleAreaSelection = (selection) => {

        var newAreaSelectedArr = [...areaSelectedArr]
        var index = newAreaSelectedArr.indexOf(selection)

        if (index === -1) {
            newAreaSelectedArr.push(selection);
        } else {
            newAreaSelectedArr.splice(index, 1);
        }

        setAreaSelectedArr(newAreaSelectedArr)
        filterRegionsFromAreas(newAreaSelectedArr)
    }


    const findFrequencyOfRegionsInAddressSearch = (selectedRegions) => {
        setTimeout(() => {
            var filteredSelectionArr = []
            function search(arr, s) {
                if (!arr) return
                var counter = 0;
                for (var j = 0; j < arr.length; j++)
                    if (s === (arr[j]))
                        counter++;
                return counter;
            }
            function answerQueries(arr, q) {
                var searchedArr = []
                for (var i = 0; i < q.length; i++) {
                    searchedArr.push({ name: q[i], freq: search(arr, q[i]) })
                }
                searchedArr.map((obj) => {
                    if (obj.freq < 21) return
                    filteredSelectionArr.push(obj.name)
                })
            }
            var arr = selectedRegions;
            var q = []
            mapArr.map((map) => {
                q.push(map.name)
            })
            answerQueries(arr, q);
            setSelectionArr(filteredSelectionArr)
        }, 1000)
    }


    const handleAddressRemove = (e, idx) => {
        e.stopPropagation()
        var newAddressList = [...filter.addresses]
        newAddressList.splice(idx, 1)
        setFilter({ ...filter, addresses: newAddressList })
        getNotes()
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
     * Set areas by addresses
     */
    useEffect(() => {
        var selectedRegions = []
        async function getPostCodes() {
            const res = await fetch(`./postCodes.json?`);
            const data = await res.json()
            data.map((postCode) => {
                filter.addresses.map((address) => {
                    if (postCode.place_name === address) {
                        mapArr.map((map) => {
                            if (
                                postCode.latitude < map.latStarts &&
                                postCode.latitude > map.latEnds &&
                                postCode.longitude > map.longStarts &&
                                postCode.longitude < map.longEnds
                            ) {
                                selectedRegions.push(map.name)
                            }
                        })
                    }
                })
            })
        }
        getPostCodes()

        findFrequencyOfRegionsInAddressSearch(selectedRegions)
    }, [filter])


    return (
        <>
            <div
                style={{
                    border: filter.addresses.length && filter.addresses.length > 0 ? "rgba(173, 55, 112, 0.378) 4px solid" : "1px solid grey",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    zIndex: "15",
                    width: reveal === "LOCATION" && deviceSize === "MOBILE" && "100%"
                }}
            >

                <FilterHeader
                    headerTitle={'Location'}
                    headerSubTitle={`${filter.addresses.length} addresses in your filter`}
                    activeCondition={filter.addresses.length && filter.addresses.length > 0}
                    onClick={() => reveal === "LOCATION" ? setReveal("NONE") : setReveal("LOCATION")}
                    icon={
                        <g id="Location" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <path d="M8.5,14 C8.5,10.8243627 9.78718134,7.94936269 11.868272,5.86827202 C13.9493627,3.78718134 16.8243627,2.5 20,2.5 C23.1756373,2.5 26.0506373,3.78718134 28.131728,5.86827202 C30.2128187,7.94936269 31.5,10.8243627 31.5,14 C31.5,18.2947181 27.6325211,25.9965025 19.9995546,37.1176651 C12.3669984,25.9955456 8.5,18.2944513 8.5,14 Z" id="Oval" stroke="#979797"></path>
                            <circle id="Oval" stroke="#979797" cx="20" cy="13" r="6.5"></circle>
                        </g>
                    }
                />

                {reveal === "LOCATION" &&
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

                                <div style={{ height: "312px", margin: "-16px 0px 0px 16px" }}>
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


                                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", padding: "16px" }}>
                                    {areasArr.map((area) => {
                                        return (
                                            <div
                                                key={area}
                                                onClick={(e) => { e.stopPropagation(); handleAreaSelection(area) }}
                                                style={{
                                                    backgroundColor: areaSelectedArr.indexOf(area) === -1 ? "white" : "pink",
                                                    width: "49%",
                                                    padding: "16px 4px",
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


                            </>
                        )}

                        {view === "ADDRESS" && (
                            <div style={{ padding: "8px" }}>

                                <h4>Addresses in your filter</h4>

                                {filter.addresses.length === 0 ? (
                                    <div>Select from the map to add addresses</div>
                                ) : (
                                    <div>Remove addresses in your filter by tapping them.</div>
                                )}


                                <div style={{ height: "24px" }} />

                                <div style={{ display: "flex", flexWrap: "wrap", height: "400px", overflow: "scroll" }}>
                                    {filter.addresses.map((address, idx) => {
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
                                                onClick={(e) => handleAddressRemove(e, idx)}
                                            >
                                                {address}
                                            </div>
                                        )
                                    })}
                                </div>

                                <div style={{ height: "24px" }} />

                                <div
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setFilter({ ...filter, addresses: [] })
                                        getNotes()
                                    }}
                                    style={{ width: "100%", textAlign: "center", padding: "16px", backgroundColor: "black", color: "white", borderRadius: "8px" }}
                                >
                                    CLEAR ADDRESSES
                                </div>

                            </div>
                        )}
                    </>
                }
            </div>
        </>
    )

}

export default Location;