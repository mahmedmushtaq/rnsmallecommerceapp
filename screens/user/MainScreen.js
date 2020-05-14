import React,{useState,useEffect} from "react";
import {
    View,
    ActivityIndicator,
    AsyncStorage,

} from "react-native";
import {useDispatch} from "react-redux";
import {dispatchLogin} from "../../store/actions/auth";


const MainScreen = props=>{
    const [isAlreadyLogin,setAlreadyLogin] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        const check = async ()=>{
            const data = await AsyncStorage.getItem("userData");
            if(!data){
                props.navigation.navigate("Auth");
                return;
            }

            const transformedData = JSON.parse(data);
            const { token, userId, expiryDate } = transformedData;
            const expirationDate = new Date(expiryDate);

            if (expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth');
                return;
            }



            dispatch(dispatchLogin(userId, token));
            props.navigation.navigate('Shop');



        }
        check();
    },[dispatch]);

    return(
        <ActivityIndicator/>
    )
}

export default MainScreen;