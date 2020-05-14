export const DELETE_ITEM = "DELETE_ITEM";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";
import axios from "axios";
import Product from "../../models/product";


export const deleteItem = (pid)=>{
    return async dispatch=> {
      //  await axios.delete(`https://rn-small-ecommerce-app.firebaseio.com/products/${pid}.json`);
       await fetch(`https://rn-small-ecommerce-app.firebaseio.com/products/${pid}.json`,{
            method:"DELETE",

        });

        dispatch({
            type: DELETE_ITEM,
            pid,
        })
    }
}

export const loadData = ()=>{
    return async dispatch=>{
        const res = await axios.get("https://rn-small-ecommerce-app.firebaseio.com/products.json");

        let payload = [];
        for(let key in res.data){
            const data = res.data[key];


            const product = new Product(key,"u1",data.title,data.imageUrl,data.description,data.price);

            payload.push(product);
        }

        dispatch({
            type:SET_PRODUCT,
            payload,

        })
    }
}

export const createProduct = (title,description,imageUrl,price)=>{

    return async dispatch=>{

       const resData = await  axios.post("https://rn-small-ecommerce-app.firebaseio.com/products.json",{
            title:title,
            description:description,
            imageUrl:imageUrl,
            price:price,
        })




        dispatch({
            type:CREATE_PRODUCT,
            productData:{
                title,
                description,
                imageUrl,
                price
            }
        });


    }
}

export const updateProduct = (id,title,description,imageUrl,price)=>{
    return async dispatch=>{

        await axios.patch(`https://rn-small-ecommerce-app.firebaseio.com/products/${id}.json`,{
            title,
            description,
            imageUrl,
            price,
        })


        dispatch({
            type:UPDATE_PRODUCT,
            productData:{
                pid:id,
                title,
                description,
                imageUrl,
                price
            }
        });
    }
}