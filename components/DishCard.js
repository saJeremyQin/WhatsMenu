import * as React from "react";
import { useState, useEffect } from "react";
import { Card, Icon } from "react-native-elements";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { Button } from '@rneui/themed';
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const cardSize = 180;


const DishCard = props => {

  // set the flag of if this dish is added
  const [added, setAdded] = useState(false);
  const [dishName, setDishName] = useState();
  const [dishDescription, setDishDescription] = useState();

  const dish = props.dish;

  function TrimText() {
    if(dish.name.length >= 15)
      setDishName(`${dish.name.slice(0,15)}...`);
    else
      setDishName(dish.name);
    
    if(dish.description.length >=15)
      setDishDescription(`${dish.description.slice(0,15)}...`);
    else
      setDishDescription(dish.description);
  }

  function CheckAdded() {
    // Check the staus, if the dish can be found in tobeAddedDishes of currentOrder
  }

  useEffect(()=>{
    TrimText();
  },[]);

  useEffect(()=>{

  },[]);

  const addDishToCartHandler = () => {
    console.log("Add dish to Shopping Cart");
  };
  
  return (
      <Card containerStyle={styles.container} wrapperStyle={{alignItems:"center"}}>
        <Card.Title style={styles.title}>{dishName}</Card.Title>
        <Card.Divider />
        <View
          style={{
            position: "relative",
            // alignItems: "center"
          }}
        >
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{
              uri:dish.image 
            }}
          />
          <Text>{dishDescription}</Text>
          <Text style={styles.price}>${dish.price}</Text>
          <Pressable
            activeOpacity={0.5}
            style={[styles.add_circle, { backgroundColor:"#FD9228" }]}
            onPress={addDishToCartHandler}
          >
            {added ? (
              <MaterialIcons name="done" size={18} />
            ) : (
              <AntDesign name="plus" size={18} />
            )}
          </Pressable>
        </View>
      </Card>
  );
}


const styles = StyleSheet.create({
  container:{
    borderWidth: 1,
    borderColor:"#52f",
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
    // width: cardSize,
    // height:cardSize/1.25
    
    // paddingHorizontal:0       //can be used to make image occupy the whole width of the card.
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
  add_circle:{
    position:"absolute",
    bottom:2,
    right:2,
    justifyContent: "center",
    alignItems: "center",
    width:cardSize/6,
    height:cardSize/6,
    borderRadius:cardSize/3
  }
});

export default DishCard;



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