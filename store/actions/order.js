export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";
import axios from "axios";


export const fetchOrders = ()=>{
    return async dispatch=>{

        const resData = await axios.get("https://rn-small-ecommerce-app.firebaseio.com/orders/u1.json");

        const ordersArray = [];
        for(let key in resData.data){
            const data = resData.data[key];
            ordersArray.push(new Order(key,data.cartItems,data.totalAmount,new Date(data.date)))
        }

        dispatch({
            type:SET_ORDERS,
            ordersArray,
        })

    }
}

export const addOrder = (cartItems,totalAmount)=>{
    const date= new Date();
    return async dispatch=>{

        const resData = await axios.post("https://rn-small-ecommerce-app.firebaseio.com/orders/u1.json",{
            cartItems,
            totalAmount,
            date:date.toISOString(),
        })


        dispatch({
            type:ADD_ORDER,
            orderData:{id:resData.data.name,items:cartItems,amount:totalAmount,date:date}
        })
    }
}