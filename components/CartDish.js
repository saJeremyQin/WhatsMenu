import React,{ useState} from "react";
import { processColor } from "react-native";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectDishByIdWrapper } from "../redux/slices/dishesSlice";
import { AntDesign } from "@expo/vector-icons";
import { 
  changeDishQuantityInShoppingCart,
  selectDishQuantityByIdWrapper,
  removeDishFromShoppingCart
 } from "../redux/slices/ordersSlice";
import { THEME } from "../gloabls/constants";

const CartDish = props => {
  const {colors} = THEME;

  const [isdelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();
  // const [dishQuantity, setDishQuantity] = useState(1);

  const dishId = props.dishId;
  // console.log("dishId is", dishId);
  const dish = useSelector(selectDishByIdWrapper(dishId));
  const dishQuantity = useSelector(selectDishQuantityByIdWrapper(dishId));
  // console.log("dish quantity is", dishQuantity);
  const changeDishQuantity = (slug) => {
    if(dishQuantity == 1 && slug =="minus") 
      return;
    dispatch(changeDishQuantityInShoppingCart({
      dishId: dishId,
      slug:slug
    }));  
  }; 

  const btnDeleteDishHandler = () => {
    console.log("I am deleted one");
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
      <View style={[styles.main_container, {borderColor:colors.accent}]}>
        <Image source={{ uri: dish.image || "" }} style={styles.dish_img} />
        <View style={styles.dishInfo_container}>
          <Text style={styles.text}>
            {dish.name || "name"}
          </Text>
          <Text style={styles.text}>
            $ {dish.price || "price"}
          </Text>
        </View>
        <View style={[styles.quantity_container,{backgroundColor:colors.dialogPrimary}]}>
          <Text style={{fontSize:16}}>{dishQuantity}</Text>   
        </View>
      </View>
      <View style={styles.delete_container}>
        <Pressable style={[styles.delete_btn, {backgroundColor:colors.text}]} onPress={() =>btnDeleteDishHandler() }>
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
      // borderWidth: 1,
      // borderColor:"#52f",
      // borderTopLeftRadius:5,
      // borderTopRightRadius:5,
      // width: "100%",
      justifyContent:"space-between",
      alignItems:"center",
      marginVertical:10,
      // position:"relative"
    },
    main_container: {
      overflow: "hidden",
      flexDirection: "row",
      alignItems: "center",
      height: 90,
      width: "80%",
  
      borderWidth: 1,
      borderRadius: 15,
      // backgroundColor:"red"
    },
    dish_img: {
      width: 90,
      height: 90,
    },
    dishInfo_container: {
      height: 90,
      alignItems: "flex-start",
      justifyContent: "space-around",
      paddingLeft: 10,
    },
    delete_container: {
      width:60,
      justifyContent:"center",
      alignItems:"center",
      // backgroundColor:"purple"
    },
    delete_btn:{
      width:36,
      height:36,
      borderRadius:18,
      // backgroundColor:"#f00",
      justifyContent:"center",
      alignItems:"center"
    },
    text:{
      color: "#000",
      fontSize: 16,     
    },
    quantity_container:{
      width:"7%",
      height:"80%",
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      right: 15,
      borderRadius: 15,
    },
    quantity_btn:{
      paddingHorizontal:5,
      paddingVertical:5
    },
 
});

export default CartDish;