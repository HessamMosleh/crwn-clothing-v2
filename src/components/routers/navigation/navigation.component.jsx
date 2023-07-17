import {Outlet, Link} from "react-router-dom";
import {Fragment, useContext} from 'react'
import {ReactComponent as CrownLogo} from '../../../assets/crown.svg'
import {UserContext} from "../../../contexts/user.context";
import {CartContext} from "../../../contexts/cart.context";
import {signOutUser} from '../../../utils/firebase/firebase.utils'
import CardIcon from "../../card-icon/card-icon.components";
import CardDropdown from "../../card-dropdown/card-dropdown.component";
import {LogoContainer, NavigationContainer, NavLink, NavLinks} from "./navigation.styles";
const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrownLogo className='logo'/>
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        <div>SHOP</div>
                    </NavLink>
                    {currentUser ? <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink> :
                        (<NavLink className='nav-link' to='/auth'>
                            <div>Sign in</div>
                        </NavLink>)}
                    <CardIcon/>
                </NavLinks>
                {isCartOpen && <CardDropdown/>}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation