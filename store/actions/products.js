export const DELETE_ITEM = "DELETE_ITEM";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteItem = (pid)=>{
    return {
        type:DELETE_ITEM,
        pid,
    }
}

export const createProduct = (title,description,imageUrl,price)=>{
    return {
        type:CREATE_PRODUCT,
        productData:{
            title,
            description,
            imageUrl,
            price
        }
    }
}

export const updateProduct = (id,title,description,imageUrl,price)=>{
    return {
        type:UPDATE_PRODUCT,
        productData:{
            pid:id,
            title,
            description,
            imageUrl,
            price
        }
    }
}