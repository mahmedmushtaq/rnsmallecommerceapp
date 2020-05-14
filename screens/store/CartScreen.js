import React,{useState} from "react";
import {View,Button,Text,FlatList,StyleSheet,ActivityIndicator} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/store/CartItem";
import {removeItem} from "../../store/actions/cart";
import cart from "../../store/reducers/cart";
import {addOrder} from "../../store/actions/order";


const CartScreen = props=>{
    const amount = useSelector(state=>state.cart.totalAmount);
    const dispatch  = useDispatch();
    const [isLoading,setLoading] = useState(false);

    const cartItems = useSelector(state=>{
        const transformedCartItems = [];
        for(let key in state.cart.items){
            transformedCartItems.push({
                productId:key,
                productTitle: state.cart.items[key].title,
                productPrice: state.cart.items[key].price,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            })
        }

        return transformedCartItems.sort((a,b)=> a.productId > b.productId ? 1: -1);
    })

    const addOrderHandler = async ()=>{
        setLoading(true);
        await dispatch(addOrder(cartItems,amount));
        setLoading(false);
    }

    return(
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                      Total: <Text style={styles.amount}>${amount.toFixed(2)}</Text>
                </Text>
                {isLoading ? <ActivityIndicator/> : <Button
                    title={"Order now"}
                    disabled={cartItems.length === 0}
                    onPress={addOrderHandler}
                />
                }
            </View>

            <FlatList
              data={cartItems}
              keyExtractor={item=>item.productId}
              renderItem={itemData=>
              <CartItem
                  quantity={itemData.item.quantity}
                  title={itemData.item.productTitle}
                  amount={itemData.item.sum}

                  onRemove={()=>{dispatch(removeItem(itemData.item.productId))}}

              />}
            />


        </View>
    )
}

const styles= StyleSheet.create({
    screen:{margin:20,},
    summary:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginBottom:20,
        padding:10,
        shadowColor:"black",
        shadowOpacity:.26,
        shadowOffset:{width:0,height:2},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor:"white",
    },
    summaryText:{
        fontFamily:"open-sans-bold",
        fontSize:18,
    },
    amount:{
        color:Colors.primary,
    },
});

export default CartScreen;