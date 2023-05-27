import InputHeader from "./InputHeader"

const Part1 = (props) => {

    const handleNextButton = {
        opacity: props.form.numRoom && props.form.numBath ? "1" : "0.5",
        pointerEvents: props.form.numRoom && props.form.numBath ? "inherit" : "none",
    }


    return (
        <>
            <div style={{ height: "16px" }} />

            <InputHeader header={'Part 2: Property'} />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "48%" }}>
                    <div>Living/Bedrooms</div>
                    <input
                        control='input'
                        name='numRoom'
                        type='number'
                        onChange={props.handleChange}
                        value={props.form.numRoom}
                        style={{ textAlign: "center", fontSize: "24px", width: "100%", height: "60px" }}
                    />
                </div>

                <div style={{ width: "16px" }} />

                <div style={{ width: "48%" }}>
                    <div>Bathrooms</div>
                    <input
                        control='input'
                        name='numBath'
                        type='number'
                        onChange={props.handleChange}
                        value={props.form.numBath}
                        style={{ textAlign: "center", fontSize: "24px", width: "100%", height: "60px" }}
                    />
                </div>
            </div>

            <div style={{ height: "24px" }} />

            <div style={{ marginBottom: "16px" }}>Does the property have...</div>

            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>

                <div
                    className="form-bool"
                    style={{ width: "48%", border: props.formBools.petsAllowed && "4px solid pink", display: "flex", justifyContent: "center" }}
                    onClick={() => props.setFormBools({ ...props.formBools, petsAllowed: props.formBools.petsAllowed === false ? true : false })}
                >
                    <svg width="40px" height="40px" viewBox="0 0 40 40" style={{ marginTop: "16px" }}>
                        <g id="Pets" stroke="none" strokeWidth={props.formBools.petsAllowed ? '2' : '1'} fill="none" fillRule="evenodd">
                            <path d="M6.5,31.5 C6.5,29.4872195 8.58539631,25.4394069 11.7467479,22.3909607 C14.0241738,20.1948715 16.8829115,18.5 20,18.5 C23.1170885,18.5 25.9758262,20.1948715 28.2532521,22.3909607 C31.4146037,25.4394069 33.5,29.4872195 33.5,31.5 C33.5,32.2659799 33.1583974,32.9896522 32.5667089,33.6528669 C31.8956791,34.405014 30.9086341,35.0764027 29.6889393,35.6426896 C27.2093235,36.7939398 23.782767,37.5 20,37.5 C16.217233,37.5 12.7906765,36.7939398 10.3110607,35.6426896 C9.09136594,35.0764027 8.10432088,34.405014 7.43329111,33.6528669 C6.84160264,32.9896522 6.5,32.2659799 6.5,31.5 Z M10.5,10.5 C10.5,9.3954305 10.9477153,8.3954305 11.6715729,7.67157288 C12.3954305,6.94771525 13.3954305,6.5 14.5,6.5 C15.6045695,6.5 16.6045695,6.94771525 17.3284271,7.67157288 C18.0522847,8.3954305 18.5,9.3954305 18.5,10.5 C18.5,11.6045695 18.0522847,12.6045695 17.3284271,13.3284271 C16.6045695,14.0522847 15.6045695,14.5 14.5,14.5 C13.3954305,14.5 12.3954305,14.0522847 11.6715729,13.3284271 C10.9477153,12.6045695 10.5,11.6045695 10.5,10.5 Z M21.5,10.5 C21.5,9.3954305 21.9477153,8.3954305 22.6715729,7.67157288 C23.3954305,6.94771525 24.3954305,6.5 25.5,6.5 C26.6045695,6.5 27.6045695,6.94771525 28.3284271,7.67157288 C29.0522847,8.3954305 29.5,9.3954305 29.5,10.5 C29.5,11.6045695 29.0522847,12.6045695 28.3284271,13.3284271 C27.6045695,14.0522847 26.6045695,14.5 25.5,14.5 C24.3954305,14.5 23.3954305,14.0522847 22.6715729,13.3284271 C21.9477153,12.6045695 21.5,11.6045695 21.5,10.5 Z M28.5,17.5 C28.5,16.3954305 28.9477153,15.3954305 29.6715729,14.6715729 C30.3954305,13.9477153 31.3954305,13.5 32.5,13.5 C33.6045695,13.5 34.6045695,13.9477153 35.3284271,14.6715729 C36.0522847,15.3954305 36.5,16.3954305 36.5,17.5 C36.5,18.6045695 36.0522847,19.6045695 35.3284271,20.3284271 C34.6045695,21.0522847 33.6045695,21.5 32.5,21.5 C31.3954305,21.5 30.3954305,21.0522847 29.6715729,20.3284271 C28.9477153,19.6045695 28.5,18.6045695 28.5,17.5 Z M2.5,17.5 C2.5,16.3954305 2.94771525,15.3954305 3.67157288,14.6715729 C4.3954305,13.9477153 5.3954305,13.5 6.5,13.5 C7.6045695,13.5 8.6045695,13.9477153 9.32842712,14.6715729 C10.0522847,15.3954305 10.5,16.3954305 10.5,17.5 C10.5,18.6045695 10.0522847,19.6045695 9.32842712,20.3284271 C8.6045695,21.0522847 7.6045695,21.5 6.5,21.5 C5.3954305,21.5 4.3954305,21.0522847 3.67157288,20.3284271 C2.94771525,19.6045695 2.5,18.6045695 2.5,17.5 Z" id="Combined-Shape" stroke={props.formBools.petsAllowed ? "black" : "#979797"}></path>
                        </g>
                    </svg>
                    <div style={{ width: "4px" }} />
                    <p style={{ color: "grey", transform: "translateY(8px)" }}>Pets Allowed</p>
                </div>

                <div
                    className="form-bool"
                    style={{ width: "48%", border: props.formBools.parkingSpace && "4px solid pink", display: "flex", justifyContent: "center" }}
                    onClick={() => props.setFormBools({ ...props.formBools, parkingSpace: props.formBools.parkingSpace === false ? true : false })}
                >
                    <svg width="40px" height="40px" viewBox="0 0 40 40" style={{ marginTop: "16px" }}>
                        <g id="Parking" stroke="none" strokeWidth={props.formBools.parkingSpace ? '2' : '1'} fill="none" fillRule="evenodd"><ellipse id="Oval" stroke={props.formBools.parkingSpace ? "black" : "#979797"} cx="20.5" cy="19.5" rx="17" ry="16.5"></ellipse> <line x1="17.5" y1="10.4347826" x2="17.5" y2="29.5652174" id="Line-5" stroke={props.formBools.parkingSpace ? "black" : "#979797"} strokeLinecap="round"></line> <path d="M17.5,10.0255102 C23.1666667,10.0085034 26,11.6666667 26,15 C26,18.3333333 23.1666667,19.9914966 17.5,19.9744898" id="Line" stroke={props.formBools.parkingSpace ? "black" : "#979797"} strokeLinecap="square"></path> </g>
                    </svg>
                    <div style={{ width: "4px" }} />
                    <p style={{ color: "grey", transform: "translateY(8px)" }}>Parking</p>
                </div>

                <div style={{ width: "100%", height: "16px" }} />

                <div
                    className="form-bool"
                    style={{ width: "48%", border: props.formBools.outdoorArea && "4px solid pink", display: "flex", justifyContent: "center" }}
                    onClick={() => props.setFormBools({ ...props.formBools, outdoorArea: props.formBools.outdoorArea === false ? true : false })}
                >
                    <svg width="40px" height="40px" viewBox="0 0 40 40" style={{ marginTop: "16px" }}>
                        <g id="Outdoor" stroke="none" strokeWidth={props.formBools.outdoorArea ? '2' : '1'} fill="none" fillRule="evenodd"><path d="M29.5,31.5 L10.5,31.5 L10.5,7.15679952 C11.8325195,5.32443495 15.0498054,4.5 20,4.5 C24.9501946,4.5 28.1674805,5.32443495 29.5,7.15679952 L29.5,31.5 Z" id="Rectangle" stroke={props.formBools.outdoorArea ? "black" : "#979797"}></path><rect id="Rectangle" stroke={props.formBools.outdoorArea ? "black" : "#979797"} x="6.5" y="18.5" width="28" height="19" rx="2"></rect><line x1="13" y1="19.09375" x2="13" y2="36.90625" id="Line-2-Copy" stroke={props.formBools.outdoorArea ? "black" : "#979797"} strokeLinecap="square"></line><line x1="27" y1="19.09375" x2="27" y2="36.90625" id="Line-2-Copy-2" stroke={props.formBools.outdoorArea ? "black" : "#979797"} strokeLinecap="square"></line><line x1="20" y1="19.09375" x2="20" y2="36.90625" id="Line-2" stroke={props.formBools.outdoorArea ? "black" : "#979797"} strokeLinecap="square"></line><line x1="10.5" y1="31.5" x2="7.5" y2="36.5" id="Line-3" stroke={props.formBools.outdoorArea ? "black" : "#979797"} strokeLinecap="square"></line><line x1="29.5" y1="31.5" x2="33.5" y2="36.5" id="Line" stroke={props.formBools.outdoorArea ? "black" : "#979797"} strokeLinecap="square"></line><line x1="10.5" y1="11.5" x2="29.5" y2="11.5" id="Line-4" stroke={props.formBools.outdoorArea ? "black" : "#979797"} strokeLinecap="square"></line></g>
                    </svg>
                    <div style={{ width: "4px" }} />
                    <p style={{ color: "grey", transform: "translateY(8px)" }}>Terrace</p>
                </div>

                <div
                    className="form-bool"
                    style={{ width: "48%", border: props.formBools.garden && "4px solid pink", display: "flex", justifyContent: "center" }}
                    onClick={() => props.setFormBools({ ...props.formBools, garden: props.formBools.garden === false ? true : false })}
                >
                    <svg width="40px" height="40px" viewBox="0 0 40 40" style={{ marginTop: "16px" }}>
                        <g id="Garden" stroke="none" strokeWidth={props.formBools.garden ? '2' : '1'} fill="none" fillRule="evenodd">
                            <rect id="Rectangle" stroke={props.formBools.garden ? "black" : "#979797"} x="10.5" y="24.5" width="2" height="9"></rect>
                            <rect id="Rectangle-Copy" stroke={props.formBools.garden ? "black" : "#979797"} x="20.6911686" y="24.5" width="2" height="10"></rect>
                            <path d="M22,33 C22.6666667,31.6666667 27.3333333,32.3333333 36,35" id="Line-13-Copy" stroke={props.formBools.garden ? "black" : "#979797"} fill="#FFFFFF" strokeLinecap="square"></path>
                            <path d="M8.96915509,20.6620635 C9.14598406,19.8416553 9.3317624,18.9792946 9.49209166,18.0885765 C9.76773937,16.5572003 9.97682074,15.1099227 10.1636755,13.8159723 C10.434585,11.9399505 10.654346,10.3925407 10.9719306,9.39626681 C11.0790702,9.06016619 11.1912485,8.79382936 11.332389,8.61897116 C11.8087515,8.79382936 11.9209298,9.06016619 12.0280694,9.39626681 C12.345654,10.3925407 12.565415,11.9399505 12.8363245,13.8159723 C13.0231793,15.1099227 13.2322606,16.5572003 13.5079083,18.0885765 C13.6682376,18.9792946 13.8540159,19.8416553 14.0308449,20.6620635 C14.5253176,22.9561981 14.9956853,24.9143261 14.481403,26.1820188 C14.3110305,26.6019825 14.0146021,26.9284299 13.5511974,27.1477093 C13.0522709,27.3837974 12.380901,27.5 11.5,27.5 C10.619099,27.5 9.94772908,27.3837974 9.44880257,27.1477093 C8.98539785,26.9284299 8.68896948,26.6019825 8.51859705,26.1820188 C8.00431466,24.9143261 8.47468236,22.9561981 8.96915509,20.6620635 Z" id="Oval" stroke={props.formBools.garden ? "black" : "#979797"} fill="#FFFFFF"></path>
                            <path d="M19.0475982,20.375482 C19.1973568,19.5579864 19.3534424,18.7057325 19.4937203,17.8289953 C19.7293016,16.3566123 19.9438368,14.8150167 20.1521207,13.3180874 C20.5365794,10.5549971 20.8981555,7.94528061 21.3352031,6.22007984 C21.4433264,5.7932743 21.5542335,5.42361572 21.6725367,5.12513666 C22.4048548,5.39713793 22.5482006,5.759828 22.6647969,6.22007984 C23.1018445,7.94528061 23.4634206,10.5549971 23.8478793,13.3180874 C24.0561632,14.8150167 24.2706984,16.3566123 24.5062797,17.8289953 C24.5695971,18.2247294 24.6336785,18.6154606 24.696785,19.0002397 C25.2079242,22.1168092 25.686695,24.8365421 25.071876,26.6078345 C24.8611442,27.2149523 24.5107519,27.6980829 23.9560194,28.0188825 C23.4015229,28.3395456 22.6593652,28.5 21.6911686,28.5 C20.7998529,28.5 20.1186231,28.3648624 19.6117735,28.0905074 C19.1209219,27.824812 18.8115112,27.4250592 18.629334,26.9187087 C18.0875129,25.41275 18.5502828,23.0902062 19.0475982,20.375482 Z" id="Oval-Copy" stroke={props.formBools.garden ? "black" : "#979797"} fill="#FFFFFF"></path>
                            <path d="M4,35 C6,33.6666667 9.66666667,33 15,33 C20.3333333,33 24.3333333,33.6666667 27,35" id="Line-13" stroke={props.formBools.garden ? "black" : "#979797"} fill="#FFFFFF" strokeLinecap="square"></path>
                        </g>
                    </svg>
                    <div style={{ width: "4px" }} />
                    <p style={{ color: "grey", transform: "translateY(8px)" }}>Garden</p>
                </div>

            </div>


            <div style={{ margin: "16px 0px" }}>Does the property share...</div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>

                <div
                    className="form-bool"
                    style={{ width: "48%", border: props.formBools.sharingWall && "4px solid pink", display: "flex", justifyContent: "center" }}
                    onClick={() => props.setFormBools({ ...props.formBools, sharingWall: props.formBools.sharingWall === false ? true : false })}
                >
                    <svg width="40px" height="40px" viewBox="0 0 40 40" style={{ marginTop: "16px" }}>
                        <g id="Sharing-Wall" stroke="none" strokeWidth={props.formBools.sharingWall ? '2' : '1'} fill="none" fillRule="evenodd">
                            <g id="Group" transform="translate(1.000000, 4.000000)" stroke={props.formBools.sharingWall ? "black" : "#979797"}>
                                <path d="M11.8246095,32.5 L1.42539053,32.5 L10.1753905,25.5 L20.5746095,25.5 L11.8246095,32.5 Z" id="Rectangle-Copy-3"></path>
                                <path d="M21.5,24.5143054 L12.5,31.9393054 L12.5,8.48569461 L21.5,1.06069461 L21.5,24.5143054 Z" id="Rectangle" fill="#FFFFFF"></path>
                                <path d="M36.608249,25.25 L27.8203702,32.5 L16.5,32.5 L16.5,8.48569461 L25.5,1.06069461 L25.5,25.25 L36.608249,25.25 Z" id="Combined-Shape" fill="#FFFFFF"></path>
                            </g>
                        </g>
                    </svg>
                    <div style={{ width: "4px" }} />
                    <p style={{ color: "grey", transform: "translateY(8px)" }}>A wall</p>
                </div>

                <div
                    className="form-bool"
                    style={{ width: "48%", border: props.formBools.sharingFloor && "4px solid pink", display: "flex", justifyContent: "center" }}
                    onClick={() => props.setFormBools({ ...props.formBools, sharingFloor: props.formBools.sharingFloor === false ? true : false })}
                >
                    <svg width="40px" height="40px" viewBox="0 0 40 40" style={{ marginTop: "16px" }}>
                        <g id="Sharing-Ceiling-or-floor" stroke="none" strokeWidth={props.formBools.sharingFloor ? '2' : '1'} fill="none" fillRule="evenodd">
                            <rect id="Rectangle-Copy-2" stroke={props.formBools.sharingFloor ? "black" : "#979797"} x="11.5" y="22.5" width="17" height="14"></rect>
                            <path d="M33.7928932,27.5 L6.20710678,27.5 L11.2071068,22.5 L28.7928932,22.5 L33.7928932,27.5 Z" id="Rectangle-Copy" stroke={props.formBools.sharingFloor ? "black" : "#979797"} fill="#FFFFFF"></path>
                            <path d="M28.5,4.5 L28.5,19.2071068 L33.7928932,24.5 L6.20710678,24.5 L11.5,19.2071068 L11.5,4.5 L28.5,4.5 Z" id="Combined-Shape" stroke={props.formBools.sharingFloor ? "black" : "#979797"} fill="#FFFFFF"></path>
                        </g>
                    </svg>
                    <div style={{ width: "4px" }} />
                    <p style={{ color: "grey", transform: "translateY(8px)" }}>Floor or ceiling</p>
                </div>
            </div>

            <div style={{ margin: "16px 0px" }}>Is it less than 1km to a...</div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>

                <div
                    className="form-bool"
                    style={{ width: "48%", border: props.formBools.supermarket && "4px solid pink", display: "flex", justifyContent: "center" }}
                    onClick={() => props.setFormBools({ ...props.formBools, supermarket: props.formBools.supermarket === false ? true : false })}
                >
                    <svg width="40px" height="40px" viewBox="0 0 40 40" style={{ marginTop: "16px" }}>
                        <g id="Shopping" stroke="none" strokeWidth={props.formBools.supermarket ? '2' : '1'} fill="none" fillRule="evenodd">
                            <polyline id="Line-6" stroke={props.formBools.supermarket ? "black" : "#979797"} strokeLinecap="round" points="3 9 6 9.5 11 30 32 30"></polyline>
                            <circle id="Oval" stroke={props.formBools.supermarket ? "black" : "#979797"} cx="13.5" cy="32.5" r="2"></circle>
                            <circle id="Oval-Copy" stroke={props.formBools.supermarket ? "black" : "#979797"} cx="28.5" cy="32.5" r="2"></circle>
                            <line x1="29" y1="16.9444444" x2="29" y2="24.0555556" id="Line-2-Copy" stroke={props.formBools.supermarket ? "black" : "#979797"} strokeLinecap="square"></line>
                            <line x1="24" y1="16.9444444" x2="24" y2="24.0555556" id="Line-2-Copy-2" stroke={props.formBools.supermarket ? "black" : "#979797"} strokeLinecap="square"></line>
                            <line x1="19" y1="16.9444444" x2="19" y2="24.0555556" id="Line-2-Copy-3" stroke={props.formBools.supermarket ? "black" : "#979797"} strokeLinecap="square"></line>
                            <line x1="14" y1="16.9444444" x2="14" y2="24.0555556" id="Line-2" stroke={props.formBools.supermarket ? "black" : "#979797"} strokeLinecap="square"></line>
                            <polyline id="Line-7" stroke={props.formBools.supermarket ? "black" : "#979797"} strokeLinecap="square" points="10.5 24.5 31.5 24.5 34 16 34 14 8 14"></polyline>
                            <line x1="8.5" y1="16.5" x2="33.5" y2="16.5" id="Line" stroke={props.formBools.supermarket ? "black" : "#979797"} strokeLinecap="square"></line>
                        </g>
                    </svg>
                    <div style={{ width: "4px" }} />
                    <p style={{ color: "grey", transform: "translateY(8px)" }}>Supermarket</p>
                </div>

                <div
                    className="form-bool"
                    style={{ width: "48%", border: props.formBools.trainStation && "4px solid pink", display: "flex", justifyContent: "center" }}
                    onClick={() => props.setFormBools({ ...props.formBools, trainStation: props.formBools.trainStation === false ? true : false })}
                >
                    <svg width="40px" height="40px" viewBox="0 0 40 40" style={{ marginTop: "16px" }}>
                        <g id="Train" stroke="none" strokeWidth={props.formBools.trainStation ? "2" : "1"} fill="none" fillRule="evenodd"><rect id="Rectangle" stroke={props.formBools.trainStation ? "black" : "#979797"} x="8.5" y="6.5" width="23" height="26" rx="5"></rect><line x1="9.5" y1="10.5" x2="30.5" y2="10.5" id="Line-8" stroke={props.formBools.trainStation ? "black" : "#979797"} strokeLinecap="square"></line> <line x1="9" y1="23" x2="31" y2="23" id="Line" stroke={props.formBools.trainStation ? "black" : "#979797"} strokeLinecap="square"></line>  <line x1="20" y1="11" x2="20" y2="22" id="Line-9" stroke={props.formBools.trainStation ? "black" : "#979797"} strokeLinecap="square"></line>   <circle id="Oval" stroke={props.formBools.trainStation ? "black" : "#979797"} cx="13.5" cy="27.5" r="1"></circle>  <circle id="Oval-Copy" stroke={props.formBools.trainStation ? "black" : "#979797"} cx="26.5" cy="27.5" r="1"></circle> <line x1="11.5" y1="32.5" x2="9.5" y2="35.5" id="Line-10" stroke={props.formBools.trainStation ? "black" : "#979797"} strokeLinecap="round"></line>  <line x1="28.5" y1="32.5" x2="30.5" y2="35.5" id="Line-2" stroke={props.formBools.trainStation ? "black" : "#979797"} strokeLinecap="round"></line></g>
                    </svg>
                    <div style={{ width: "4px" }} />
                    <p style={{ color: "grey", transform: "translateY(8px)" }}>Trainstation</p>
                </div>
            </div>

            <div style={{ height: "24px" }} />

            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <div
                    className="button secondary"
                    onClick={() => props.setPart(0)}
                    style={{ width: "48%" }}
                >
                    Back
                </div>

                <div
                    className="button primary"
                    onClick={() => props.setPart(2)}
                    style={{ ...handleNextButton, width: "48%" }}
                >
                    Next
                </div>
            </div>



        </>
    )
}


export default Part1;