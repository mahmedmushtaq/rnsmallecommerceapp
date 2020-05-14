import {ADD_ORDER, SET_ORDERS} from "../actions/order";
import Order from "../../models/Order";

const initialState = {
    orders:[],
}

export default (state=initialState,actions)=>{
    switch (actions.type) {
        case SET_ORDERS:
            return {
                orders:actions.ordersArray,
            }
        case ADD_ORDER:
            const newOrder = new Order(actions.orderData.id,actions.orderData.items,actions.orderData.amount,actions.orderData.date);
            return {
                ...state,
                orders:state.orders.concat(newOrder)
            }
        default:
            return state;
    }
}