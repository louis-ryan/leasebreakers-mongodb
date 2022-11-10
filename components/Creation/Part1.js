const Part1 = (props) => {

    const handleNextButton = {
        opacity: props.form.numRoom && props.form.numBath ? "1" : "0.5",
        pointerEvents: props.form.numRoom && props.form.numBath ? "inherit" : "none",
    }


    return (
        <>
            <h4 onClick={() => props.setPart(0)}>
                {'< Back to Location'}
            </h4>

            <div style={{ height: "16px" }} />

            <h2>Property</h2>

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

            Does it have...



            <div style={{ display: "flex", justifyContent: "space-between", margin: "0 0 1em" }}>

                <div
                    className="form-bool"
                    style={{ width: "30%", backgroundColor: props.formBools.petsAllowed && "pink" }}
                    onClick={() => props.setFormBools({ ...props.formBools, petsAllowed: props.formBools.petsAllowed === false ? true : false })}
                >
                    <svg width="40px" height="40px" viewBox="0 0 40 40" style={{ marginTop: "16px" }}>
                        <g id="Pets" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <path d="M6.5,31.5 C6.5,29.4872195 8.58539631,25.4394069 11.7467479,22.3909607 C14.0241738,20.1948715 16.8829115,18.5 20,18.5 C23.1170885,18.5 25.9758262,20.1948715 28.2532521,22.3909607 C31.4146037,25.4394069 33.5,29.4872195 33.5,31.5 C33.5,32.2659799 33.1583974,32.9896522 32.5667089,33.6528669 C31.8956791,34.405014 30.9086341,35.0764027 29.6889393,35.6426896 C27.2093235,36.7939398 23.782767,37.5 20,37.5 C16.217233,37.5 12.7906765,36.7939398 10.3110607,35.6426896 C9.09136594,35.0764027 8.10432088,34.405014 7.43329111,33.6528669 C6.84160264,32.9896522 6.5,32.2659799 6.5,31.5 Z M10.5,10.5 C10.5,9.3954305 10.9477153,8.3954305 11.6715729,7.67157288 C12.3954305,6.94771525 13.3954305,6.5 14.5,6.5 C15.6045695,6.5 16.6045695,6.94771525 17.3284271,7.67157288 C18.0522847,8.3954305 18.5,9.3954305 18.5,10.5 C18.5,11.6045695 18.0522847,12.6045695 17.3284271,13.3284271 C16.6045695,14.0522847 15.6045695,14.5 14.5,14.5 C13.3954305,14.5 12.3954305,14.0522847 11.6715729,13.3284271 C10.9477153,12.6045695 10.5,11.6045695 10.5,10.5 Z M21.5,10.5 C21.5,9.3954305 21.9477153,8.3954305 22.6715729,7.67157288 C23.3954305,6.94771525 24.3954305,6.5 25.5,6.5 C26.6045695,6.5 27.6045695,6.94771525 28.3284271,7.67157288 C29.0522847,8.3954305 29.5,9.3954305 29.5,10.5 C29.5,11.6045695 29.0522847,12.6045695 28.3284271,13.3284271 C27.6045695,14.0522847 26.6045695,14.5 25.5,14.5 C24.3954305,14.5 23.3954305,14.0522847 22.6715729,13.3284271 C21.9477153,12.6045695 21.5,11.6045695 21.5,10.5 Z M28.5,17.5 C28.5,16.3954305 28.9477153,15.3954305 29.6715729,14.6715729 C30.3954305,13.9477153 31.3954305,13.5 32.5,13.5 C33.6045695,13.5 34.6045695,13.9477153 35.3284271,14.6715729 C36.0522847,15.3954305 36.5,16.3954305 36.5,17.5 C36.5,18.6045695 36.0522847,19.6045695 35.3284271,20.3284271 C34.6045695,21.0522847 33.6045695,21.5 32.5,21.5 C31.3954305,21.5 30.3954305,21.0522847 29.6715729,20.3284271 C28.9477153,19.6045695 28.5,18.6045695 28.5,17.5 Z M2.5,17.5 C2.5,16.3954305 2.94771525,15.3954305 3.67157288,14.6715729 C4.3954305,13.9477153 5.3954305,13.5 6.5,13.5 C7.6045695,13.5 8.6045695,13.9477153 9.32842712,14.6715729 C10.0522847,15.3954305 10.5,16.3954305 10.5,17.5 C10.5,18.6045695 10.0522847,19.6045695 9.32842712,20.3284271 C8.6045695,21.0522847 7.6045695,21.5 6.5,21.5 C5.3954305,21.5 4.3954305,21.0522847 3.67157288,20.3284271 C2.94771525,19.6045695 2.5,18.6045695 2.5,17.5 Z" id="Combined-Shape" stroke="#979797"></path>
                        </g>
                    </svg>
                    <p style={{ color: "grey" }}>Pets Allowed</p>
                </div>

                <div
                    className="form-bool"
                    style={{ width: "30%", backgroundColor: props.formBools.outdoorArea && "pink" }}
                    onClick={() => props.setFormBools({ ...props.formBools, outdoorArea: props.formBools.outdoorArea === false ? true : false })}
                >
                    <svg width="40px" height="40px" viewBox="0 0 40 40" style={{ marginTop: "16px" }}>
                        <g id="Outdoor" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <path d="M29.5,31.5 L10.5,31.5 L10.5,7.15679952 C11.8325195,5.32443495 15.0498054,4.5 20,4.5 C24.9501946,4.5 28.1674805,5.32443495 29.5,7.15679952 L29.5,31.5 Z" id="Rectangle" stroke="#979797"></path>
                            <rect id="Rectangle" stroke="#979797" x="6.5" y="18.5" width="28" height="19" rx="2"></rect>
                            <line x1="13" y1="19.09375" x2="13" y2="36.90625" id="Line-2-Copy" stroke="#979797" strokeLinecap="square"></line>
                            <line x1="27" y1="19.09375" x2="27" y2="36.90625" id="Line-2-Copy-2" stroke="#979797" strokeLinecap="square"></line>
                            <line x1="20" y1="19.09375" x2="20" y2="36.90625" id="Line-2" stroke="#979797" strokeLinecap="square"></line>
                            <line x1="10.5" y1="31.5" x2="7.5" y2="36.5" id="Line-3" stroke="#979797" strokeLinecap="square"></line>
                            <line x1="29.5" y1="31.5" x2="33.5" y2="36.5" id="Line" stroke="#979797" strokeLinecap="square"></line>
                            <line x1="10.5" y1="11.5" x2="29.5" y2="11.5" id="Line-4" stroke="#979797" strokeLinecap="square"></line>
                        </g>
                    </svg>
                    <p style={{ color: "grey" }}>Outdoor Area</p>
                </div>

                <div
                    className="form-bool"
                    style={{ width: "30%", backgroundColor: props.formBools.parkingSpace && "pink" }}
                    onClick={() => props.setFormBools({ ...props.formBools, parkingSpace: props.formBools.parkingSpace === false ? true : false })}
                >
                    <svg width="40px" height="40px" viewBox="0 0 40 40" style={{ marginTop: "16px" }}>
                        <g id="Parking" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <ellipse id="Oval" stroke="#979797" cx="20.5" cy="19.5" rx="17" ry="16.5"></ellipse>
                            <line x1="17.5" y1="10.4347826" x2="17.5" y2="29.5652174" id="Line-5" stroke="#979797" strokeLinecap="round"></line>
                            <path d="M17.5,10.0255102 C23.1666667,10.0085034 26,11.6666667 26,15 C26,18.3333333 23.1666667,19.9914966 17.5,19.9744898" id="Line" stroke="#979797" strokeLinecap="square"></path>
                        </g>
                    </svg>
                    <p style={{ color: "grey" }}>Parking Space</p>
                </div>

            </div>

            Is it less than 1km to a...

            <div style={{ display: "flex", justifyContent: "space-between" }}>

                <div
                    className="form-bool"
                    style={{ width: "46%", backgroundColor: props.formBools.supermarket && "pink" }}
                    onClick={() => props.setFormBools({ ...props.formBools, supermarket: props.formBools.supermarket === false ? true : false })}
                >
                    <svg width="40px" height="40px" viewBox="0 0 40 40" style={{ marginTop: "16px" }}>
                        <g id="Shopping" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <polyline id="Line-6" stroke="#979797" strokeLinecap="round" points="3 9 6 9.5 11 30 32 30"></polyline>
                            <circle id="Oval" stroke="#979797" cx="13.5" cy="32.5" r="2"></circle>
                            <circle id="Oval-Copy" stroke="#979797" cx="28.5" cy="32.5" r="2"></circle>
                            <line x1="29" y1="16.9444444" x2="29" y2="24.0555556" id="Line-2-Copy" stroke="#979797" strokeLinecap="square"></line>
                            <line x1="24" y1="16.9444444" x2="24" y2="24.0555556" id="Line-2-Copy-2" stroke="#979797" strokeLinecap="square"></line>
                            <line x1="19" y1="16.9444444" x2="19" y2="24.0555556" id="Line-2-Copy-3" stroke="#979797" strokeLinecap="square"></line>
                            <line x1="14" y1="16.9444444" x2="14" y2="24.0555556" id="Line-2" stroke="#979797" strokeLinecap="square"></line>
                            <polyline id="Line-7" stroke="#979797" strokeLinecap="square" points="10.5 24.5 31.5 24.5 34 16 34 14 8 14"></polyline>
                            <line x1="8.5" y1="16.5" x2="33.5" y2="16.5" id="Line" stroke="#979797" strokeLinecap="square"></line>
                        </g>
                    </svg>
                    <p style={{ color: "grey" }}>Supermarket</p>
                </div>

                <div
                    className="form-bool"
                    style={{ width: "46%", backgroundColor: props.formBools.trainStation && "pink" }}
                    onClick={() => props.setFormBools({ ...props.formBools, trainStation: props.formBools.trainStation === false ? true : false })}
                >
                    <svg width="40px" height="40px" viewBox="0 0 40 40" style={{ marginTop: "16px" }}>
                        <g id="Train" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <rect id="Rectangle" stroke="#979797" x="8.5" y="6.5" width="23" height="26" rx="5"></rect>
                            <line x1="9.5" y1="10.5" x2="30.5" y2="10.5" id="Line-8" stroke="#979797" strokeLinecap="square"></line>
                            <line x1="9" y1="23" x2="31" y2="23" id="Line" stroke="#979797" strokeLinecap="square"></line>
                            <line x1="20" y1="11" x2="20" y2="22" id="Line-9" stroke="#979797" strokeLinecap="square"></line>
                            <circle id="Oval" stroke="#979797" cx="13.5" cy="27.5" r="1"></circle>
                            <circle id="Oval-Copy" stroke="#979797" cx="26.5" cy="27.5" r="1"></circle>
                            <line x1="11.5" y1="32.5" x2="9.5" y2="35.5" id="Line-10" stroke="#979797" strokeLinecap="round"></line>
                            <line x1="28.5" y1="32.5" x2="30.5" y2="35.5" id="Line-2" stroke="#979797" strokeLinecap="round"></line>
                        </g>
                    </svg>
                    <p style={{ color: "grey" }}>Trainstation</p>
                </div>
            </div>

            <div style={{ height: "24px" }} />

            <div
                className="button primary"
                onClick={() => props.setPart(2)}
                style={handleNextButton}
            >
                Next
            </div>



        </>
    )
}


export default Part1;