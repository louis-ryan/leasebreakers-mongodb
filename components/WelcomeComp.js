import Link from 'next/link';


const WelcomeComp = ({ user, filter, deviceSize }) => {


    return (
        <div
            style={{ width: "100%", padding: "16px", backgroundColor: "white", border: "1px solid grey", borderRadius: "8px" }}
        >
            {deviceSize === "MOBILE" && (<div style={{ height: "60px" }} />)}

            {user && (
                <h2 style={{ overflow: "hidden", width: "calc(100% - 8px)" }}>
                    Welcome {" "}
                    <span style={{ fontFamily: "monospace", textDecoration: "underline", textDecorationColor: "grey", textDecorationStyle: "dotted", fontWeight: "800", fontSize: "32px", color: "black", letterSpacing: "4px" }}>
                        {user.given_name}
                    </span>
                </h2>
            )}

            <div>You are filtering by:</div>

            {filter.addresses && (
                <div>{filter.addresses.length} addresses</div>
            )}
            {deviceSize === "MOBILE" && (
                filter ? (
                    <div>
                        <Link href="/filter">
                            <div className="button secondary">
                                EDIT FILTERS
                            </div>
                        </Link>
                    </div>
                ) : (

                    <Link href="/filter">
                        <div className="button secondary">
                            FILTER SEARCH
                        </div>
                    </Link>
                )
            )}

        </div>
    )
}

export default WelcomeComp;