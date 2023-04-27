import React,{ useEffect,useState } from "react";
import { StyleSheet, View, Text, Image, FlatList, Alert } from "react-native";
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

  const dispatch = useDispatch();

  const tableNumbers = Array.from({length: numOfTables}, (_, index) => index + 1);

  const [showDialog, setShowDialog] = useState(false);
  const [tableNumber, setTableNumber] = useState(null);
  const [numberOfDiners, setNumberOfDiners] = useState(null);

  const orders = useSelector(selectOrders);
  const dishes = useSelector(selectDishes);

  useEffect(() => {
    client.request(DISHES_QUERY).then((data) => {
      dispatch(addDishes(data.dishes));
    }).catch((error) => {
      console.log('API call failed:', error);
      Alert.alert('Network Error', 'There was an issue fetching data from the server. Please check your internet connection and try again.', [{ text: 'OK' }]);
    });
  }, []);
  
  const getDishById = (dishId) => {
    const dish = dishes.find((dish) => dish.id === dishId);
    return dish;
  }

  // This is the function pass down to child component and invoked by TableCard.
  const handleTableCardClick = (tableNumber) => {
    const tableOrder = orders.find(order => order.tableNumber === tableNumber);
    !tableOrder 
      ? (setTableNumber(tableNumber), setShowDialog(true))
      : (dispatch(resumeOrder({tableNumber})), navigation.navigate("Orders"))
  };

  // Open one new table after input numberOfDiners
  const handleDialogSubmit = () => {
    dispatch(
      createOrder({
        tableNumber,
        numberOfDiners
      })
    );
    setShowDialog(false);
    navigation.navigate("Orders");
  };

  const renderTableItem = ({item}) => {
    // const tableOrder = orders.find(order => order.tableNumber === item);
    // let totalAmount=0;
    // if(tableOrder) {
    //   // calculate the ongoing order totalAmount, this can be encapsulated in a function.
    //   totalAmount = tableOrder?.ongoingDishesSections.reduce(
    //     (acc, section) =>
    //       acc + 
    //       section.dishesOngoing.reduce(
    //         (acc, dish) =>
    //           acc + getDishById(dish.dishId)?.price * dish.dishQuantity,
    //           0
    //       ),
    //     0
    //   );
    // };

    return (
      <TableCard 
        tableNumber={item} 
        // totalAmount={totalAmount} 
        // tableStatus={Boolean(tableOrder)}
        onTableCardClick={()=> handleTableCardClick(item)} 
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
        style={styles.flatList}
        // contentContainerStyle={{ paddingBottom: 32 }}
        // columnWrapperStyle={{ justifyContent: 'space-between' }}
        // itemStyle={{ backgroundColor: 'pink', borderRadius: 8, padding: 16 }}
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
            inputContainerStyle={{borderBottomWidth: 0}} // add this line
          />
          <View style={styles.dialogButtonsContainer}>
            <Button title="Cancel" onPress={() => setShowDialog(false)} buttonStyle={styles.cancelButton}/>
            <Button title="Ok" onPress={handleDialogSubmit} buttonStyle={styles.okButton}/>
          </View>
        </View>
      </Overlay>
    </View>
  );
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#f0f0f0",
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
  flatList:{ 
    backgroundColor: '#f0f0f0', 
    padding: 16 
  },
  overlayStyle: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 15,
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
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'white',
    elevation:5,
    // borderColor: 'red', // add this line to confirm if the line is the border
    // borderWidth: 1, 
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input:{
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 5,
    paddingLeft:5,
  },
  dialogButtonsContainer: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
  },
  cancelButton: {
    width:80,
  },
  okButton: {
    width:80
  },
});

export default TablesScreen;

