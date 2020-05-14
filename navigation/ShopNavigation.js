import {createAppContainer, createSwitchNavigator, SafeAreaView} from 'react-navigation';
import { Platform } from 'react-native';
import {createStackNavigator} from "react-navigation-stack";
import {createDrawerNavigator, DrawerNavigatorItems} from "react-navigation-drawer";
import UserProduct from "../screens/user/UserProduct";

import CartScreen from "../screens/store/CartScreen";
import Colors from '../constants/Colors';
import ProductsOverview from "../screens/store/ProductOverview";
import ProductDetail from "../screens/store/ProductDetails";
import OrderScreen from "../screens/store/OrderScreen";
import AuthScreen from "../screens/user/AuthScreen";
 import EditProduct from "../screens/user/EditProduct";
 import React from "react";
import MainScreen from "../screens/user/MainScreen";
import {Button,View} from "react-native";
import {useDispatch} from "react-redux";
import {logout} from "../store/actions/auth";


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
    contentComponent:props=>{
        const dispatch = useDispatch();

        return(
            <View style={{flex:1,padding:20}}>
                <SafeAreaView>
                    <DrawerNavigatorItems {...props}/>
                    <Button
                        onPress={()=>{
                                  dispatch(logout());

                                  props.navigation.navigate("Auth");
                        }}
                        title={"Logout"}
                        color={Colors.primary}/>
                </SafeAreaView>
            </View>
        )
    }

});


const Auth = createStackNavigator({
    Auth:{
        screen:AuthScreen,
        navigationOptions:{
            headerTitle: "Authentication",
        }
    },
},{
    defaultNavigationOptions:{
        ...defaultNavigator,
    }
})

const MainNavigation = createSwitchNavigator({
    MainScreen,
    Auth,
    Shop:Drawer,

})

export default createAppContainer(MainNavigation);
