import Logo from './Logo'

const WelcomeComp = ({ user, filter, setFilter, deviceSize }) => {

    const labelStyle = { padding: "8px 16px", backgroundColor: "black", color: "white", borderRadius: "24px", marginRight: "4px" }

    return (
        <div
            style={{ width: "100%", padding: "16px", backgroundColor: "white", border: "1px solid grey", borderRadius: "8px" }}
        >
            <Logo />

            <div style={{ overflow: "hidden", width: "calc(100% - 8px)" }}>
                <h2 style={{ fontStyle: "italic", fontSize: "32px", color: "rgb(209 194 206)" }}> Welcome {" "} <span> {user && user.given_name} </span></h2>
                <h2 style={{ fontStyle: "italic", fontSize: "32px", position: "absolute", top: deviceSize === "MOBILE" ? "101px" : "172px", left: deviceSize === "MOBILE" ? "19px" : "calc((50% - 600px) + 19px)", color: "rgb(209 194 206)", }}> Welcome {" "} <span> {user && user.given_name} </span></h2>
                <h2 style={{ fontStyle: "italic", fontSize: "32px", position: "absolute", top: deviceSize === "MOBILE" ? "99px" : "170px", left: deviceSize === "MOBILE" ? "21px" : "calc((50% - 600px) + 21px)", color: "rgba(173, 55, 112, 0.378)", }}> Welcome {" "} <span> {user && user.given_name} </span></h2>
                <h2 style={{ fontStyle: "italic", fontSize: "32px", position: "absolute", top: deviceSize === "MOBILE" ? "97px" : "168px", left: deviceSize === "MOBILE" ? "23px" : "calc((50% - 600px) + 23px)", color: "rgba(173, 55, 112, 0.378)", }}> Welcome {" "} <span> {user && user.given_name} </span> </h2>
                <h2 style={{ fontStyle: "italic", fontSize: "32px", position: "absolute", top: deviceSize === "MOBILE" ? "96px" : "167px", left: deviceSize === "MOBILE" ? "25px" : "calc((50% - 600px) + 25px)", color: "black", }}> Welcome {" "} <span> {user && user.given_name} </span>  </h2>
            </div>

            <div>You are filtering by:</div>

            <div style={{ marginTop: "24px", display: "flex" }}>
                {filter.addresses.length > 0 && (
                    <div onClick={() => setFilter({ ...filter, addresses: [] })} style={labelStyle}>Location</div>
                )}
                {(filter.selectedRentVal[0] > filter.minRentVal || filter.selectedRentVal[1] < filter.maxRentVal) && (
                    <div onClick={() => setFilter({ ...filter, rent: [] })} style={labelStyle}>Rent</div>
                )}
            </div>

        </div>
    )

}

export default WelcomeComp;