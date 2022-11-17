import Logo from './Logo'
import WelcomeTitle from './WelcomeTitle'

const WelcomeComp = ({ user, filter, setFilter, deviceSize }) => {

    const labelStyle = { padding: "8px 16px", backgroundColor: "black", color: "white", borderRadius: "24px", marginRight: "4px" }

    const locationCondition = (filter.addresses.length > 0)
    const rentCondition = ((filter.selectedRentVal[0] > filter.minRentVal || filter.selectedRentVal[1] < filter.maxRentVal) && filter.rent.length > 0)

    return (
        <div
            style={{ width: "100%", padding: "16px", backgroundColor: "white", border: "1px solid grey", borderRadius: "8px" }}
        >
            <Logo />

            <WelcomeTitle user={user} deviceSize={deviceSize} />

            <div>You are filtering by:</div>

            <div style={{ marginTop: "24px", display: "flex" }}>

                {locationCondition && (<div onClick={() => setFilter({ ...filter, addresses: [], selectedAreas: [] })} style={labelStyle}>Location</div>)}

                {rentCondition && (<div onClick={() => setFilter({ ...filter, rent: [], selectedRentVal: [] })} style={labelStyle}>Rent</div>)}

            </div>

        </div>
    )

}

export default WelcomeComp;