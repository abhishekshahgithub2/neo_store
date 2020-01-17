
const initialState = {

    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [] ,
    inputValue: ''
}

const cartReducer = (state=initialState,action) => {
    switch(action.type){
        case 'ADD_TO_CART': {
            let cart = [...state.cart, action.item]
            // const test = cart.filter(function(items) {
            //     return items.product_id !== action.item.product_id;
            //   });
            // cart = test;
            // cart.filter(items=> items.product_id !== action.item.product_id);
            // cart.map(items=>console.log('Each' +items.product_id, 'Current' + action.item.product_id));
            // let cart = [...state.cart, action.item]
            alert("Added to cart")
            localStorage.setItem('cart',JSON.stringify(cart));
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
        case 'INPUT_CHANGE': {
            return Object.assign({},state,{inputValue: action.text });
        }
        default: {
            return state
        }
    }
}

export default cartReducer

