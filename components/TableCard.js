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
      <Card containerStyle={styles.container} wrapperStyle={{alignItems:"center"}}>
        <Card.Title style={styles.title}>${totalAmount}</Card.Title>
        <Card.Divider />
        <View
          style={{
            position: "relative",
          }}
        >
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require("../assets/table.png")}
          />
          <Text>{tableNumber}</Text>
          {/* <Pressable
            activeOpacity={0.5}
            style={[styles.add_circle, { backgroundColor:"#EA5755" }]}
            onPress={toggleAddDishToChart}
          >
            {added ? (
              <MaterialIcons name="done" size={18} />
            ) : (
              <AntDesign name="plus" size={18} />
            )}
          </Pressable> */}
        </View>
      </Card>
  );
}


const styles = StyleSheet.create({
  container:{
    // borderWidth: 1,
    // borderColor:"#52f",
    // borderTopLeftRadius:5,
    // borderTopRightRadius:5,
    backgroundColor:"#ff4081"
  },
  title:{
    fontSize:22
  },
  image:{
    width: cardSize,
    height:cardSize/1.25
  },
  description:{
    fontSize:20
  },
  price:{
    fontSize:22
  },
//   add_circle:{
//     position:"absolute",
//     bottom:2,
//     right:2,
//     justifyContent: "center",
//     alignItems: "center",
//     width:cardSize/6,
//     height:cardSize/6,
//     borderRadius:cardSize/3
//   }
});

export default TableCard;



// <View style={styles.container}>
// <TouchableOpacity
//   onPress={() => navigation.navigate("SingleDish", { dish, setAdded })}
//   activeOpacity={0.7}
//   style={[
//     styles.bottom_container,
//     { backgroundColor: colors.dish.background },
//   ]}
// >
//   <Image
//     source={{
//       uri: image || blankImage,
//     }}
//     style={styles.image}
//   />
//   <Text style={[styles.title, { color: colors.dish.title }]}>
//     {dishTitle || "N/A"}
//   </Text>
//   <Text style={[styles.description, { color: colors.dish.description }]}>
//     {dishDescription || "N/A"}
//   </Text>
//   <Text style={[styles.price, { color: colors.dish.price }]}>
//     {currency.sign} {price || "N/A"}
//   </Text>
//   <TouchableOpacity
//     activeOpacity={0.5}
//     style={[styles.add_circle, { backgroundColor: colors.accent }]}
//     onPress={handleAddClick}
//   >
//     {added ? (
//       <MaterialIcons name="done" size={18} />
//     ) : (
//       <AntDesign name="plus" size={18} />
//     )}
//   </TouchableOpacity>
// </TouchableOpacity>
// </View>