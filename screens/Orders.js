import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Image, Dimensions } from "react-native";
import { Button, Divider } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
// import { placeOrder,selectCurrentOrder } from "../redux/slices/ordersSlice";
import CartDish from "../components/CartDish";
import Receipt from "../components/Receipt";
import DishCard from "../components/DishCard";
import { placeOrder, selectCurrentOrder, selectCurrentTable,selectNumberOfDiners } from "../redux/slices/ordersSlice";
import { selectDishes, selectDishesByTypeWrapper } from "../redux/slices/dishesSlice";
import OrdersTabView from "../navigation/OrdersTabView";



const OrdersScreen = () => {

  // Write the logic of menuScreen
  const dispatch = useDispatch();
  const dishesByType = useSelector(selectDishesByTypeWrapper("main"));
  console.log("dishesByType are", dishesByType);

  const currentTableNum = useSelector(selectCurrentTable);
  const dishesCountInShoppingCart = (useSelector(selectCurrentOrder)).tobeAddedDishes.length;
  const dinersNum =  useSelector(selectNumberOfDiners);

  const ongoingDishes = (useSelector(selectCurrentOrder)).haveBeenPlacedDishes;
  const logo_img = require("../assets/restaurant_logo.png");

  const restaurant = {
    company:"Forks and Chopsticks Asian Restaurant",
    address:"Unit 69/155 Brebner Dr, West Lakes SA 5021",
    logo:logo_img
  };
  const bill = {
    subtotal:70,
    tax:7,
    total:77
  }

  const renderDishItem = ({item}) => {
    return (
      <DishCard dish={item} />
    );
  }


  return (
    <View style={styles.container}> 
      {
        /* Header will be put in the header of Stack Screen.
        <View style={styles.headerContainer}>
          <Image
            source={require("../assets/table.png")}
            resizeMode="contain"
            style={styles.headerImage}
          />
          <Text style={styles.headerText}>
            Table:{currentTableNum} | Diners: {dinersNum}
          </Text>
        </View>
        <Divider width={1.5} color={"white"} /> */
      }
      <View style={styles.leftColumn}>
          {/* <View style={styles.flatlistContainer}>  */}
            <FlatList
              data={dishesByType}
              numColumns={3}
              // width={(Dimensions.get('window').width)/2}
              contentContainerStyle={{ alignSelf: 'center' }}
              style={styles.flat_list}
              alignItems={dishesByType.length > 1 ? "flex-start":"center"}
              renderItem={renderDishItem}
            />    
          {/* </View> */}
        </View>
        <Divider orientation="vertical" width={2} />
        <View 
          style={styles.rightColumn}
        >
          {/* <View style={styles.receipt_container}> */}
            {/* <Receipt lineItems={ongoingDishes} header={restaurant} footer={bill}  /> */}
          {/* </View> */}
          <OrdersTabView style={{flex:1,backgroundColor:"pink"}}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor:"#5e0a9c"
  },
  leftColumn: {
    flex: 3,
    // backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlistContainer:{
    paddingTop: 20,
    backgroundColor:"#f0f0f0"
    // justifyContent:"flex-start",
    // alignItems:"center",
  },
  flat_list: {
    // height: 700,
    // flexGrow: 0,
    // flex:1,
    marginTop:40,
    paddingHorizontal: 10,
  },
  rightColumn: {
    flex: 2,
    backgroundColor: '#eee',
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingHorizontal:10
    height: Dimensions.get("window").height-120,
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
    backgroundColor:"green"
  }
});

export default OrdersScreen;
