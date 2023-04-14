import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import CartDish from "../components/CartDish";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentOrder, placeOrder } from "../redux/slices/ordersSlice";
import { Button } from "react-native-elements";
import { useState } from "react";


const CartView = () => {
    const [orderPlaced, setOrderPlaced] = useState(false);
    const dispatch = useDispatch();
    const shoppingCartDishes = (useSelector(selectCurrentOrder)).tobeAddedDishes;
    console.log("shopping dishes are", shoppingCartDishes);

    const btnPlaceOrderHandler = () => {
        // console.log("it is ok.");
        dispatch(placeOrder());
        setOrderPlaced(true);
    };

    return (
        <View style={styles.container}>
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
                disabled={orderPlaced}
                titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
                containerStyle={{
                    marginHorizontal: 50,
                    height: 50,
                    width: 200,
                    marginVertical: 10,
                    position:"absolute",
                    bottom:20
                }}
                onPress={btnPlaceOrderHandler}
            />   
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"green"
    },
    flat_list: {
        marginTop:40,
        paddingHorizontal: 10,
    },
})

export default CartView;