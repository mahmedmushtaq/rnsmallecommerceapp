import React,{useState,useEffect,useCallback} from "react";
import { FlatList, ActivityIndicator, Platform} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/ui/customheaderbutton";
import ProductsOverview from "./ProductOverview";
import OrderItem from "../../components/store/OrderItem";
import {fetchOrders} from "../../store/actions/order";
import Colors from "../../constants/Colors";


const OrderScreen = props=>{
   const orders  =  useSelector(state=>state.orders.orders);
   const [isLoading,setLoading] = useState(true);

   const dispatch = useDispatch();

   const loadOrders = useCallback(async ()=>{
       await dispatch(fetchOrders());
       setLoading(false);
   },[dispatch]);

   useEffect(()=>{
       loadOrders();
   },[loadOrders]);


   if(isLoading){
       return (
           <ActivityIndicator
               size={"large"}
               color={Colors.primary}
               style={{flex:1,alignItems:"center",justifyContent:"center"}}
           />
       )
   }

    return(
        <FlatList data={orders} renderItem={itemData=>(
            <OrderItem amount={itemData.item.totalAmount}
                   date={itemData.item.readableDate} items={itemData.item.items}
            />
        )}/>
    )
}

OrderScreen.navigationOptions = (navData)=> {
    return {
        headerTitle: "All Orders",
        headerLeft:()=>(
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title={"Cart"} iconName={Platform.OS === 'android' ? 'md-menu':'ios-menu'}
                      onPress={()=>{navData.navigation.toggleDrawer()}}/>
            </HeaderButtons>
        ),

    }
}

export default OrderScreen;