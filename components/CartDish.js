import React,{ useState} from "react";
import { processColor } from "react-native";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectDishById } from "../redux/slices/dishesSlice";
import { AntDesign } from "@expo/vector-icons";
import { 
  changeDishQuantityInShoppingCart,
  selectDishQuantityByIdWrapper,
  removeDishFromShoppingCart
 } from "../redux/slices/ordersSlice";
import { THEME, windowHeight,windowWidth} from "../globals/constants";

const CartDish = props => {
  const {colors} = THEME;
  const [isdelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();

  const dishId = props.dishId;
  const dish = useSelector(selectDishById(dishId));
  const dishQuantity = useSelector(selectDishQuantityByIdWrapper(dishId));
  const changeDishQuantity = slug => {
    if(dishQuantity === 1 && slug ==="minus") 
      return;
    dispatch(changeDishQuantityInShoppingCart({
      dishId: dishId,
      slug:slug
    }));  
  }; 

  const btnDeleteDishHandler = () => {
    if(dishQuantity > 1) {
      dispatch(changeDishQuantityInShoppingCart({
        dishId: dishId,
        slug:"minus"
      }));
    } else {
      dispatch(removeDishFromShoppingCart({
        dishId:dishId
      }));
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.mainContainer, {borderColor:colors.accent}]}>
        <Image source={{ uri: dish?.image ?? "" }} style={styles.dishImg} />
        <View style={styles.dishInfoContainer}>
          <Text style={styles.text}>
            {dish?.name ?? "name"}
          </Text>
          <Text style={styles.text}>
            $ {dish?.price ?? "price"}
          </Text>
        </View>
        <View style={[styles.quantityContainer,{backgroundColor:colors.dialogPrimary}]}>
          <Text style={{fontSize:16}}>{dishQuantity}</Text>   
        </View>
      </View>
      <View style={styles.deleteContainer}>
        <Pressable style={[styles.deleteBtn, {backgroundColor:colors.text}]} onPress={() =>btnDeleteDishHandler() }>
          <AntDesign name="minus" size={28} color="white"/>
        </Pressable>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container:{
      display: "flex",
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      // marginVertical:10,
      marginVertical:0.015*windowHeight,
    },
    mainContainer: {
      overflow: "hidden",
      flexDirection: "row",
      alignItems: "center",
      // height: 90,
      height:0.12*windowHeight,
      width: "80%",
      borderWidth: 1,
      // borderRadius: 15,
      borderRadius:0.015*windowWidth,
    },
    dishImg: {
      // width: 90,
      width:0.12*windowHeight,
      // height: 90,
      height:0.12*windowHeight
    },
    dishInfoContainer: {
      // height: 90,
      height:0.12*windowHeight,
      alignItems: "flex-start",
      justifyContent: "space-around",
      // paddingLeft: 10,
      paddingLeft:0.01*windowWidth,
    },
    deleteContainer: {
      // width:60,
      width:0.05*windowWidth,
      justifyContent:"center",
      alignItems:"center",
      // backgroundColor:"purple"
    },
    deleteBtn:{
      // width:36,
      width:0.04*windowWidth,
      height:0.04*windowWidth,
      // height:36,
      // borderRadius:18,
      borderRadius:0.02*windowWidth,
      justifyContent:"center",
      alignItems:"center"
    },
    text:{
      color: "#000",
      fontSize: 16,     
    },
    quantityContainer:{
      width:"8%",
      height:"80%",
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      // right: 15,
      right:0.01*windowWidth,
      // borderRadius: 15,
      borderRadius:0.01*windowWidth
    },
});

export default CartDish;