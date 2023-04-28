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
import { THEME } from "../globals/constants";

const CartDish = props => {
  const {colors} = THEME;
  const [isdelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();

  const dishId = props.dishId;
  const dish = useSelector(selectDishByIdWrapper(dishId));
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
      marginVertical:10,
    },
    mainContainer: {
      overflow: "hidden",
      flexDirection: "row",
      alignItems: "center",
      height: 90,
      width: "80%",
      borderWidth: 1,
      borderRadius: 15,
    },
    dishImg: {
      width: 90,
      height: 90,
    },
    dishInfoContainer: {
      height: 90,
      alignItems: "flex-start",
      justifyContent: "space-around",
      paddingLeft: 10,
    },
    deleteContainer: {
      width:60,
      justifyContent:"center",
      alignItems:"center",
      // backgroundColor:"purple"
    },
    deleteBtn:{
      width:36,
      height:36,
      borderRadius:18,
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
      right: 15,
      borderRadius: 15,
    },
});

export default CartDish;