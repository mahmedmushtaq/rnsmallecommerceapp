import React,{useEffect,useState,useCallback} from "react";
import {StyleSheet, View, Text, FlatList,ActivityIndicator, Platform, Button} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import ProductItem from "../../components/store/ProductItem";
import * as cartAction from "../../store/actions/cart";
import {HeaderButtons,Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/ui/customheaderbutton";
import Colors from "../../constants/Colors";
import {loadData} from "../../store/actions/products";




const ProductsOverview = props=>{
    const products = useSelector(state=>state.products.availableProducts);
    const dispatch = useDispatch();
    const [isRefreshing,setRefreshing] = useState(false);
    const [isLoading,setLoading] = useState(true);

    const loadProducts = useCallback(async ()=>{
        setRefreshing(true);
        await dispatch(loadData());
        setRefreshing(false);
    }, [dispatch,setLoading])



    useEffect(() => {
        const willFocusSub = props.navigation.addListener(
            'willFocus',
            loadProducts
        );

        return () => {
            willFocusSub.remove();
        };
    }, [loadProducts]);

    useEffect(() => {
        loadProducts().then(()=>{
            setLoading(false);
        });

    }, [dispatch, loadProducts]);



    const productDetails = (id,title)=>{
        props.navigation.navigate("ProductDetail",{
            productId:id,
            productTitle:title,
        })
    }

    if(isLoading){
        return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator/>
        </View>
    }

    return(

        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}
            renderItem={itemData=><ProductItem image={itemData.item.imageUrl}
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