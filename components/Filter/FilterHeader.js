
const FilterHeader = ({ headerTitle, headerSubTitle, activeCondition, onClick, icon }) => {

    return (
        <div
            className="filter-header"
            onClick={() => onClick()}
        >
            <div style={{ display: "flex" }}>
                <div style={{ marginRight: "8px" }}>
                    <svg width="40px" height="40px" viewBox="0 0 40 40" style={{ marginTop: "20px", filter: activeCondition && "brightness(0)" }}>
                        {icon}
                    </svg>
                </div>
                <div>
                    <h3 style={{
                        color: activeCondition ? "black" : "grey",
                        marginBottom: "8px"
                    }}>
                        {headerTitle}
                    </h3>
                    <div style={{ fontSize: "12px" }}>
                        {headerSubTitle}
                    </div>
                </div>
            </div>
            <div style={{
                marginTop: "18px",
                opacity: activeCondition ? "1" : "0"
            }}>
                <svg width="40px" height="40px">
                    <g id="Tick" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <circle id="Oval" fill="black" cx="20" cy="20" r="20"></circle>
                        <polyline id="Line-11" stroke="#FFFFFF" strokeLinecap="round" points="30.5 11 17.5 29 10 23"></polyline>
                    </g>
                </svg>
            </div>
        </div>
    )

}

export default FilterHeader;