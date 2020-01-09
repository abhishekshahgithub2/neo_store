
const initialState = {

    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [] 
}

const cartReducer = (state=initialState,action) => {
    switch(action.type){
        case 'ADD_TO_CART': {
            let cart = [...state.cart, action.item]
            console.log(cart);
            localStorage.setItem('cart',JSON.stringify(cart));
            JSON.parse(localStorage.getItem('cart'))
            return {
                ...state,
                cart
            }
        }
        case 'REMOVE_FROM_CART': {
            let cart = [...state.cart]
            cart.splice(action.index,1)
            localStorage.setItem('cart',JSON.stringify(cart));
            return {
                ...state,
                cart
            }
        }
        default: {
            return state
        }
    }
}

export default cartReducer

