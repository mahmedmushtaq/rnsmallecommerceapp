import React from "react";
import {View,Text,StyleSheet,Image,Button,TouchableOpacity,TouchableNativeFeedback,Platform} from "react-native";
import Colors from "../../constants/Colors";

const ProductItem = props=>{
    let TouchableCmp = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback;
    }
    return(
        <TouchableCmp onPress={props.onSelect} useForeground>
            <View style={styles.product}>
                <Image style={styles.image} source={{uri:props.image}}/>
                <View style={styles.details}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                </View>
                <View style={styles.actions}>
                    {
                        props.children
                    }
                </View>
            </View>
        </TouchableCmp>
    )
}

const styles= StyleSheet.create({
  product:{
      shadowColor:"black",
      shadowOpacity:.26,
      shadowOffset:{width:0,height:2},
      shadowRadius:8,
      elevation:5,
      borderRadius:10,
      backgroundColor:"white",
      height:350,
      margin:20,

  },
    image:{
      width: "100%",
        height:"60%",
    },
    title:{
      fontFamily:"open-sans-bold",
      fontSize:18,
        marginVertical:4,
    },
    price:{
      fontSize: 18,
        color:"#888",
    },
    details:{
      alignItems:"center",

        padding:10,
        justifyContent: "center",
    },
    actions:{
      flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",

        padding:10,
    }
})

export default ProductItem;
