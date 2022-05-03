import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import Logo from './Logo';

const Navbar = () => {

    const { user, error, isLoading } = useUser()

    const [userOptions, setUserOptions] = useState(false)
    console.log(userOptions)

    if (user) {
        return (
            <div style={{ position: "fixed", width: "100%", zIndex: "10", opacity: "0.95" }}>
                <nav
                    // id="main_nav"
                    className="navbar"
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Link href="/">
                        <div style={{ height: "48px" }} className="navbar-brand"><Logo /></div>
                    </Link>
                    <div style={{ display: "flex" }}>
                        <div
                            onClick={() => setUserOptions(true)}
                            style={{ backgroundColor: userOptions ? "#3B4657" : "" }}
                        >
                            <a className="navbar-brand">
                                <img
                                    width="40px"
                                    style={{
                                        borderRadius: "50%",
                                        marginTop: "8px",
                                        border: userOptions ? "4px #3B4657 solid" : "",
                                    }}
                                    src={user.picture}
                                />
                            </a>
                        </div>
                        <div style={{ width: "4px" }} />
                        <Link href="/new">
                            <div className="navbar-create"> + </div>
                        </Link>
                    </div>
                </nav>
                <div className='navbar-gradient' />

                {userOptions &&
                    <div
                        onClick={() => setUserOptions(false)}
                        style={{ position: "absolute", width: "100%", height: "100vh", zIndex: "9", top: "0px" }}
                    >
                        <div
                            style={{ position: "absolute", width: "100%", backgroundColor: "#3B4657", zIndex: "10", top: "48px", padding: "16px", display: "flex", justifyContent: "center" }}
                        >
                            <div
                                onClick
                                style={{ outline: "1px grey solid", width: "calc(100% - 32px)", padding: "16px", maxWidth: "600px", borderRadius: "8px" }}
                            >
                                <Link href="/api/auth/logout">
                                    Sign Out
                                </Link>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    } else {
        return (
            <div style={{ position: "fixed", width: "100%", zIndex: "10", opacity: "0.9" }}>
                <nav
                    // id="main_nav"
                    className="navbar"
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Link href="/">
                        <div style={{ height: "48px" }} className="navbar-brand"><Logo /></div>
                    </Link>
                    <Link href="/api/auth/login">
                        <a className="navbar-create"> + </a>
                    </Link>
                </nav>
                <div className='navbar-gradient' />
            </div>
        )
    }
}

export default Navbar;