import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';


const NavbarUserOptions = ({ userOptions, setUserOptions }) => {

    const { user } = useUser()


    if (user) {
        return (
            <div className='navbar-container'>
                <div
                    onClick={() => setUserOptions(true)}
                    style={{ backgroundColor: userOptions ? "#3B4657" : "" }}
                >
                    <div style={{ height: "40px" }}>
                        <img
                            width="40px"
                            src={user.picture}
                            referrerPolicy="no-referrer"
                            style={{ borderRadius: "50%" }}
                        />
                    </div>
                </div>
                <div style={{ width: "4px" }} />
                <Link href="/new">
                    <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1">
                        <g id="New" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <circle id="Oval" fill="black" cx="20" cy="20" r="20"></circle>
                            <path d="M20,7.56521739 L20,32.4347826 M7,19.9999824 L33,20.0000176" id="Combined-Shape" stroke="#FFFFFF" strokeLinecap="round"></path>
                        </g>
                    </svg>
                </Link>
            </div>
        )
    } else {
        return (
            <Link href="/api/auth/login">
                <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1">
                    <g id="New" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <circle id="Oval" fill="black" cx="20" cy="20" r="20"></circle>
                        <path d="M20,7.56521739 L20,32.4347826 M7,19.9999824 L33,20.0000176" id="Combined-Shape" stroke="#FFFFFF" strokeLinecap="round"></path>
                    </g>
                </svg>
            </Link>
        )
    }


}

export default NavbarUserOptions;