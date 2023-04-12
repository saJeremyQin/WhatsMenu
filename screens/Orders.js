import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { Button, Divider } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder,selectCurrentOrder } from "../redux/slices/ordersSlice";
import CartDish from "../components/CartDish";

const OrdersScreen = () => {
  const [cartData, setCartData] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const shoppingCartDishes = (useSelector(selectCurrentOrder)).tobeAddedDishes;
  const dispatch = useDispatch();

  useEffect(()=>{
    setCartData(shoppingCartDishes);
  },[]);

  const btnPlaceOrderHandler = () => {
    // console.log("it is ok.");
    dispatch(placeOrder());
    setOrderPlaced(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
      {
        orderPlaced ? (
          <Image source={require("../assets/orderplaced.jpeg")} style={styles.orderplaced_img}/>
        ):
        (<FlatList
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
        />)
      }
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
              // backgroundColor:"pink"
            }}
            onPress={btnPlaceOrderHandler}
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
  orderplaced_img:{
    width:320,
    height:246
  },
  flatList:{
    // flexGrow: 0,
    marginTop:30,
    width:"80%"
  }
});

export default OrdersScreen;
