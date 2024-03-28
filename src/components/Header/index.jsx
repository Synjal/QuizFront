import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {StyledLink} from '../../utils/style/Atoms'
import Logo from '../../assets/logo.png'
import {useTheme} from "../../utils/hooks";
import {useContext} from "react";
import {PlayerContext} from "../../utils/context";

const HomeLogo = styled.img`
  height: 70px;
`

const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const PseudoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  color: ${({theme}) => (theme === 'light' ? '#000000' : '#ffffff')};
`

function Header() {
    const {theme} = useTheme()
    const {pseudo} = useContext(PlayerContext)

    return (
        <NavContainer>
            <Link to="/">
                <HomeLogo src={Logo}/>
            </Link>
            {pseudo !== '' && (
                <PseudoContainer theme={theme}>
                    Bonjour, {pseudo} !
                </PseudoContainer>
            )}
            <div>
                <StyledLink to="/leaderboard">
                    Leaderboard
                </StyledLink>
                <StyledLink to="/survey/1" $isFullLink>
                    Faire le test
                </StyledLink>
            </div>
        </NavContainer>
    )
}

export default Header
