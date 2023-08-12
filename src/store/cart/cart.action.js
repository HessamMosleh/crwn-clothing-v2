import { CART_ACTION_TYPES } from './cart.types';
import { createAction } from '../../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
    //FIND IF CART-ITEMS CONTAINS PRODUCT
    const foundProduct = cartItems.find(it => it.id === productToAdd.id);
    if (foundProduct) {
        foundProduct.quantity++
        return [...cartItems]; //if pass cartItems itself it won't update the dom
    }
    //RETURN NEW ARRAY WITH MODIFIED CART-ITEM/PRODUCT TO ADD
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, productToRemove) => {
    const foundProductIndex = cartItems.findIndex(it => it.id === productToRemove.id);
    if (foundProductIndex === -1)
        return cartItems;

    console.log(foundProductIndex)

    if (cartItems[foundProductIndex].quantity > 1)
        cartItems[foundProductIndex].quantity--;
    else
        cartItems.splice(foundProductIndex, 1)

    return [...cartItems]
}

const clearCartItem = (cartItems, cartItemToClear)=>{
    return cartItems.filter(it=> it.id !== cartItemToClear.id)
}

export const addItemToCart = (cartItems, productToAdd) => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,addCartItem(cartItems, productToAdd));
}
export const removeItemFromCart = (cartItems, productToRemove) => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,removeCartItem(cartItems, productToRemove));
}

export const clearItemFromCart = (cartItems, cartItemToClear)=>{
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,clearCartItem(cartItems, cartItemToClear));
}

export const setIsCartOpen = (boolean)=>
createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);