import './card-icon.styles'
import {CartIconContainer, ItemCount, ShopIcon} from "./card-icon.styles";
import {useDispatch, useSelector} from "react-redux";
import {selectCartCount, selectIsCartOpen} from "../../store/cart/cart.selector";
import {setIsCartOpen} from "../../store/cart/cart.action";

const CardIcon = () => {
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount)
    const dispatch = useDispatch()
    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShopIcon/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}
export default CardIcon