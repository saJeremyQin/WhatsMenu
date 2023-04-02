import React,{ useEffect, useState} from "react";
import { StyleSheet, View, Text, Dimensions, FlatList, Image } from "react-native";
import { client, DISHES_QUERY } from "../Gloabls/netRequest";
import { DISH_TYPES } from "../Gloabls/constants";
import DishCard from "../components/DishCard";
import { Divider } from '@rneui/themed';
import { useSelector, useDispatch } from "react-redux";
import {createOrder, selectCurrentOrder, selectCurrentTable } from "../redux/slices/ordersSlice";
import { selectDishes } from "../redux/slices/dishesSlice";
import ShoppingCart from "../components/ShoppingCart";


const MenuScreen = () => {

  const [menuData, setMenuData] = useState();
  const [dishesByType, setDishesByType] = useState([]);   //dishes in array by current activeType

  const dispatch = useDispatch();
  const dishes = useSelector(selectDishes);



  const currentTableNum = useSelector(selectCurrentTable);
  const dishesCountInShoppingCart = (useSelector(selectCurrentOrder)).tobeAddedDishes.length;
  // console.log("current table is", currentTableNum);
  // console.log("shopping cart dished number is", dishesCountInShoppingCart);

  useEffect(() => {
    // console.log(Dimensions.get("window").width);
    dispatch(createOrder(5,3));
    setDishesByType(dishes);
  }, []);

  const renderDishItem = ({item}) => {
      return (
        <DishCard 
          // image={item.image}
          // title={item.name}
          // description={item.description}
          // price={item.price}
          // id={item.id}
          // navigation={navigation}
          dish={item}
        />
      );
  };
  // {
  //   console.log("the data is",dishesByType)
  // }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/table.png")}
          resizeMode="contain"
          style={styles.headerImage}
        />
        <Text style={styles.headerText}>
          Table {currentTableNum}
        </Text>
        <ShoppingCart style={styles.headerCart} count={dishesCountInShoppingCart}/>
      </View>
      <Divider width={1.5} color={"white"} />
      <View style={styles.flatlistContainer}> 
        <FlatList
          data={dishesByType}
          numColumns={5}
          width={Dimensions.get('window').width}
          style={styles.flat_list}
          alignItems={dishesByType.length > 1 ? "flex-start":"center"}
          renderItem={renderDishItem}
        />    
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#5e0a9c"
  },
  headerContainer:{
    // position:"relative",
    flex:1,
    flexDirection:"row",
    paddingHorizontal:40,
    marginTop:60,
    marginBottom:40,
    justifyContent:"space-between",
    alignItems:"center",
    height:100
  },
  headerImage:{
    aspectRatio: 1,
    width: "5%",
  },
  headerText: {
    // borderWidth: 3,
    // borderColor:"#606",
    // backgroundColor:"blue",
    textAlign: 'center',
    fontSize: 30,
    minHeight:50,
    // marginLeft:'auto',

  },
  shoppingcart:{
    // position:"absolute",
    // right:10,
    // marginLeft:"auto"
    // top:10
  },
  flatlistContainer:{
    paddingTop: 20,
    justifyContent:"flex-start",
    alignItems:"center"
  },
  flat_list: {
    height: 700,
    flexGrow: 0,
    paddingHorizontal: 20,
  },
});

export default MenuScreen;





