import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Divider } from "react-native-elements";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../redux/slices/ordersSlice";
import CartDish from "../components/CartDish";

const OrdersScreen = () => {
  const [cartData, setCartData] = useState([]);
  const shoppingCartDishes = (useSelector(selectCurrentOrder)).tobeAddedDishes;

  useEffect(()=>{
    setCartData(shoppingCartDishes);
  },[]);

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <FlatList
          style={styles.flatList}
          data={cartData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <CartDish
                dishId={item.dishId}
              />
            );
          }}
        />
      </View>
      <Divider orientation="vertical" />
      <View style={styles.rightColumn}>
        <Text>This is the right column</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftColumn: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightColumn: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList:{
    // flexGrow: 0,
    marginTop:30,
    width:"80%"
  }
});

export default OrdersScreen;
