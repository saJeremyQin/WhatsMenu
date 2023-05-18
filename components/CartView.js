import React,{useState} from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-native-elements";
import { THEME, windowHeight,windowWidth } from "../globals/constants";
import { selectCurrentOrder, placeOrder } from "../redux/slices/ordersSlice";
import CartDish from "./CartDish";

const CartView = ({onOrderPlaced}) => {
    const {colors} = THEME;
    const dispatch = useDispatch();
    const shoppingCartDishes = (useSelector(selectCurrentOrder))?.shoppingCartDishes;
    const numOfShoppingCartDishes = shoppingCartDishes.length;

    const btnPlaceOrderHandler = () => {
        dispatch(placeOrder());
        onOrderPlaced();
    };

    if(numOfShoppingCartDishes === 0) {
        return (
            <View style={styles.container}>
                <Text style={[styles.noDishesText, {color:colors.dialogPrimary}]}>
                    No dishes in your cart!
                </Text>
            </View>
        );
    }
    
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
                    backgroundColor: colors.accent,
                    borderRadius: 5,
                }}
                // disabled={orderPlaced}
                titleStyle={{ fontWeight: 'bold', fontSize: 18 }}
                containerStyle={{
                    marginVertical: 0.01*windowHeight,
                    alignSelf: 'center', // center the button horizontally
                    position:"absolute",
                    bottom:0.06*windowHeight,
                    // height:0.04*windowHeight
                }}
                onPress={btnPlaceOrderHandler}
            />  
        </View>
    );
};

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    noDishesText: {
        flex:1,
        alignSelf:"center",
        textAlignVertical: "center",
        fontSize: 20
    },
    flatList: {
        // marginTop:20,
        marginTop: 0.03*windowHeight,
        // paddingHorizontal: 10,
        paddingHorizontal:0.01*windowWidth
    },
})

export default CartView;