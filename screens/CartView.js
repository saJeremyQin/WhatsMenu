import React from "react";
import { StyleSheet, View, Text } from "react-native";
import CartDish from "../components/CartDish";

const CartView = () => {


    return (
        <View>
            {/* <FlatList
                style={styles.flatList}
                data={cartData}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <CartDish dishId={item.dishId}/>
                    );
                }}
            /> */}
            <Text style={{fontSize:30}}>This is CartData</Text>
        </View>
    )
}

export default CartView;