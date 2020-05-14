export const DELETE_ITEM = "DELETE_ITEM";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";
import axios from "axios";
import Product from "../../models/product";


export const deleteItem = (pid)=>{
    return async (dispatch,getState)=> {
      //  await axios.delete(`https://rn-small-ecommerce-app.firebaseio.com/products/${pid}.json`);
       await fetch(`https://rn-small-ecommerce-app.firebaseio.com/products/${pid}.json`+
           "?auth="+getState().auth.token,{
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

    return async (dispatch,getState)=>{

       const resData = await  axios.post("https://rn-small-ecommerce-app.firebaseio.com/products.json"+
           "?auth="+getState().auth.token
           ,{
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
    return async (dispatch,getState)=>{

        // await axios.patch(`https://rn-small-ecommerce-app.firebaseio.com/products/${id}.json`+
        // "?auth="+getState().auth.token,)
        await fetch(`https://rn-small-ecommerce-app.firebaseio.com/products/${id}.json`+"?auth="+getState().auth.token,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                title,
                description,
                imageUrl,
                price,
            })
        });


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