import React from "react";
import {StyleSheet, View, FlatList, Text, Platform} from "react-native";
import {useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/ui/customheaderbutton";
import ProductsOverview from "./ProductOverview";
import OrderItem from "../../components/store/OrderItem";


const OrderScreen = props=>{
   const orders  =  useSelector(state=>state.orders.orders);


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