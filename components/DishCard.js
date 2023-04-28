import * as React from "react";
import { useState, useEffect } from "react";
import { Card, Icon } from "react-native-elements";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Button, Image } from '@rneui/themed';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useSelector,useDispatch } from "react-redux";
import { selectCurrentOrder, selectCurrentTable } from "../redux/slices/ordersSlice";
import { addDishToShoppingCart,removeDishFromShoppingCart } from "../redux/slices/ordersSlice";
import { CURRENCY, THEME } from "../globals/constants";
import { Colors } from "react-native/Libraries/NewAppScreen";

const cardSize = 180;
const blankImage =
  "https://sumanbiswas-website.s3.ap-south-1.amazonaws.com/nutshell-image-temp/blank.png";

const DishCard = props => {
  const {colors} = THEME;
  const [dishName, setDishName] = useState();
  const [dishDescription, setDishDescription] = useState(); 

  const dish = props.dish;
  const curOrder = useSelector(selectCurrentOrder);
  const curTable = useSelector(selectCurrentTable);
  const dispatch = useDispatch();

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

  useEffect(()=>{
    TrimText();
  },[]);


  const addDishToChart = () => {
    dispatch(addDishToShoppingCart({
      dishId: dish.id,
      currentTable: curTable
    }));
  };
  
  
  return (
      // <Card containerStyle={styles.container} wrapperStyle={{alignItems:"center"}}>
      //   <Card.Title style={styles.title}>{dishName}</Card.Title>
      //   <Card.Divider />
      //   <Pressable
      //     style={{
      //       position: "relative",
      //     }}
      //     onPress={addDishToChart}
      //   >
      //     <Image
      //       style={styles.image}
      //       resizeMode="contain"
      //       source={{
      //         uri:dish.image 
      //       }}
      //     />
      //     <Text>{dishDescription}</Text>
      //     <Text style={styles.price}>${dish.price}</Text>
      //   </Pressable>
      // </Card>
      <View style={styles.container}>
        <Pressable
          onPress={() => addDishToChart()}
          activeOpacity={0.7}
          style={[
            styles.bottom_container,
            { backgroundColor: colors.brightBackground },
          ]}
        >
        <Image
          source={{
            uri: dish.image || blankImage,
          }}
          style={styles.image}
        />
        <Text style={[styles.title, { color: colors.darkText }]}>
          {dishName || "N/A"}
        </Text>
        {/* <Text style={[styles.description, { color: "#F0F0F0" }]}>
          {dishDescription || "N/A"}
        </Text> */}
        <Text style={[styles.price, { color: colors.darkText }]}>
          {CURRENCY.sign} {dish.price || "N/A"}
        </Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  image: {
    width: cardSize,
    height: cardSize / 1.25,
  },
  bottom_container: {
    alignItems: "flex-start",
    width: cardSize,
    paddingBottom: cardSize / 15,
    // backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  title: {
    fontWeight: "bold",
    fontSize: cardSize / 10,
    paddingLeft: cardSize / 15,
    marginTop: cardSize / 15,
  },
  description: {
    paddingLeft: cardSize / 15,
    fontSize: cardSize / 12,
    color: "#595959",
  },
  price: {
    fontWeight: "bold",
    fontSize: cardSize / 9.5,
    paddingLeft: cardSize / 15,
  },
});

export default DishCard;

