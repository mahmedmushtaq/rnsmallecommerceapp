import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from "react-redux";
import {combineReducers, createStore,applyMiddleware} from "redux";
import productsReducer from "./store/reducers/products";
import ShopNavigation from "./navigation/ShopNavigation";
import * as Font from "expo-font";
import {AppLoading} from "expo";
import cart from "./store/reducers/cart";
import orders from "./store/reducers/order";
import thunk from "redux-thunk";

const rootReducer= combineReducers({
  products:productsReducer,
  cart,
  orders,
})

const store = createStore(rootReducer,applyMiddleware(thunk));

const fetchFonts = ()=>{
    return Font.loadAsync({
        "open-sans":require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold":require("./assets/fonts/OpenSans-Bold.ttf"),
    })
}

export default function App() {
    const [isFontsLoaded,setFontLoaded] = useState(false);
    if(!isFontsLoaded){
        return <AppLoading startAsync={fetchFonts} onFinish={()=>setFontLoaded(true)}/>
    }
    return (
        <Provider store={store}>
            <ShopNavigation />
        </Provider>
  );
}


