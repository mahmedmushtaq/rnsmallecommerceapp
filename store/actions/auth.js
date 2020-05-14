export const SET_USER = "SET_USER";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
import axios from "axios";
import {AsyncStorage} from "react-native";

export const logout = ()=>{
    return dispatch=>{
        AsyncStorage.removeItem("userData");

       dispatch({
           type:LOGOUT,
       })

}}


export const dispatchLogin = (userId,token)=>({
    type:LOGIN,
    token:token,
    userId:userId,
})

export const signUp = (email,password)=>{
    return async dispatch=>{


        const resData = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp" +
            "?key=AIzaSyCIn8VpOaK5jWv516bzRySon_z5gdLhCbg",{
            email,
            password,
            returnSecureToken:true,
        }).catch(err=>{
            throw new Error(err.response.data.error.message);
        })





        dispatch({
            type:SET_USER,
            token:resData.data.idToken,
            userId:resData.data.localId,
        })

        const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.data.expiresIn) * 1000
        );

        saveDataToStorage(resData.data.idToken, resData.data.localId, expirationDate);


    }
}

export const login = (email,password)=>{
    return async dispatch =>{
        const resData  = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword"+
            "?key=AIzaSyCIn8VpOaK5jWv516bzRySon_z5gdLhCbg",{
            email,
            password,
            returnSecureToken:true,
        }).catch(err=>{

            throw new Error(err.response.data.error.message);
        });



        dispatch(dispatchLogin(resData.data.userId,resData.data.idToken));
        const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.data.expiresIn) * 1000
        );

        saveDataToStorage(resData.data.localId,resData.data.idToken,  expirationDate);


    }
}

const saveDataToStorage = (userId,token,expiryDate)=>{
    AsyncStorage.setItem("userData",JSON.stringify({
        token,
        userId,
        expiryDate:expiryDate.toISOString(),
    }));
}