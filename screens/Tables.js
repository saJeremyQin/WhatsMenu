import React,{useEffect,useState} from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, selectOrders } from "../redux/slices/ordersSlice";
import { addDishes, selectDishes } from "../redux/slices/dishesSlice";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "react-native-elements";
import { client, DISHES_QUERY } from "../Gloabls/netRequest";
import { DISH_TYPES } from "../Gloabls/constants";
import { Overlay, Button, Input } from "react-native-elements";
import TableCard from "../components/TableCard";

const TablesScreen = () => {

  const numOfTables = 30;
  const tableNumbers = Array.from({length: numOfTables}, (_, index) => index + 1);

  const [showDialog, setShowDialog] = useState(false);
  const [tableNumber, setTableNumber] = useState(null);
  const [numberOfDiners, setNumberOfDiners] = useState(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  // should use [dispatch] or []?
  useEffect(() => {
    try {
      client.request(DISHES_QUERY).then((data) => {
        dispatch(addDishes(data.dishes));
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

  // This is the function pass down to child component and invoked by TableCard.
  const handleTableCardClick = (tableNumber) => {
    const tableOrder = orders.find(order => order.tableNumber === tableNumber);
    if (!tableOrder) {
      // dispatch(showDialog(tableNumber));
      setTableNumber(tableNumber);
      setShowDialog(true);
      console.log("the show is", showDialog);
    }
  };

  const handleDialogSubmit = () => {
    dispatch(
      createOrder({
        tableNumber: tableNumber,
        numberOfDiners: numberOfDiners
      })
    );
    setShowDialog(false);
    navigation.navigate("Menu");
  };

  const renderTableItem = ({item}) => {
    const tableOrder = orders.find(order => order.tableNumber === item);
    let totalAmount=0;
    if(tableOrder) {
      totalAmount = tableOrder.haveBeenPlacedDishes.reduce(
        (acc,dish) => acc + getDishById(dish.dishId).price * dish.quantity,0
      );
    }
    return (
      <TableCard 
        tableNumber={item} 
        totalAmount={totalAmount} 
        tableStatus={Boolean(tableOrder)}
        onTableCardClick={()=> handleTableCardClick(item)} />    //how to understand tablenumber here?
    )
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
        renderItem={renderTableItem}
        keyExtractor={(item) => item.toString()}
      />
       <Overlay isVisible={showDialog} onBackdropPress={() => setShowDialog(false)}>
        <View style={styles.dialogContainer}>
          <Text style={styles.dialogTitle}>Enter Number of Diners for Table {tableNumber}</Text>
          <Input
            placeholder="Number of Diners"
            keyboardType="number-pad"
            onChangeText={value => setNumberOfDiners(value)}
          />
          <View style={styles.dialogButtonsContainer}>
            <Button title="Cancel" onPress={() => setShowDialog(false)} />
            <Button title="Ok" onPress={handleDialogSubmit} />
          </View>
        </View>
      </Overlay>
    </View>
  );
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
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
  },
  dialogContainer: {
    alignItems: 'center',
    padding: 20,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dialogButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
})

export default TablesScreen;

