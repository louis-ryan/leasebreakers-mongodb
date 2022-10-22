
const FilterHeader = ({ headerTitle, headerSubTitle, activeCondition }) => {

    return (
        <div style={{ margin: "16px", display: "flex", justifyContent: "space-between" }}>
            <div>
                <h3 style={{
                    marginBottom: "4px",
                    color: activeCondition && "black"
                }}>
                    {headerTitle}
                </h3>
                <div style={{ fontSize: "12px" }}>
                    {headerSubTitle}
                </div>
            </div>
            <div style={{
                marginTop: "12px",
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