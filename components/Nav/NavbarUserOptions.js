import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';


const NavbarUserOptions = ({ userOptions, setUserOptions }) => {

    const { user } = useUser()

    const imgStyle = { borderRadius: "50%", marginTop: "8px", border: userOptions ? "4px #3B4657 solid" : "" }


    if (user) {
        return (
            <div style={{ display: "flex" }}>
                <div
                    onClick={() => setUserOptions(true)}
                    style={{ backgroundColor: userOptions ? "#3B4657" : "" }}
                >
                    <div className="navbar-brand"><img
                        width="40px"
                        style={imgStyle}
                        src={user.picture}
                        referrerPolicy="no-referrer"
                    /></div>
                </div>
                <div style={{ width: "4px" }} />
                <Link href="/new"><div className="navbar-create"> + </div></Link>
            </div>
        )
    } else {
        return (
            <Link href="/api/auth/login"><a className="navbar-create"> + </a></Link>
        )
    }


}

export default NavbarUserOptions;