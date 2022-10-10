import { useEffect, useState } from "react";
import mapArr from '../MapArr';


const Location = (props) => {

    const [reveal, setReveal] = useState(false)

    const [selectionArr, setSelectionArr] = useState([])
    const [postCodes, setPostCodes] = useState([])
    const [addressesArr, setAddressesArr] = useState([])


    /**
     * Set filter
     */
    useEffect(() => {
        props.setFilter({ ...props.filter, addresses: addressesArr })
    }, [addressesArr])


    /**
    * Build array of selected regions
    */
    const handleSelection = (selection) => {

        var newSelectionArr = [...selectionArr]
        var index = newSelectionArr.indexOf(selection)

        if (index === -1) {
            newSelectionArr.push(selection);
        } else {
            newSelectionArr.splice(index, 1);
        }

        setSelectionArr(newSelectionArr)

    }


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


    return (
        <>
            <div
                onClick={() => reveal ? setReveal(false) : setReveal(true)}
                style={{ border: "1px solid grey", backgroundColor: "white" }}
            >

                <div style={{ margin: "16px", display: "flex", justifyContent: "space-between" }}>
                    <h3>Location</h3>
                    <div style={{ marginTop: "8px" }}>
                        <svg width="40px" height="40px">
                            <g id="Tick" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <circle id="Oval" fill="black" cx="20" cy="20" r="20"></circle>
                                <polyline id="Line-11" stroke="#FFFFFF" stroke-linecap="round" points="30.5 11 17.5 29 10 23"></polyline>
                            </g>
                        </svg>
                    </div>
                </div>

                {reveal &&
                    <>
                        <div style={{ height: "400px", margin: "16px" }}>
                            {mapArr.map((map, idx) => {
                                return (
                                    <div key={idx}>
                                        <svg width="1600px" height="1600px" style={{ position: "absolute", zoom: "0.2345" }}>
                                            <g id={map.name} stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" style={{ cursor: "pointer" }}>
                                                <path d={map.path} id="Rectangle" stroke="#979797" strokeWidth="4" fill={selectionArr.indexOf(map.name) === -1 ? "white" : "pink"}></path>
                                            </g>
                                        </svg>
                                    </div>
                                )
                            })}
                        </div>


                        <div style={{ padding: "8px" }}>

                            <h4>Select Regions</h4>

                            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                                {mapArr.map((map, idx) => {
                                    return (
                                        <div
                                            key={idx}
                                            onClick={(e) => { e.stopPropagation(); handleSelection(map.name) }}
                                            style={{
                                                backgroundColor: selectionArr.indexOf(map.name) === -1 ? "white" : "pink",
                                                width: "33%",
                                                padding: "8px",
                                                border: "1px solid grey",
                                                textAlign: "center",
                                                marginTop: "2px",
                                            }}
                                        >
                                            {map.name}
                                        </div>
                                    )
                                })}
                            </div>

                            <div style={{ height: "40px" }} />

                            <h4>Addresses in your filter</h4>

                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                {addressesArr.map((address, idx) => {
                                    return (
                                        <div
                                            key={address}
                                            style={{
                                                padding: "4px 8px",
                                                backgroundColor: "black",
                                                color: "white",
                                                margin: "2px 2px 0px 0px"
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
                    </>
                }
            </div>
        </>
    )
}

export default Location;