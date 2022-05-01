import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import Logo from './Logo';

const Navbar = () => {

    const { user, error, isLoading } = useUser()


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
                {user ?
                    <div style={{ display: "flex" }}>
                        <Link href="/api/auth/logout">
                            <a className="navbar-brand"> <img width="40px" style={{ borderRadius: "50%", marginTop: "8px" }} src={user.picture} /></a>
                        </Link>
                        <div style={{ width: "4px" }} />
                        <Link href="/new">
                            <div className="create"> + </div>
                        </Link>
                    </div>
                    :
                    <Link href="/api/auth/login">
                        <a className="create"> + </a>
                    </Link>

                }
            </nav>
            <div className='navbar-gradient' />
        </div>
    )
}

export default Navbar;