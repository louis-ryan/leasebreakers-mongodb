
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
                <svg width="52px" height="40px" viewBox="0 0 52 62" style={{transform: "translateX(18px)"}}>
                    <g id="Tick-Styled" stroke="none" strokeWidth="4" fill="none" fillRule="evenodd">
                        <path d="M20,51 L40.3940137,51.7032419 C45.5376857,51.8806099 49.99548,55.3182667 51.4743818,60.2479392 L52,62 L52,62 L52,2.13162821e-13 L51.4116158,2.15740887 C49.9877789,7.37814405 45.2458626,11 39.8344499,11 L20,11 L20,11 C8.954305,11 0,19.954305 0,31 C0,42.045695 8.954305,51 20,51 Z" id="Oval" fill="#50554A"></path>
                        <polyline id="Line-11" stroke="#FFFFFF" strokeLinecap="round" points="33 22 19.6829268 40 12 34"></polyline>
                    </g>
                </svg>
            </div>
        </div>
    )

}

export default FilterHeader;