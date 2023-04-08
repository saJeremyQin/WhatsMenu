import * as React from "react";
import { useState, useEffect } from "react";
import { Card, Icon } from "react-native-elements";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { Button } from '@rneui/themed';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useSelector,useDispatch } from "react-redux";
import { createOrder } from "../redux/slices/ordersSlice";
import { useNavigation } from "@react-navigation/native";


const cardSize = 180;

const TableCard = props => {

  const tableNumber = props.tableNumber;
  const totalAmount = props.totalAmount;
  const navigation = useNavigation();

  const dispatch = useDispatch();

  // check table status, if it is ongoing
  const tableClickHandler = () => {
    console.log("table number is ", tableNumber);
    dispatch(
      createOrder({
        tableNumber:tableNumber,
        numberOfDiners:3
      })
    );
    navigation.navigate("Menu");
    
  }
  
  
  return (
    <Pressable style={styles.container} onPress={tableClickHandler}>
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
    // color: "#f31282"
  }
 
});

export default TableCard;
