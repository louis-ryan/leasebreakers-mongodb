import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import Logo from './Logo';

const Navbar = () => {

    const { user, error, isLoading } = useUser()

    console.log("user from nav, ", user)
    // console.log("local storage, ", localStorage)

    return (
        <nav
            // id="main_nav"
            className="navbar"
        >
            <Link href="/">
                <a className="navbar-brand"><Logo /></a>
            </Link>
            {user ?
                <div>
                    <Link href="/api/auth/logout">
                        <a className="navbar-brand">
                            <img width="40px" style={{ borderRadius: "50%" }} src={user.picture} />
                        </a>
                    </Link>
                    <Link href="/new">
                        <a className="create">Create listing</a>
                    </Link>
                </div>
                :


                <Link href="/api/auth/login">
                    <a className="create">Create listing</a>
                </Link>

            }
        </nav>
    )
}

export default Navbar;