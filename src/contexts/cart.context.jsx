import {createContext, useEffect, useState} from 'react'

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {
    },
    cartItems: [],
    addItemToCart: () => {
    },
    cartCount:0
})

const addCartItem = (cartItems, productToAdd) => {
    //FIND IF CART-ITEMS CONTAINS PRODUCT
    const foundProduct = cartItems.find(it => it.id === productToAdd.id);
    if (foundProduct) {
        foundProduct.quantity++
        return [...cartItems]; //if pass cartItems itself it won't update the dom
    }
    //RETURN NEW ARRAY WITH MODIFIED CART-ITEM/PRODUCT TO ADD
    return [...cartItems,{...productToAdd,quantity:1}];
}

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    useEffect(()=>{
        setCartCount(cartItems.reduce((total,cur)=>total+cur.quantity,0))
    },[cartItems])
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = {setIsCartOpen, isCartOpen, addItemToCart, cartItems, cartCount};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}