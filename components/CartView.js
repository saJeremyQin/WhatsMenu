import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import CartDish from "./CartDish";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentOrder, placeOrder } from "../redux/slices/ordersSlice";
import { Button } from "react-native-elements";
import { useState } from "react";


const CartView = (props) => {
    // const [orderPlaced, setOrderPlaced] = useState(false);
    const dispatch = useDispatch();
    const shoppingCartDishes = (useSelector(selectCurrentOrder)).tobeAddedDishes;
    const numOfShoppingCartDishes = shoppingCartDishes.length;
    console.log("shopping dishes are", shoppingCartDishes);

    const btnPlaceOrderHandler = () => {
        dispatch(placeOrder());
        props.onOrderPlaced();
    };

    return (
        <View style={styles.container}>
        {
            numOfShoppingCartDishes == 0 ? (
                <Text style={styles.noDishesText}>
                    No dishes in your cart!
                </Text>
            ) : (
                <>
                <FlatList
                    style={styles.flatList}
                    data={shoppingCartDishes}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <CartDish dishId={item.dishId}/>
                        );
                    }}
                />
                <Button
                    title="Place Order"
                    buttonStyle={{
                        backgroundColor: 'rgba(111, 202, 186, 1)',
                        borderRadius: 5,
                    }}
                    // disabled={orderPlaced}
                    titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
                    containerStyle={{
                        marginVertical: 10,
                        alignSelf: 'center', // center the button horizontally
                        position:"absolute",
                        bottom:30
                    }}
                    onPress={btnPlaceOrderHandler}
                />  
                </>               
            )
        }   
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        // height:800
    },
    noDishesText: {
        flex:1,
        alignSelf:"center",
        // justifyContent:"center"
        textAlignVertical: "center",
        fontSize: 20
    },
    flatList: {
        marginTop:20,
        paddingHorizontal: 10,
    },
})

export default CartView;