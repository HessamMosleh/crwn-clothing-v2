import {Outlet, Link} from "react-router-dom";
import {Fragment, useContext} from 'react'
import {ReactComponent as CrownLogo} from '../../../assets/crown.svg'
import './navigation.styles.scss'
import {UserContext} from "../../../contexts/user.context";
import {CartContext} from "../../../contexts/cart.context";
import {signOutUser} from '../../../utils/firebase/firebase.utils'
import CardIcon from "../../card-icon/card-icon.components";
import CardDropdown from "../../card-dropdown/card-dropdown.component";
const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrownLogo className='logo'/>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        <div>SHOP</div>
                    </Link>
                    {currentUser ? <span className='nav-link' onClick={signOutUser}>SIGN OUT</span> :
                        (<Link className='nav-link' to='/auth'>
                            <div>Sign in</div>
                        </Link>)}
                    <CardIcon/>
                </div>
                {isCartOpen && <CardDropdown/>}
            </div>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation