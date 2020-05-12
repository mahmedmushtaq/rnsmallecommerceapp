import React from "react";
import {StyleSheet, View, Text, FlatList, Platform, Button} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import ProductItem from "../../components/store/ProductItem";
import * as cartAction from "../../store/actions/cart";
import {HeaderButtons,Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/ui/customheaderbutton";
import Colors from "../../constants/Colors";




const ProductsOverview = props=>{
    const products = useSelector(state=>state.products.availableProducts);
    const dispatch = useDispatch();

    const productDetails = (id,title)=>{
        props.navigation.navigate("ProductDetail",{
            productId:id,
            productTitle:title,
        })
    }
    return(

        <FlatList data={products} renderItem={itemData=><ProductItem image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onSelect={()=>{
            productDetails(itemData.item.id,itemData.item.title);
        }}
       >
            <Button color={Colors.primary} title={"View Details"} onPress={()=>{
                productDetails(itemData.item.id,itemData.item.title);
            }
            }/>
            <Button title={"To Cart"} onPress={()=>
                dispatch(cartAction.addItem(itemData.item))}/>
        </ProductItem>
        }

        />
    )
}



ProductsOverview.navigationOptions = (navData)=> {
  return {
      headerTitle: "All Products",
      headerLeft:()=>(
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item title={"Cart"} iconName={Platform.OS === 'android' ? 'md-menu':'ios-menu'}
                    onPress={()=>{navData.navigation.toggleDrawer()}}/>
          </HeaderButtons>
      ),
      headerRight:()=>(
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item title={"Cart"} iconName={Platform.OS === 'android' ? 'md-cart':'ios-cart'}
                    onPress={()=>{navData.navigation.navigate("Cart")}}/>
          </HeaderButtons>
      )
  }
}

export default ProductsOverview;