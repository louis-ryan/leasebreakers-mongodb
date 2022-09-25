import { useState } from 'react';

import NavbarUserOptions from './NavbarUserOptions';
import NavbarDropdown from './NavbarDropdown'


const Navbar = () => {

    const [userOptions, setUserOptions] = useState(false)


    return (
        <div style={{position: "fixed", width: "100%", zIndex: "10", opacity: "0.95", top: "0px"}}>
            <div className='navbar' style={{display: "flex", justifyContent: "space-between"}}>
                <div></div>
                <NavbarUserOptions
                    userOptions={userOptions}
                    setUserOptions={setUserOptions}
                />
            </div>

            {userOptions && <NavbarDropdown
                setUserOptions={setUserOptions}
            />}
        </div>
    )

}

export default Navbar;