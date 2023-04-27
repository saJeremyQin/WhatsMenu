import * as React from "react";
import { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { Button } from '@rneui/themed';
import { useSelector,useDispatch } from "react-redux";
import { createOrder, selectOrders, selectTotalAmountByTableNumber } from "../redux/slices/ordersSlice";
import { useNavigation } from "@react-navigation/native";

const cardSize = 180;

const TableCard = props => {

  const tableNumber = props.tableNumber;
  const totalAmount = useSelector(selectTotalAmountByTableNumber(tableNumber));
  // totalAmount!==0 && console.log("totalAmount is", totalAmount);
  const cardStyle = totalAmount > 0 ? styles.highlightedCard : styles.defaultCard;


  const navigation = useNavigation();
  const dispatch = useDispatch();

  const tableCardClickHandler = () => {
    props.onTableCardClick(tableNumber);
  };
  
  return (
    <Pressable 
      // style={styles.container} 
      style={[styles.container,cardStyle]}
      onPress={tableCardClickHandler}
    >
        <Text style={styles.amount}>${totalAmount}</Text>
        <Image
            style={styles.image}
            resizeMode="contain"
            source={require("../assets/table.png")}
        />
        <Text style={styles.number}>{tableNumber}</Text>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    marginVertical:20
  },
  amount:{
    fontSize:22,
    color: "#f31282"
  },
  image:{
    width: 128,
    height:128
  },
  number:{
    fontSize:22,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 2,
    marginBottom: 15,
  },
  defaultCard: {
    // borderColor: '#dddddd',
    // borderWidth: 1,
  },
  highlightedCard: {
    // borderColor: '#f31282',
    // borderWidth: 1,
    // elevation: 5,
  },
 
});

export default TableCard;
