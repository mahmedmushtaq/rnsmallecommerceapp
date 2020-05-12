import {ADD_ITEM_TO_CART,REMOVE_CART_ITEM} from "../actions/cart";
import CartItem from "../../models/cart-item";
import {ADD_ORDER} from "../actions/order";

const initialState = {
    items:{},
    totalAmount:0,
}

export default (state=initialState,actions)=>{
    switch (actions.type) {
        case ADD_ITEM_TO_CART:

            const addedProduct = actions.product;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title;

            let updateOrNewCartItem;
            if(state.items[addedProduct.id]){
                // already have
                updateOrNewCartItem = new CartItem(state.items[addedProduct.id].quantity+1,
                    productPrice,
                    productTitle,

                    state.items[addedProduct.id].sum + productPrice)

            }else{
                updateOrNewCartItem = new CartItem(1,productPrice,productTitle,productPrice);

            }


            return {
                ...state,
                items:{...state.items,[addedProduct.id]:updateOrNewCartItem},
                totalAmount: state.totalAmount + productPrice,
            }

        case REMOVE_CART_ITEM:
             const selectedItem = state.items[actions.pid];
             const selectedItemQty = state.items[actions.pid].quantity;

             let updateCartItems;
             if(selectedItemQty > 1){
              const   updatedCartItems = new CartItem(selectedItemQty-1,
                     selectedItem.price,
                     selectedItem.title,
                     selectedItem.sum - selectedItem.price,
                     )


               updateCartItems = {...state.items,[actions.pid]:updatedCartItems}
             }else{
                 updateCartItems = {...state.items};
                 delete updateCartItems[actions.pid];
             }

             return {
                 ...state,
                 items:updateCartItems,
                 totalAmount: state.totalAmount - state.items[actions.pid].price,
             }

        case ADD_ORDER:
            return initialState;
        default:
           return state;

    }
}