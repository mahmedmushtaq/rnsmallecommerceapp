import {  createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
import {createStackNavigator} from "react-navigation-stack";
import {createDrawerNavigator} from "react-navigation-drawer";
import UserProduct from "../screens/user/UserProduct";

import CartScreen from "../screens/store/CartScreen";
import Colors from '../constants/Colors';
import ProductsOverview from "../screens/store/ProductOverview";
import ProductDetail from "../screens/store/ProductDetails";
import OrderScreen from "../screens/store/OrderScreen";
 import {Ionicons} from "@expo/vector-icons";
 import EditProduct from "../screens/user/EditProduct";
 import React from "react";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/ui/customheaderbutton";


const defaultNavigator = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary

};

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview:{
            screen:ProductsOverview,

        },
        ProductDetail,
        Cart: {
            screen:CartScreen
        }
    },
    {
        defaultNavigationOptions: {
            ...defaultNavigator
        },

    }
);


const UserProductNavigator= createStackNavigator({
     UserProduct,
    EditProduct,
},{
    defaultNavigationOptions:{
        ...defaultNavigator
    },

})

const OrderNavigator = createStackNavigator({
       Order:{
           screen:OrderScreen,

       }
    },
    {
        defaultNavigationOptions: {
            ...defaultNavigator
        },


})



const Drawer = createDrawerNavigator({
    Products:ProductsNavigator,
    Order:OrderNavigator,
    UserProduct:{
        screen:UserProductNavigator,
        navigationOptions:{
            drawerLabel:"Your products"
        }
    }
},{
    contentOptions:{
        activeTintColor:Colors.primary
    },

});


export default createAppContainer(Drawer);
