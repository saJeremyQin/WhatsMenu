import React,{ useState} from "react";
import { processColor } from "react-native";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { useSelector } from "react-redux";
import { selectDishByIdWrapper } from "../redux/slices/dishesSlice";

const CartDish = props => {

  const [isdelete, setIsDelete] = useState(false);
  const [dishQuantity, setDishQuantity] = useState(1);

  const dishId = props.dishId;
  // console.log("dishId is", dishId);
  const dish = useSelector(selectDishByIdWrapper(dishId));
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
      </View>
      <Pressable>

      </Pressable>
    </View>


  );
};


const styles = StyleSheet.create({
    container:{
      borderWidth: 1,
      borderColor:"#52f",
      borderTopLeftRadius:5,
      borderTopRightRadius:5,
      width: "100%",
      marginTop:10
    },
    main_container: {
      overflow: "hidden",
      flexDirection: "row",
      alignItems: "center",
      height: 100,
  
      borderColor: "#000",
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
    }
});

export default CartDish;