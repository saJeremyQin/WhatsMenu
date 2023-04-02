import * as React from "react";
import { useState, useEffect } from "react";
import { Card, Icon } from "react-native-elements";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { Button } from '@rneui/themed';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useSelector,useDispatch } from "react-redux";

const cardSize = 180;

const TableCard = props => {
    const tableNumber = props.tableNumber;
    const totalAmount = props.totalAmount;
  
  return (
    <Pressable style={styles.container}>
        <Text style={styles.amount}>${totalAmount}</Text>
        <Image
            style={styles.image}
            resizeMode="contain"
            source={require("../assets/table.png")}
        />
        <Text style={styles.number}>{tableNumber}</Text>
    </Pressable>
  );
}


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
