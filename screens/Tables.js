import React,{useEffect} from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
// import { Button, ButtonGroup, withTheme } from '@rneui/themed';
import { useDispatch, useSelector } from "react-redux";
import { createOrder, selectOrders } from "../redux/slices/ordersSlice";
import { addDishes, selectDishes } from "../redux/slices/dishesSlice";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "react-native-elements";
import { client, DISHES_QUERY } from "../Gloabls/netRequest";
import { DISH_TYPES } from "../Gloabls/constants";
import TableCard from "../components/TableCard";

const TablesScreen = () => {
  const numOfTables = 30;
  const tableNumbers = Array.from({length: numOfTables}, (_, index) => index + 1);

  const dispatch = useDispatch();
  const navigation = useNavigation();

    // should use [dispatch] or []?
  useEffect(() => {
    try {
      client.request(DISHES_QUERY).then((data) => {
        console.log("in tables dishes are", data.dishes);
        dispatch(addDishes(data.dishes));
        console.log(data.dishes);
        // setMenuData(data.dishes);
        // const filterByDishesTypeArr = data.dishes.filter((dish) => dish.type == "main");
        // setDishesByType(filterByDishesTypeArr);    
      });
      
    } catch (error) {
      console.log(error);
    }

  }, [dispatch]);
  
  const orders = useSelector(selectOrders);
  const dishes = useSelector(selectDishes);

  const getDishById = (dishId) => {
    return dishes.find((dish) => dish.id === dishId);
  }


  
  const renderTableItem = ({item}) => {
    const tableOrder = orders.find(order => order.tableNumber === item);

    if(tableOrder) {
      const totalAmount = tableOrder.haveBeenPlacedDishes.reduce(
        (acc,dish) => acc + getDishById(dish.dishId).price * dish.quantity,0
      );
      return (      
        // <View>
        //   <Text>
        //     Table {item} ({tableOrder.numberOfDiners} diners) - Total:{" "}
        //     {totalAmount}
        //   </Text>
        // </View>
          <TableCard tableNumber={item} totalAmount={totalAmount} tableStatus={Boolean(tableOrder)} />
        )
    } else {
      return (
        // <View>
        //   <Text>Table {item} (Unoccupied)</Text>
        // </View>
          <TableCard tableNumber={item} totalAmount={0} />
      );
    }

  };

  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <Image 
          source={require("../assets/logo.png")}
          resizeMode="contain"
          style={styles.headerImage}
        />
        <Text style={styles.headerText}>
          Welcome to WhatsMenu
        </Text>
      </View>
      <Divider width={1} color="white" />
      <FlatList
        data={tableNumbers}
        numColumns={5}
        // width={Dimensions.get('window').width}
        renderItem={renderTableItem}
        keyExtractor={(item) => item.toString()}
        // alignItems="space-evenly"
      />
    </View>
  );
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    // backgroundColor:"#5e0a9c",
    backgroundColor:"white",
    justifyContent:"center",
  },
  headContainer:{
    flex:1,
    flexDirection:"row",
    paddingHorizontal:40,
    marginTop:60,
    marginBottom:40,
    justifyContent:"flex-start",
    alignItems:"center",
    height:100
  },
  headerImage:{
    aspectRatio: 1,
    width: "5%",
  },
  headerText:{
    fontSize:24,
    minHeight:50,
    paddingLeft:30,
    lineHeight:60,
    color: "#f31282"
  }
})

export default TablesScreen;

