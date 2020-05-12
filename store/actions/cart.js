export const ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART";
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";

export const addItem = (product)=>{

    return{
        type:ADD_ITEM_TO_CART,
        product
    }
}

export const removeItem = productId=>{
    return{
        type:REMOVE_CART_ITEM,
        pid:productId,
    }
}