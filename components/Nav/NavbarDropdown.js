import styled from 'styled-components';


const ClickableBackground = styled.div`position: absolute; width: 100%; height: 100vh; z-index: 9; top: 0px;`;
const DropdownContainer = styled.div`position: absolute; width: 100%; background-color: #3B4657; z-index: 10; top: 48px; padding: 16px; display: flex; justify-content: center;`;
const SignOutButton = styled.div`outline: 1px grey solid; width: calc(100% - 32px); padding: 16px; max-width: 600px; border-radius: 8px;`;


const NavbarDropdown = ({ setUserOptions }) => {

    return (

        <ClickableBackground onClick={() => setUserOptions(false)}>
            <DropdownContainer>
                <SignOutButton>
                    <a href="/api/auth/logout">Sign Out</a>
                </SignOutButton>
            </DropdownContainer>
        </ClickableBackground>
    )

}

export default NavbarDropdown;