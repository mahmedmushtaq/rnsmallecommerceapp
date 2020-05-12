import React from "react";
import {View ,ScrollView,Text,Button,StyleSheet,Image} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import * as cartAction from "../../store/actions/cart";

const ProductDetail = props=>{
    const productId = props.navigation.getParam("productId");
    const selectedProduct = useSelector(state=>state.products.availableProducts.find(product=>product.id === productId));

    const dispatch = useDispatch();
    return(
       <ScrollView>
           <View>
               <Image source={{uri:selectedProduct.imageUrl}} style={styles.image}/>
               <View style={styles.actions}>
                   <Button title={"Add Item To Cart"} onPress={()=>{
                       dispatch(cartAction.addItem(selectedProduct))
                   }}/>
               </View>

               <Text style={styles.price}>${selectedProduct.price}</Text>
               <Text style={styles.description}>{selectedProduct.description}</Text>
           </View>
       </ScrollView>
    )
};

ProductDetail.navigationOptions = navData=>{
    const productTitle = navData.navigation.getParam("productTitle");
    return{
        headerTitle:productTitle,
    }
}

const styles = StyleSheet.create({
    image:{
        height:300,
        width:"100%",
    },
    price:{
        fontSize:20,
        color:"#888",
        textAlign:"center",
        marginVertical:20,
        fontFamily:"open-sans-bold",
    },
    description:{
        fontSize:14,
        textAlign:"center",
        marginHorizontal:20,


    },
    actions:{
        marginVertical: 10,
        alignItems:"center",
    }
})


export default ProductDetail;