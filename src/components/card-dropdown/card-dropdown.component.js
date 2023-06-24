import './card-dropdown.styles.scss'
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.compenent";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
const CardDropdown = ()=>{
    const {cartItems}=useContext(CartContext);
    return(
        <div className='cart-dropdown-container'>
            <span className='empty-message'> Your cart is empty </span>
            <div className='cart-items' >
                {cartItems.map(item=><CartItem cartItem={item}/>)}
            </div>
            <Button>GO TO CHECKOUT</Button>
</div>
    )
}

export default CardDropdown;