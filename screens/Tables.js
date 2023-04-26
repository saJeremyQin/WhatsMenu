import React,{ useEffect,useState } from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, selectOrders,resumeOrder } from "../redux/slices/ordersSlice";
import { addDishes, selectDishes } from "../redux/slices/dishesSlice";
import { Overlay, Button, Input, Divider } from "react-native-elements";
import { client, DISHES_QUERY } from "../gloabls/netRequest";
import { DISH_TYPES } from "../gloabls/constants";
import TableCard from "../components/TableCard";

// Keep it a pure function, varibale read only is ok.
const numOfTables = 30;

const TablesScreen = ({navigation}) => {

  const tableNumbers = Array.from({length: numOfTables}, (_, index) => index + 1);

  const [showDialog, setShowDialog] = useState(false);
  const [tableNumber, setTableNumber] = useState(null);
  const [numberOfDiners, setNumberOfDiners] = useState(null);

  const dispatch = useDispatch();

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
  // console.log("dishes in tables are", dishes);

  const getDishById = (dishId) => {
    const dish = dishes.find((dish) => dish.id === dishId);
    // console.log("dishprice is",dish.price);
    return dish;
  }

  // This is the function pass down to child component and invoked by TableCard.
  const handleTableCardClick = (tableNumber) => {
    const tableOrder = orders.find(order => order.tableNumber === tableNumber);
    !tableOrder 
      ? (setTableNumber(tableNumber), setShowDialog(true))
      : (dispatch(resumeOrder({tableNumber})), navigation.navigate("Orders"))
  };

  const handleDialogSubmit = () => {
    dispatch(
      createOrder({
        tableNumber,
        numberOfDiners
      })
    );
    setShowDialog(false);
    // navigation.navigate("Menu");
    navigation.navigate("Orders");
  };

  const renderTableItem = ({item}) => {
    const tableOrder = orders.find(order => order.tableNumber === item);
    let totalAmount=0;
    if(tableOrder) {
      totalAmount = tableOrder?.ongoingDishesSections.reduce(
        (acc, section) =>
          acc + 
          section.dishesOngoing.reduce(
            (acc, dish) =>
              acc + getDishById(dish.dishId)?.price * dish.dishQuantity,
              0
          ),
        0
      );
      // console.log("totalAmount is", totalAmount);
    };

    return (
      <TableCard 
        tableNumber={item} 
        totalAmount={totalAmount} 
        tableStatus={Boolean(tableOrder)}
        onTableCardClick={()=> handleTableCardClick(item)} 
        // style={styles.tableCard}
      />    
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
        style={{ backgroundColor: '#F5FCFF', padding: 16 }}
        contentContainerStyle={{ paddingBottom: 32 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        itemStyle={{ backgroundColor: '#FFFFFF', borderRadius: 8, padding: 16 }}
      />
      <Overlay 
        isVisible={showDialog} 
        onBackdropPress={() => setShowDialog(false)}
        overlayStyle={styles.overlayStyle}
      >
        <View style={styles.dialogContainer}>
          <Text style={styles.dialogTitle}>Enter Number of Diners for Table {tableNumber}</Text>
          <Input
            placeholder="Number of Diners"
            keyboardType="numeric"
            onChangeText={value => setNumberOfDiners(value)}
            style={styles.input}
          />
          <View style={styles.dialogButtonsContainer}>
            <Button title="Cancel" onPress={() => setShowDialog(false)} style={styles.cancelButton}/>
            <Button title="Ok" onPress={handleDialogSubmit} style={styles.okButton}/>
          </View>
        </View>
      </Overlay>
    </View>
  );
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#f1f1f1",
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
    // height:100   redundant - flexDirection: "row" property already ensures that the container
    // will have a height that fits its content
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
  overlayStyle: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dialogContainer: {
    // flex:1,
    // justifyContent:"center",
    // alignItems:"center",
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation:5
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input:{
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    // backgroundColor:"pink"
  },
  dialogButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  okButton: {
    backgroundColor: '#007bff',
  },
  // overlayBackground: {
  //   position: 'absolute',
  //   top: 0,
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a transparent background for the overlay
  // },
  tableCard: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    shadowOpacity: 0.5, // add this line to create a shadow effect on iOS
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
  },
});

export default TablesScreen;

