

const NavbarDropdown = ({ setUserOptions }) => {

    return (

        <div
            onClick={() => setUserOptions(false)}
            styled={{ position: "absolute", width: "100%", height: "100vh", zIndex: "9", top: "0px" }}
        >
            <div style={{ position: "absolute", width: "100%", backgroundColor: "#3B4657", zIndex: "10", top: "48px", padding: "16px", display: "flex", justifyContent: "center" }}>
                <div style={{ outline: "1px grey solid", width: "calc(100% - 32px)", padding: "16px", maxWidth: "600px", borderRadius: "8px" }}>
                    <a href="/api/auth/logout">Sign Out</a>
                </div>
            </div>
        </div>
    )

}

export default NavbarDropdown;