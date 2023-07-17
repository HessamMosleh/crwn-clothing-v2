import './card-dropdown.styles'
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.compenent";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {useNavigate} from "react-router-dom";
import {CartDropdown, CartItemContainer, EmptyMessage} from "./card-dropdown.styles";
const CardDropdown = ()=>{
    const navigate = useNavigate()
    const goToCheckOutHandler = ()=>{
        navigate('/checkout')
    }
    const {cartItems}=useContext(CartContext);
    return(
        <CartDropdown>
            <CartItemContainer>
                {cartItems.length ?
                    (cartItems.map(item=><CartItem key={item.id} cartItem={item}/>)) :
                    <EmptyMessage> Your cart is empty </EmptyMessage>
                }
            </CartItemContainer>
            <Button onClick={goToCheckOutHandler}>GO TO CHECKOUT</Button>
</CartDropdown>
    )
}

export default CardDropdown;