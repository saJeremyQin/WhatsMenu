import * as React from "react";
import { useState } from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { useSelector,useDispatch } from "react-redux";
import { resumeOrder, selectTotalAmountByTableNumber } from "../redux/slices/ordersSlice";
import { useNavigation } from "@react-navigation/native";
import HighlightedTable from "./HighlightedTable";
import { THEME, windowHeight,windowWidth } from "../globals/constants";
import { Colors } from "react-native/Libraries/NewAppScreen";

// React.memo to prevent unnecessary re-renders if the parent component re-renders but the props of TableCard component do not change.
const TableCard = React.memo(({tableNumber,onNeedCreateOrder}) => {
  console.log(`TableCard ${tableNumber} is rendering.`)
  const { colors } = THEME;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const hasOrder = useSelector((state) => 
    state.allOrders.orders.some((order) => order.tableNumber === tableNumber)
  );


  const totalAmount = useSelector(selectTotalAmountByTableNumber(tableNumber));
  const cardStyle = totalAmount > 0 ? styles.highlightedCard : styles.defaultCard;

  // const navigation = useNavigation();
  // const dispatch = useDispatch();

  // const tableCardClickHandler = React.useCallback(() => {
  //   onTableCardClick(tableNumber);
  // }, [onTableCardClick, tableNumber]);
  const handleClick = () => {
    if(!hasOrder) {
      onNeedCreateOrder(tableNumber);
    } else {
      dispatch(resumeOrder({tableNumber}));
      navigation.navigate("Orders");
    }
  }
  
  return (
    <Pressable 
      style={[styles.container,cardStyle]}
      onPress={handleClick}
    >
        {totalAmount > 0 && <HighlightedTable style={styles.tableStyle} />}
        <Text style={[styles.amount, {color: colors.text}]}>${totalAmount}</Text>
        <Image
            style={styles.image}
            resizeMode="contain"
            source={require("../assets/table.png")}
        />
        <Text style={[styles.number, {color:colors.darkText}]}>{tableNumber}</Text>
    </Pressable>
  );
});


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    marginVertical: 0.02*windowHeight,
    marginHorizontal:0.01*windowWidth,
    borderRadius: 0.01*windowWidth
  },
  amount:{
    fontSize:20,
  },
  image:{
    // width: 128,
    width:0.12*windowWidth,
    height:0.12*windowWidth,
    // height:128
  },
  number:{
    fontSize:18,
  },
  defaultCard: {
    // because of transparent
  },
  highlightedCard: {
    // borderRadius:10,
    borderRadius:0.01*windowWidth,
    overflow: "hidden"
  },
  tableStyle: {
    //some styles want to pass down to HighlightedTable
  }
});

export default TableCard;
