import React,{ useState} from "react";
import { processColor } from "react-native";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectDishByIdWrapper } from "../redux/slices/dishesSlice";
import { AntDesign } from "@expo/vector-icons";
import { selectDishQuantityByIdWrapper } from "../redux/slices/ordersSlice";
import { changeDishQuantityInShoppingCart } from "../redux/slices/ordersSlice";

const CartDish = props => {

  const [isdelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();
  // const [dishQuantity, setDishQuantity] = useState(1);

  const dishId = props.dishId;
  // console.log("dishId is", dishId);
  const dish = useSelector(selectDishByIdWrapper(dishId));
  const dishQuantity = useSelector(selectDishQuantityByIdWrapper(dishId));
  // console.log("dish quantity is", dishQuantity);

  // function changeDishQuantity(slug) {
  //   if(dishQuantity == 1 && slug =="minus") return;
  //   dispatch(changeDishQuantityInShoppingCart({
  //     dishId: dishId,
  //     slug:slug
  //   }));   
  // };
  const changeDishQuantity = (slug) => {
    if(dishQuantity == 1 && slug =="minus") 
      return;
    dispatch(changeDishQuantityInShoppingCart({
      dishId: dishId,
      slug:slug
    }));  
  }; 



  return (
    <View style={styles.container}>
      <View style={styles.main_container}>
        <Image source={{ uri: dish.image || "" }} style={styles.dish_img} />
        <View style={styles.dishInfo_container}>
          <Text style={styles.text}>
            {dish.name || "name"}
          </Text>
          <Text style={styles.text}>
            $ {dish.price || "price"}
          </Text>
        </View>
        <View style={styles.quantity_container}>
          <Pressable style={styles.quantity_btn} onPress={()=>changeDishQuantity("plus")} >
            <AntDesign name="plus" size={20} color="black" />
          </Pressable>
          <Text style={{fontSize:16}}>{dishQuantity}</Text>
          <Pressable style={styles.quantity_btn} onPress={()=>changeDishQuantity("minus")}>
            <AntDesign name="minus" size={20} color="black" />
          </Pressable>
        </View>
      </View>
      <Pressable style={styles.delete_container}>
        <AntDesign name="delete" size={28} color="black"/>
      </Pressable>
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
      // justifyContent:"center",
      alignItems:"center",
      marginVertical:10
    },
    main_container: {
      overflow: "hidden",
      flexDirection: "row",
      alignItems: "center",
      height: 100,
      width: "80%",
  
      // borderColor: "#000",
      borderColor:"#52f",
      borderWidth: 1,
      borderRadius: 15,
    },
    dish_img: {
      width: 100,
      height: 100,
    },
    dishInfo_container: {
      height: 100,
      alignItems: "flex-start",
      justifyContent: "space-around",
      paddingLeft: 10,
    },
    text:{
      color: "#000",
      fontSize: 16,     
    },
    quantity_container:{
      backgroundColor: "#887",
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
    delete_container:{
      width:60,
      height:60,
      borderRadius:12,
      // borderWidth:1,
      // borderColor:"#52f",
      backgroundColor:"#52f",
      marginLeft:35,
      justifyContent:"center",
      alignItems:"center"
    }
});

export default CartDish;