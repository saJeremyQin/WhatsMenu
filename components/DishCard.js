import * as React from "react";
import { useState, useEffect } from "react";
import { Card, Icon } from "react-native-elements";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Button, Image } from '@rneui/themed';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useSelector,useDispatch } from "react-redux";
import { selectCurrentOrder, selectCurrentTable } from "../redux/slices/ordersSlice";
import { addDishToShoppingCart,removeDishFromShoppingCart } from "../redux/slices/ordersSlice";

const cardSize = 180;


const DishCard = props => {

  // set the flag of if this dish is added
  const [added, setAdded] = useState(false);
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

  function CheckAdded() {
    curOrder.tobeAddedDishes.map((dishInChart)=> {
      if(dishInChart.id == dish.id)
        setAdded(true);
    });
  }

  useEffect(()=>{
    TrimText();
  },[]);

  // check initial state, then setAdded
  // useEffect(()=>{
  //   //iterate the tobeAddedDishes Array, if we find the dishId equals, then setAdded
  //   CheckAdded();  
  //   // console.log("I am in checkAdded");
  // },[curOrder]);


  const addDishToChart = () => {
    dispatch(addDishToShoppingCart({
      dishId: dish.id,
      currentTable: curTable
    }));
  };
  
  const toggleAddDishToChart = () => {
    // console.log("added is", added);
    setAdded((flag) => !flag);

    if(!added) {

      dispatch(addDishToShoppingCart({
        dishId: dish.id,
        currentTable: curTable
      }));
    } else {
      dispatch(removeDishFromShoppingCart({
        dishId: dish.id,
        currentTable: curTable
      }));
    }
  };
  
  return (
      <Card containerStyle={styles.container} wrapperStyle={{alignItems:"center"}}>
        <Card.Title style={styles.title}>{dishName}</Card.Title>
        <Card.Divider />
        <Pressable
          style={{
            position: "relative",
            // alignItems: "center"
          }}
          onPress={addDishToChart}
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
        </Pressable>
      </Card>
  );
}


const styles = StyleSheet.create({
  container:{
    borderWidth: 1,
    borderColor:"#52f",
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
    shadowColor: '#52f',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 9,
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

