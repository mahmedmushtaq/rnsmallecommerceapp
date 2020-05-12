import products from "../../data/dummy-data";
import Product from "../../models/product";
import {CREATE_PRODUCT,UPDATE_PRODUCT, DELETE_ITEM} from "../actions/products";

const initialState= {
    availableProducts:products,
    userProducts:products.filter(product=>product.ownerId === "u1"),
}

export default (state=initialState,actions)=>{
    switch (actions.type) {
        case DELETE_ITEM:

            return {
                ...state,
                userProducts: state.userProducts.filter(product=>product.id !== actions.pid),
                availableProducts: state.availableProducts.filter(product=>product.id !== actions.pid)
            }
        case CREATE_PRODUCT:
            const newProduct = new Product(new Date().toString(),"u1"
                ,actions.productData.title
                ,actions.productData.imageUrl,
                actions.productData.description,
                actions.productData.price,
            )
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct),

            }
        case UPDATE_PRODUCT:
            const productIndex= state.userProducts.findIndex(prod=>prod.id === actions.productData.pid);
            const updateProduct = new Product(actions.productData.pid,
                state.userProducts[productIndex].ownerId
                ,actions.productData.title
                ,actions.productData.imageUrl,
                actions.productData.description,
                actions.productData.price,
                )
            const updateUserProduct = [...state.userProducts];
            updateUserProduct[productIndex] = updateProduct;
            const updateAvailableProductIndex= state.availableProducts.findIndex(prod=>prod.id === actions.productData.pid);
            const updateAvailableProduct = [...state.availableProducts];
            updateAvailableProduct[updateAvailableProductIndex] = updateProduct;

            return{
                ...state,
                availableProducts: updateAvailableProduct,
                userProducts: updateUserProduct,



            }
    }


    return state;
}