import {createContext, useEffect, useState} from 'react'

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {
    },
    cartItems: [],
    addItemToCart: (productToAdd) => {
    },
    removeItemFromCart: (productToRemove) => {
    },
    clearItemFromCart: (cartItemToClear) => {
    },
    cartCount: 0,
    cartTotal: 0,
})

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
export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    useEffect(() => {
        setCartCount(cartItems.reduce((total, cur) => total + cur.quantity, 0))
    }, [cartItems])

    useEffect(() => {
        setCartTotal(cartItems.reduce((total, cur) => total + cur.quantity * cur.price, 0))
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const clearItemFromCart = (cartItemToClear)=>{
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    const value = {setIsCartOpen, isCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}