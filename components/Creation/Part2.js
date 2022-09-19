

const DateInput = `width: 10%; height: 80px; text-align: center; font-size: 24px; caret-color: transparent;`;

const Part2 = (props) => {

    return (
        <>
            Current Contract Ends:

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div placeholder='D' maxLength={1} name='postCode1' />
                <div placeholder='D' maxLength={1} name='postCode2' />

                <div style={{ width: "2%" }} />

                <div placeholder='M' maxLength={1} name='postCode1' />
                <div placeholder='M' maxLength={1} name='postCode2' />

                <div style={{ width: "2%" }} />

                <div placeholder='Y' maxLength={1} name='postCode1' />
                <div placeholder='Y' maxLength={1} name='postCode2' />
                <div placeholder='Y' maxLength={1} name='postCode2' />
                <div placeholder='Y' maxLength={1} name='postCode2' />
            </div>

            <div
                onClick={() => props.setPart(3)}
                style={{ bottom: "24px", height: "60px", backgroundColor: "#1E304E", color: "white", textAlign: "center", alignItems: "center", paddingTop: "18px", borderRadius: "4px", marginTop: "40px" }}
            >
                Next
            </div>

        </>
    )
}

export default Part2;