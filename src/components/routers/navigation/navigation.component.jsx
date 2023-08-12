import {Outlet} from "react-router-dom";
import {Fragment} from 'react'
import {ReactComponent as CrownLogo} from '../../../assets/crown.svg'
import {signOutUser} from '../../../utils/firebase/firebase.utils'
import CardIcon from "../../card-icon/card-icon.components";
import CardDropdown from "../../card-dropdown/card-dropdown.component";
import {LogoContainer, NavigationContainer, NavLink, NavLinks} from "./navigation.styles";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../../store/user/user.selector";
import {selectIsCartOpen} from "../../../store/cart/cart.selector";

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
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