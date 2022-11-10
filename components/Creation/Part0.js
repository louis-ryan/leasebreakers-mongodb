import PostCode from "./PostCode"
import mapPath from "./MapPath"
import { useEffect } from "react"


const Part1 = (props) => {


    const handleNextButton = {
        opacity: props.form.postCode && props.form.address ? "1" : "0.5",
        pointerEvents: props.form.postCode && props.form.address ? "inherit" : "none",
    }


    /**
     * If only one option in addresses list, select by default
     */
    useEffect(() => {
        if (props.validAddresses.length === 1) {
            props.handleAddress(props.validAddresses[0])
        }
    }, [props.validAddresses])


    return (
        <>
            <h2>Location</h2>

            <PostCode
                handlePost={props.handlePost}
                errors={props.errors}
                post={props.post}
            />

            <div style={{ height: "8px" }} />

            <div
                className="button secondary"
                onClick={() => props.handleClearPost()}
            >
                CLEAR
            </div>


            <div style={{ height: "24px" }} />

            <div style={{
                transform: "scale(0.22) translateY(-600px) translateX(-600px)",
                height: "320px"
            }}>

                <svg width="1600px" height="1600px">
                    <g id="Artboard-Copy-8" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.607136805">
                        <path d={mapPath} id="Rectangle" stroke="#979797" strokeWidth="4" fill="#D8D8D8"></path>
                    </g>
                </svg>

                {props.postCode > 2999 && !props.errors.address &&
                    <div style={{ position: "absolute", width: "1600px", height: "1600px", zIndex: "20", marginTop: "-1600px" }}>
                        <div style={{ width: "240px", height: "240px", backgroundColor: "grey", marginLeft: `${props.longInPx - 120}px`, marginTop: `${props.latInPx - 120}px`, borderRadius: "50%", border: "1px solid grey", opacity: "0.2" }}></div>
                    </div>
                }

            </div>

            {props.validAddresses && props.postCode > 2999 && (
                <>

                    <div style={{ height: "24px" }} />

                    Address

                    <div style={{ borderRadius: "4px", overflow: "hidden", marginTop: "4px", border: "grey 1px solid" }}>
                        {props.validAddresses.map((address) => {
                            return (
                                <div
                                    key={address}
                                    style={{ width: "100%", height: "40px", backgroundColor: props.form.address === address ? "black" : "white", paddingLeft: "16px", paddingTop: "8px", color: props.form.address === address && "white" }}
                                    onClick={() => props.handleAddress(address)}>
                                    {address}
                                </div>
                            )
                        })}
                    </div>
                </>
            )}

            {/* {props.form.address && (<div>{props.form.address}</div>)} */}

            <div style={{ height: "24px" }} />

            <div
                className="button primary"
                onClick={() => props.setPart(1)}
                style={handleNextButton}
            >
                NEXT
            </div>

        </>
    )
}


export default Part1;