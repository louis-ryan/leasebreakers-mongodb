import { useState } from 'react';

import Link from 'next/link';
import Logo from '../Logo';
import NavbarUserOptions from './NavbarUserOptions';
import NavbarDropdown from './NavbarDropdown'
import styled from 'styled-components';


const NavbarContainer = styled.div`position: fixed; width: 100%; z-index: 10; opacity: 0.95; top: 0px;`;
const NavbarBlock = styled.div.attrs({ className: "navbar" })`display: flex; justify-content: space-between;`;


const Navbar = () => {

    const [userOptions, setUserOptions] = useState(false)


    return (
        <div style={{position: "fixed", width: "100%", zIndex: "10", opacity: "0.95", top: "0px"}}>
            <div className='navbar' style={{display: "flex", justifyContent: "space-between"}}>
                <Link href="/"><Logo /></Link>
                <NavbarUserOptions
                    userOptions={userOptions}
                    setUserOptions={setUserOptions}
                />
            </div>
            <div className='navbar-gradient' />

            {userOptions && <NavbarDropdown
                setUserOptions={setUserOptions}
            />}
        </div>
    )

}

export default Navbar;