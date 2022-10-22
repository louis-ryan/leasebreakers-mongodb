import { useEffect, useState } from "react";


const MapFilter = ({ filter, setFilter }) => {

    const [reveal, setReveal] = useState(false)


    /**
     * Set filter
     */
    useEffect(() => {
        setFilter && setFilter({ ...filter })
    }, [])


    return (
        <>
            <div
                onClick={() => reveal ? setReveal(false) : setReveal(true)}
                style={{ border: "1px solid grey", backgroundColor: "white" }}
            >

                <div style={{ margin: "16px", display: "flex", justifyContent: "space-between" }}>
                    <h3>Rent</h3>
                    <div style={{ marginTop: "8px" }}>
                        <svg width="40px" height="40px">
                            <g id="Tick" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <circle id="Oval" fill="black" cx="20" cy="20" r="20"></circle>
                                <polyline id="Line-11" stroke="#FFFFFF" strokeLinecap="round" points="30.5 11 17.5 29 10 23"></polyline>
                            </g>
                        </svg>
                    </div>
                </div>

                {reveal &&
                    <>

                    </>
                }
            </div>
        </>
    )
}

export default MapFilter;