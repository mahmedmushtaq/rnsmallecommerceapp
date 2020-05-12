import React from "react";
import {Button, FlatList, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import ProductItem from "../../components/store/ProductItem";
import {HeaderButtons,Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/ui/customheaderbutton";
import Colors from "../../constants/Colors";
import * as cartAction from "../../store/actions/cart";
import {deleteItem} from "../../store/actions/products";


const UserProduct = props=>{
    const userProducts = useSelector(state=>state.products.userProducts);
    const dispatch = useDispatch();
    return(
        <FlatList data={userProducts} renderItem={itemData=><ProductItem
            title={itemData.item.title}
            price={itemData.item.price}
            image={itemData.item.imageUrl}
            onSelect={()=>{}}
            onAddToCart={()=>{}}
        >
            <Button color={Colors.primary} title={"Edit"}
                    onPress={()=>props.navigation.navigate("EditProduct",{productId:itemData.item.id})}/>
            <Button title={"Delete"} onPress={()=>dispatch(deleteItem(itemData.item.id))}/>
        </ProductItem>
        }/>
    )
};

UserProduct.navigationOptions = navData=>{
    return{
        headerTitle:"Your Products",
        headerLeft:()=>(
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item iconName={"md-menu"} title={"menu"} onPress={()=>navData.navigation.toggleDrawer()}/>
            </HeaderButtons>
        ),
        headerRight:()=>(
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item iconName={"md-add"} title={"add"} onPress={()=>navData.navigation.navigate("EditProduct")}/>
        </HeaderButtons>
    )
    }
}

export default UserProduct;