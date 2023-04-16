import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { Button, Divider } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder,selectCurrentOrder } from "../redux/slices/ordersSlice";
import CartDish from "../components/CartDish";
import Receipt from "../components/ReceiptView";

const OrdersScreen = () => {
  const [cartData, setCartData] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const shoppingCartDishes = (useSelector(selectCurrentOrder)).tobeAddedDishes;
  const ongoingDishes = (useSelector(selectCurrentOrder)).haveBeenPlacedDishes;
  console.log("ongoing are",ongoingDishes);
  const dispatch = useDispatch();

  const logo_img = require("../assets/restaurant_logo.png");
  const restaurant = {
    company:"Forks and Chopsticks Asian Restaurant",
    address:"Unit 69/155 Brebner Dr, West Lakes SA 5021",
    logo:logo_img
  }

  const dishItems=[
    {
      name:"Fish&Chips",
      quantity: 1,
      price:30
    },
    {
      name:"Honey Chicken",
      quantity:2,
      price:20
    }
  ];

  const bill = {
    subtotal:70,
    tax:7,
    total:77
  }

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
      {/*  { items, subtotal, tax, discount, total } = props; */
          
      }
      <View style={styles.receipt_container}>
        <Receipt lineItems={ongoingDishes} header={restaurant} footer={bill}  />
      </View>
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
  },
  receipt_container:{
    flex:1,
    width:"80%",
    height:"80%",
    justifyContent:"center",
    alignItems:"center",
    // backgroundColor:"green"
  }
});

export default OrdersScreen;
