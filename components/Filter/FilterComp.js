import { useState } from 'react';
import { Blocks } from 'react-loader-spinner';
import Location from './Location'
import Rent from './Rent'
import Rooms from './Rooms'
import Details from './Details'
import MoveIn from './MoveIn'


const FilterComp = ({ filter, setFilter, updateFilter, filterUpdating, notes, deviceSize }) => {

    const [reveal, setReveal] = useState("NONE")


    return (
        <div style={{ marginTop: "24px", borderRadius: "8px", }}>

            <div style={{ height: "16px" }} />

            <div style={{ width: "100%", padding: "8px" }}>
                <div>Selecting filtering options</div>
            </div>

            <div style={{ height: "24px" }} />

            <Location reveal={reveal} setReveal={setReveal} deviceSize={deviceSize} filter={filter} setFilter={setFilter} />

            <div style={{ height: "8px" }} />

            <Rent reveal={reveal} setReveal={setReveal} deviceSize={deviceSize} filter={filter} setFilter={setFilter} notes={notes} />

            <div style={{ height: "8px" }} />

            <Rooms reveal={reveal} setReveal={setReveal} deviceSize={deviceSize} filter={filter} setFilter={setFilter} />

            <div style={{ height: "8px" }} />

            <Details reveal={reveal} setReveal={setReveal} deviceSize={deviceSize} filter={filter} setFilter={setFilter} />

            <div style={{ height: "8px" }} />

            <MoveIn reveal={reveal} setReveal={setReveal} deviceSize={deviceSize} filter={filter} setFilter={setFilter} />

            <div style={{ height: "8px" }} />

            <div
                onClick={() => { updateFilter() }}
                style={{ margin: "16px 8px", width: "calc(100% - 16px)", textAlign: "center", backgroundColor: "#3C332F", color: "white", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
                <svg width="30px" height="80px" viewBox="0 0 30 80">
                    <g id="Button-L" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Group-3" transform="translate(3.000000, 39.000000) scale(1, -1) translate(-3.000000, -39.000000) translate(-15.000000, -3.000000)">
                            <g id="Group-2" transform="translate(0.000000, 16.860215)">
                                <rect id="Rectangle-Copy-11" fill="#202020" x="9.44262295" y="0.903225806" width="19.1803279" height="13.8494624"></rect>
                                <rect id="Rectangle-Copy-10" fill="#202020" x="0" y="17.4623656" width="19.1803279" height="13.8494624"></rect>
                                <rect id="Rectangle" fill="#6A6A6A" x="9.44262295" y="0" width="10.0327869" height="12.0430108"></rect>
                                <rect id="Rectangle-Copy-8" fill="#6A6A6A" x="9.44262295" y="24.3870968" width="15.9344262" height="14.7526882"></rect>
                                <rect id="Rectangle-Copy-9" fill="#6A6A6A" x="11.5081967" y="50.5806452" width="18.5901639" height="16.5591398"></rect>
                                <rect id="Rectangle" fill="#202020" x="7.08196721" y="46.0645161" width="19.1803279" height="13.8494624"></rect>
                            </g>
                            <g id="Group" transform="translate(11.508197, 0.000000)">
                                <rect id="Rectangle" fill="#61483E" x="2.36065574" y="2.40860215" width="22.1311475" height="19.2688172"></rect>
                                <rect id="Rectangle-Copy-4" fill="#371A0D" x="0" y="0" width="22.1311475" height="19.2688172"></rect>
                                <rect id="Rectangle-Copy" fill="#61483E" x="2.36065574" y="28.9032258" width="11.2131148" height="9.03225806"></rect>
                                <rect id="Rectangle-Copy-5" fill="#371A0D" x="0" y="26.4946237" width="11.2131148" height="9.03225806"></rect>
                                <rect id="Rectangle-Copy-2" fill="#61483E" x="2.36065574" y="50.5806452" width="19.7704918" height="13.2473118"></rect>
                                <rect id="Rectangle-Copy-6" fill="#371A0D" x="0" y="48.172043" width="19.7704918" height="13.2473118"></rect>
                                <rect id="Rectangle-Copy-3" fill="#61483E" x="2.36065574" y="73.7634409" width="8.85245902" height="9.03225806"></rect>
                                <rect id="Rectangle-Copy-7" fill="#371A0D" x="0" y="71.3548387" width="8.85245902" height="9.03225806"></rect>
                            </g>
                        </g>
                    </g>
                </svg>
                {filterUpdating === "UPDATE" && (
                    <div style={{ padding: "4px" }}>UPDATE YOUR FILTER</div>
                )}

                {filterUpdating === "UPDATING" && (
                    <div style={{ filter: "saturate(0) brightness(1.5)" }}>
                        <Blocks
                            height="24"
                            width="24"
                            color="pink"
                            radius="0"
                            wrapperClassName="blocks-loader-ani"
                        />
                    </div>
                )}

                {filterUpdating === "DONE" && (
                    <svg width="24px" height="24px" viewBox="0 0 40 40" version="1.1">
                        <g id="Tick" stroke="none" strokeWidth="4" fill="none" fillRule="evenodd">
                            <circle id="Oval" fill="black" cx="20" cy="20" r="20"></circle>
                            <polyline id="Line-11" stroke="#FFFFFF" strokeLinecap="round" points="30.5 11 17.5 29 10 23"></polyline>
                        </g>
                    </svg>
                )}

                <svg width="30px" height="80px" viewBox="0 0 30 80">
                    <g id="Button-R" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Group-2" transform="translate(27.000000, 47.500000) scale(-1, 1) translate(-27.000000, -47.500000) translate(14.000000, 14.000000)">
                            <rect id="Rectangle-Copy-11" fill="#202020" x="8.06896552" y="0.901345291" width="16.7356322" height="13.8206278"></rect>
                            <rect id="Rectangle-Copy-10" fill="#202020" x="0" y="17.426009" width="16.7356322" height="13.8206278"></rect>
                            <rect id="Rectangle" fill="#6A6A6A" x="8.06896552" y="-5.46512511e-13" width="8.66666667" height="12.0179372"></rect>
                            <rect id="Rectangle-Copy-8" fill="#6A6A6A" x="8.06896552" y="24.3363229" width="13.7471264" height="14.7219731"></rect>
                            <rect id="Rectangle-Copy-9" fill="#6A6A6A" x="9.56321839" y="50.4753363" width="16.4367816" height="16.5246637"></rect>
                            <rect id="Rectangle" fill="#202020" x="5.97701149" y="45.9686099" width="16.7356322" height="13.8206278"></rect>
                        </g>
                        <g id="Group" transform="translate(21.500000, 39.000000) scale(-1, 1) translate(-21.500000, -39.000000) translate(11.000000, -2.000000)">
                            <rect id="Rectangle" fill="#61483E" x="2.07042254" y="2.38545455" width="18.9295775" height="19.0836364"></rect>
                            <rect id="Rectangle-Copy-4" fill="#371A0D" x="0" y="0" width="18.9295775" height="19.0836364"></rect>
                            <rect id="Rectangle-Copy" fill="#61483E" x="2.07042254" y="28.6254545" width="9.46478873" height="8.94545455"></rect>
                            <rect id="Rectangle-Copy-5" fill="#371A0D" x="0" y="26.24" width="9.46478873" height="8.94545455"></rect>
                            <rect id="Rectangle-Copy-2" fill="#61483E" x="2.07042254" y="50.0945455" width="16.8591549" height="13.12"></rect>
                            <rect id="Rectangle-Copy-6" fill="#371A0D" x="0" y="47.7090909" width="16.8591549" height="13.12"></rect>
                            <rect id="Rectangle-Copy-3" fill="#61483E" x="1.77464789" y="73.0545455" width="7.69014085" height="8.94545455"></rect>
                            <rect id="Rectangle-Copy-7" fill="#371A0D" x="0" y="70.6690909" width="7.69014085" height="8.94545455"></rect>
                        </g>
                    </g>
                </svg>

            </div>

        </div>
    )
}

export default FilterComp;