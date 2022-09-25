import { useEffect, useState } from "react";

import mapArr from "../components/mapArr.js"

const Map = () => {

    const [selectionArr, setSelectionArr] = useState([])
    const [postCodes, setPostCodes] = useState([])


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


    return (
        <>
            <div style={{ height: "400px" }}>

                {mapArr.map((map, idx) => {
                    return (
                        <svg key={idx} width="1600px" height="1600px" style={{ position: "absolute", zoom: "0.25" }}>
                            <g id={map.name} stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" style={{ cursor: "pointer" }}>
                                <path d={map.path} id="Rectangle" stroke="#979797" strokeWidth="4" fill={selectionArr.indexOf(map.name) === -1 ? "white" : "pink"}></path>
                            </g>
                        </svg>
                    )
                })}
            </div>

            <div style={{ padding: "40px" }}>

                {mapArr.map((map, idx) => {
                    return (
                        <div
                            key={idx}
                            onClick={() => handleSelection(map.name)}
                            style={{ color: selectionArr.indexOf(map.name) === -1 ? "black" : "pink" }}
                        >
                            {map.name}
                        </div>
                    )
                })}

                <div style={{ height: "40px" }} />

                {selectionArr.map((selection, selIdx) => {
                    return (
                        <div key={selIdx}>
                            {mapArr.map((map, mapIdx) => {
                                let key = `${selIdx} - ${mapIdx}`
                                if (map.name === selection) {
                                    return (
                                        <>
                                            <h4 key={key}>{map.name}</h4>
                                            <div>long starts: {map.longStarts}</div>
                                            <div>long ends: {map.longEnds}</div>
                                            <div>lat starts: {map.latStarts}</div>
                                            <div>lat ends: {map.latEnds}</div>
                                        </>
                                    )
                                }
                            })}
                        </div>
                    )

                })}

                <div style={{ height: "40px" }} />

                {postCodes.map((code, idx) => {
                    return (
                        <div key={idx}>
                            <div>{code.postcode} - {code.place_name}</div>
                            <div>long: {code.longitude}</div>
                            <div>lat: {code.latitude}</div>
                            <div style={{ height: "24px" }} />
                        </div>
                    )
                })}

            </div>

        </>
    )
}

export default Map;