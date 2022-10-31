
const WelcomeComp = ({ user, filter, setFilter, deviceSize }) => {

    const labelStyle = { padding: "8px 16px", backgroundColor: "black", color: "white", borderRadius: "24px", marginRight: "4px" }

    return (
        <div
            style={{ width: "100%", padding: "16px", backgroundColor: "white", border: "1px solid grey", borderRadius: "8px" }}
        >
            <svg width="195px" height="82px" viewBox="0 0 195 82">
                <g id="LBM-Logo-Small" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <polygon id="Rectangle-Copy-3" fill="#6D556B" points="12 69 171.017241 69 173 71 13.9827586 71"></polygon>
                    <g id="Group-Copy-33" transform="translate(170.000000, 57.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="11" height="11"></rect>
                        <path d="M12.7545011,1.5 L2.29027502,1.5 L1.2454989,0.5 L11.709725,0.5 L12.7545011,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.29027502 L1.5,12.7545011 L0.5,11.709725 L0.5,1.2454989 L1.5,2.29027502 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-34" transform="translate(170.000000, 46.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="11" height="10"></rect>
                        <path d="M12.7545011,1.5 L2.29027502,1.5 L1.2454989,0.5 L11.709725,0.5 L12.7545011,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.15185678 L1.5,11.8182925 L0.5,10.8481432 L0.5,1.18170752 L1.5,2.15185678 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-35" transform="translate(170.000000, 35.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="11" height="9"></rect>
                        <path d="M12.7545011,1.5 L2.29027502,1.5 L1.2454989,0.5 L11.709725,0.5 L12.7545011,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.01446917 L1.5,10.8810532 L0.5,9.98553083 L0.5,1.11894678 L1.5,2.01446917 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-36" transform="translate(170.000000, 23.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="11" height="10"></rect>
                        <path d="M12.7545011,1.5 L2.29027502,1.5 L1.2454989,0.5 L11.709725,0.5 L12.7545011,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.15185678 L1.5,11.8182925 L0.5,10.8481432 L0.5,1.18170752 L1.5,2.15185678 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-37" transform="translate(170.000000, 11.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="11" height="11"></rect>
                        <path d="M12.7545011,1.5 L2.29027502,1.5 L1.2454989,0.5 L11.709725,0.5 L12.7545011,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.29027502 L1.5,12.7545011 L0.5,11.709725 L0.5,1.2454989 L1.5,2.29027502 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-32" transform="translate(159.000000, 25.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="10" height="10"></rect>
                        <path d="M11.8182925,1.5 L2.15185678,1.5 L1.18170752,0.5 L10.8481432,0.5 L11.8182925,1.5 Z" id="Rectangle-Copy-2" fill="#6D556B"></path>
                        <path d="M1.5,2.15185678 L1.5,11.8182925 L0.5,10.8481432 L0.5,1.18170752 L1.5,2.15185678 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-31" transform="translate(148.000000, 31.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="9" height="10"></rect>
                        <path d="M10.8810532,1.5 L2.01446917,1.5 L1.11894678,0.5 L9.98553083,0.5 L10.8810532,1.5 Z" id="Rectangle-Copy-2" fill="#6D556B"></path>
                        <path d="M1.5,2.15185678 L1.5,11.8182925 L0.5,10.8481432 L0.5,1.18170752 L1.5,2.15185678 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-30" transform="translate(136.000000, 25.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="10" height="10"></rect>
                        <path d="M11.8182925,1.5 L2.15185678,1.5 L1.18170752,0.5 L10.8481432,0.5 L11.8182925,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.15185678 L1.5,11.8182925 L0.5,10.8481432 L0.5,1.18170752 L1.5,2.15185678 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-25" transform="translate(124.000000, 57.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="11" height="11"></rect>
                        <path d="M12.7545011,1.5 L2.29027502,1.5 L1.2454989,0.5 L11.709725,0.5 L12.7545011,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.29027502 L1.5,12.7545011 L0.5,11.709725 L0.5,1.2454989 L1.5,2.29027502 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-26" transform="translate(124.000000, 46.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="11" height="10"></rect>
                        <path d="M12.7545011,1.5 L2.29027502,1.5 L1.2454989,0.5 L11.709725,0.5 L12.7545011,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.15185678 L1.5,11.8182925 L0.5,10.8481432 L0.5,1.18170752 L1.5,2.15185678 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-27" transform="translate(124.000000, 35.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="11" height="9"></rect>
                        <path d="M12.7545011,1.5 L2.29027502,1.5 L1.2454989,0.5 L11.709725,0.5 L12.7545011,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.01446917 L1.5,10.8810532 L0.5,9.98553083 L0.5,1.11894678 L1.5,2.01446917 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-28" transform="translate(124.000000, 23.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="11" height="10"></rect>
                        <path d="M12.7545011,1.5 L2.29027502,1.5 L1.2454989,0.5 L11.709725,0.5 L12.7545011,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.15185678 L1.5,11.8182925 L0.5,10.8481432 L0.5,1.18170752 L1.5,2.15185678 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-29" transform="translate(124.000000, 11.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="11" height="11"></rect>
                        <path d="M12.7545011,1.5 L2.29027502,1.5 L1.2454989,0.5 L11.709725,0.5 L12.7545011,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.29027502 L1.5,12.7545011 L0.5,11.709725 L0.5,1.2454989 L1.5,2.29027502 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-23" transform="translate(100.000000, 54.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="11" height="10"></rect>
                        <path d="M12.7545011,1.5 L2.29027502,1.5 L1.2454989,0.5 L11.709725,0.5 L12.7545011,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.15185678 L1.5,11.8182925 L0.5,10.8481432 L0.5,1.18170752 L1.5,2.15185678 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-24" transform="translate(100.000000, 42.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="11" height="11"></rect>
                        <path d="M12.7545011,1.5 L2.29027502,1.5 L1.2454989,0.5 L11.709725,0.5 L12.7545011,1.5 Z" id="Rectangle-Copy-2" fill="#6D556B"></path>
                        <path d="M1.5,2.29027502 L1.5,12.7545011 L0.5,11.709725 L0.5,1.2454989 L1.5,2.29027502 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-21" transform="translate(100.000000, 26.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="11" height="11"></rect>
                        <path d="M12.7545011,1.5 L2.29027502,1.5 L1.2454989,0.5 L11.709725,0.5 L12.7545011,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.29027502 L1.5,12.7545011 L0.5,11.709725 L0.5,1.2454989 L1.5,2.29027502 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-22" transform="translate(100.000000, 15.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="11" height="10"></rect>
                        <path d="M12.7545011,1.5 L2.29027502,1.5 L1.2454989,0.5 L11.709725,0.5 L12.7545011,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.15185678 L1.5,11.8182925 L0.5,10.8481432 L0.5,1.18170752 L1.5,2.15185678 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-20" transform="translate(89.000000, 34.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="10" height="10"></rect>
                        <path d="M11.8182925,1.5 L2.15185678,1.5 L1.18170752,0.5 L10.8481432,0.5 L11.8182925,1.5 Z" id="Rectangle-Copy-2" fill="#6D556B"></path>
                        <path d="M1.5,2.15185678 L1.5,11.8182925 L0.5,10.8481432 L0.5,1.18170752 L1.5,2.15185678 Z" id="Rectangle-Copy" fill="#D8D8D8"></path>
                    </g>
                    <g id="Group-Copy-19" transform="translate(89.000000, 57.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="10" height="11"></rect>
                        <path d="M11.8182925,1.5 L2.15185678,1.5 L1.18170752,0.5 L10.8481432,0.5 L11.8182925,1.5 Z" id="Rectangle-Copy-2" fill="#6D556B"></path>
                        <path d="M1.5,2.29027502 L1.5,12.7545011 L0.5,11.709725 L0.5,1.2454989 L1.5,2.29027502 Z" id="Rectangle-Copy" fill="#D8D8D8"></path>
                    </g>
                    <g id="Group-Copy-13" transform="translate(78.000000, 57.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="9" height="11"></rect>
                        <path d="M10.8810532,1.5 L2.01446917,1.5 L1.11894678,0.5 L9.98553083,0.5 L10.8810532,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.29027502 L1.5,12.7545011 L0.5,11.709725 L0.5,1.2454989 L1.5,2.29027502 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-18" transform="translate(89.000000, 12.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="10" height="11"></rect>
                        <path d="M11.8182925,1.5 L2.15185678,1.5 L1.18170752,0.5 L10.8481432,0.5 L11.8182925,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.29027502 L1.5,12.7545011 L0.5,11.709725 L0.5,1.2454989 L1.5,2.29027502 Z" id="Rectangle-Copy" fill="#D8D8D8"></path>
                    </g>
                    <g id="Group-Copy-14" transform="translate(78.000000, 46.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="9" height="10"></rect>
                        <path d="M10.8810532,1.5 L2.01446917,1.5 L1.11894678,0.5 L9.98553083,0.5 L10.8810532,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.15185678 L1.5,11.8182925 L0.5,10.8481432 L0.5,1.18170752 L1.5,2.15185678 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-15" transform="translate(78.000000, 35.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="9" height="9"></rect>
                        <path d="M10.8810532,1.5 L2.01446917,1.5 L1.11894678,0.5 L9.98553083,0.5 L10.8810532,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.01446917 L1.5,10.8810532 L0.5,9.98553083 L0.5,1.11894678 L1.5,2.01446917 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-16" transform="translate(78.000000, 23.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="9" height="10"></rect>
                        <path d="M10.8810532,1.5 L2.01446917,1.5 L1.11894678,0.5 L9.98553083,0.5 L10.8810532,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.15185678 L1.5,11.8182925 L0.5,10.8481432 L0.5,1.18170752 L1.5,2.15185678 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-17" transform="translate(78.000000, 11.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="9" height="11"></rect>
                        <path d="M10.8810532,1.5 L2.01446917,1.5 L1.11894678,0.5 L9.98553083,0.5 L10.8810532,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.29027502 L1.5,12.7545011 L0.5,11.709725 L0.5,1.2454989 L1.5,2.29027502 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-6" transform="translate(54.000000, 57.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="10" height="11"></rect>
                        <path d="M11.8182925,1.5 L2.15185678,1.5 L1.18170752,0.5 L10.8481432,0.5 L11.8182925,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.29027502 L1.5,12.7545011 L0.5,11.709725 L0.5,1.2454989 L1.5,2.29027502 Z" id="Rectangle-Copy" fill="#D8D8D8"></path>
                    </g>
                    <g id="Group-Copy-5" transform="translate(42.000000, 57.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="11" height="11"></rect>
                        <path d="M12.7545011,1.5 L2.29027502,1.5 L1.2454989,0.5 L11.709725,0.5 L12.7545011,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.29027502 L1.5,12.7545011 L0.5,11.709725 L0.5,1.2454989 L1.5,2.29027502 Z" id="Rectangle-Copy" fill="#D8D8D8"></path>
                    </g>
                    <g id="Group-Copy-4" transform="translate(30.000000, 57.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="11" height="11"></rect>
                        <path d="M12.7545011,1.5 L2.29027502,1.5 L1.2454989,0.5 L11.709725,0.5 L12.7545011,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.29027502 L1.5,12.7545011 L0.5,11.709725 L0.5,1.2454989 L1.5,2.29027502 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-3" transform="translate(30.000000, 46.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="11" height="10"></rect>
                        <path d="M12.7545011,1.5 L2.29027502,1.5 L1.2454989,0.5 L11.709725,0.5 L12.7545011,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.15185678 L1.5,11.8182925 L0.5,10.8481432 L0.5,1.18170752 L1.5,2.15185678 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy-2" transform="translate(30.000000, 35.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="11" height="9"></rect>
                        <path d="M12.7545011,1.5 L2.29027502,1.5 L1.2454989,0.5 L11.709725,0.5 L12.7545011,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.01446917 L1.5,10.8810532 L0.5,9.98553083 L0.5,1.11894678 L1.5,2.01446917 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Group-Copy" transform="translate(30.000000, 23.000000)" stroke="#979797">
                        <rect id="Rectangle" fill="#EFE4EE" x="2.5" y="2.5" width="11" height="10"></rect>
                        <path d="M12.7545011,1.5 L2.29027502,1.5 L1.2454989,0.5 L11.709725,0.5 L12.7545011,1.5 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                        <path d="M1.5,2.15185678 L1.5,11.8182925 L0.5,10.8481432 L0.5,1.18170752 L1.5,2.15185678 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                    </g>
                    <g id="Box" transform="translate(30.000000, 11.000000)" stroke="#979797">
                        <g id="Group">
                            <rect id="Rectangle" fill="#EFE4EE" x="2.58955224" y="2.58955224" width="10.9104478" height="10.9104478"></rect>
                            <path d="M12.7928932,1.58955224 L2.29665902,1.58955224 L1.20710678,0.5 L11.703341,0.5 L12.7928932,1.58955224 Z" id="Rectangle-Copy-2" fill="#FFFFFF"></path>
                            <path d="M1.58955224,2.29665902 L1.58955224,12.7928932 L0.5,11.703341 L0.5,1.20710678 L1.58955224,2.29665902 Z" id="Rectangle-Copy" fill="#6D556B"></path>
                        </g>
                    </g>
                </g>
            </svg>

         

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
                {(filter.selectedRentVal[0] > filter.minRentVal || filter.selectedRentVal[1] < filter.maxRentVal)  &&  (
                    <div onClick={() => setFilter({ ...filter, rent: [] })} style={labelStyle}>Rent</div>
                )}
            </div>

        </div>
    )

}

export default WelcomeComp;