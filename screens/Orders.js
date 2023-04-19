import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Image, Dimensions } from "react-native";
import { Button, Divider, Overlay } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
// import { placeOrder,selectCurrentOrder } from "../redux/slices/ordersSlice";
import CartDish from "../components/CartDish";
import ReceiptView from "../components/ReceiptView";
import DishCard from "../components/DishCard";
import { 
  placeOrder, 
  checkOutOrder,
  selectCurrentOrder, 
  selectCurrentTable,
  selectNumberOfDiners
} from "../redux/slices/ordersSlice";
import { selectDishes, selectDishesByTypeWrapper } from "../redux/slices/dishesSlice";
import OrdersTabView from "../navigation/OrdersTabView";
import { DISH_TYPES } from "../Gloabls/constants";
import { DishTypeButton } from "../components/DishTypeButton";
// import ReceiptView from "../components/ReceiptView";



const OrdersScreen = ({navigation}) => {

  const [showDialog, setShowDialog] = useState(false);

  // Write the logic of menuScreen
  const dispatch = useDispatch();
  const [curDishType, setCurDishType] = useState("main");
  // console.log("111 is",Dimensions.get('window').width);

  // Get the dishes by current dishType
  const dishesByType = useSelector(selectDishesByTypeWrapper(curDishType));
  // console.log("dishesByType are", dishesByType);

  const currentTableNum = useSelector(selectCurrentTable);
  console.log("current table is",currentTableNum);
  const dishesCountInShoppingCart = (useSelector(selectCurrentOrder))?.tobeAddedDishes.length;
  const dinersNum = useSelector(selectNumberOfDiners);

  // const ongoingDishes = (useSelector(selectCurrentOrder)).haveBeenPlacedDishes;

  // const bill = {
  //   subtotal:70,
  //   tax:7,
  //   total:77
  // }
  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => btnCheckOutHandler() } title="CheckOut" style={{color:"#f31282"}} />
      ),
    });
  }, [navigation]);

  const btnCheckOutHandler = () => {
    // console.log("i am clicked inside");
    setShowDialog(true);

  };

  const handleDishTypeClick = (slug, id) => {
    console.log("slug is", slug);
    setCurDishType(slug);
    console.log("the dishes array is,", dishesByType);
  };

  const setClass = (slug) => {
    if (curDishType === slug) return true;
    else return false;
  };

  const renderDishItem = ({item}) => {
    return (
      <DishCard dish={item} />
    );
  };

  const handleReceiptCheckout = () => {
    dispatch(checkOutOrder());
    // send to printer
    navigation.navigate("Tables");
  };

  return (
    <View style={styles.container}> 
      {
        /* Header will be put in the header of Stack Screen.
        <View style={styles.headerContainer}>
          <Image
            source={require("../assets/table.png")}
            resizeMode="contain"
            style={styles.headerImage}
          />
          <Text style={styles.headerText}>
            Table:{currentTableNum} | Diners: {dinersNum}
          </Text>
        </View>
        <Divider width={1.5} color={"white"} /> */
      }
      <View style={styles.leftColumn}>
        <View style={styles.dishesByTypeButtonContainer}> 
          <FlatList
            data={DISH_TYPES}
            horizontal
            style={styles.dishTypeButtonList}   
            showsHorizontalScrollIndicator={false}
            alignItems="center"
            renderItem={({ item }) => {
              return (
                <DishTypeButton
                  title={item.title}
                  slug={item.slug}
                  onPress={handleDishTypeClick}
                  id={item.id}
                  active={setClass(item.slug)}
                />
              );
            }}
          />
        </View>
        <FlatList
          data={dishesByType}
          numColumns={3}
          // width={(Dimensions.get('window').width)/2}
          contentContainerStyle={{ alignSelf: 'center' }}
          style={styles.dishesList}
          alignItems={dishesByType.length > 1 ? "flex-start":"center"}
          renderItem={renderDishItem}
        />    
      </View>
      <Divider orientation="vertical" width={2} />
      <View 
        style={styles.rightColumn}
      >
        {/* <View style={styles.receipt_container}> */}
          {/* <Receipt lineItems={ongoingDishes} header={restaurant} footer={bill}  /> */}
        {/* </View> */}
        <OrdersTabView style={{flex:1,backgroundColor:"pink"}}/>
      </View>
      <Overlay 
        isVisible={showDialog} 
        onBackdropPress={() => setShowDialog(false)}
        overlayStyle={styles.overlayStyle}
      >
        <View style={styles.dialogContainer}>
          <ReceiptView edit={false} style={styles.receiptView}/>
        </View>
        <View style={styles.dialogButtonsContainer}>
          <Button title="Cancel" onPress={() => setShowDialog(false)} style={styles.cancelButton}/>
          <Button title="Print" onPress={handleReceiptCheckout} style={styles.checkOutButton}/>
        </View>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor:"#5e0a9c"
  },
  checkOutBtn:{
    backgroundColor:"#5e0a9c"
  },
  leftColumn: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dishesByTypeButtonContainer:{
    width:"100%",
    height:80,
  },
  dishesByTypeContainer:{
    width:"100%",
  },
  dishTypeButtonList:{
    marginLeft:30,
    paddingTop: 25,  
  },
  // flatlistContainer:{
  //   paddingTop: 20,
  //   backgroundColor:"#f0f0f0"
  // },
  dishesList: {
    // height: 700,
    // flexGrow: 0,
    // flex:1,
    marginTop:10,
    paddingHorizontal: 10,
    // alignItems:"flex-start"
  },
  rightColumn: {
    flex: 2,
    backgroundColor: '#eee',
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingHorizontal:10
    height: Dimensions.get("window").height-120,
    overflow:"hidden"
  },
  orderplaced_img:{
    width:320,
    height:246
  },
  flatList:{
    // flexGrow: 0,
    marginTop:30,
    width:"80%"
  },
  receipt_container:{
    flex:1,
    width:"80%",
    height:"80%",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"green"
  },
  overlayStyle:{
    width:512,
    height:680,
    backgroundColor: 'white',
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
  dialogContainer:{
    height:600,
    padding: 10,
    borderRadius: 10,
    // backgroundColor: 'pink',
    elevation:5
  },  
  // dialogTitle: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   marginBottom: 20,
  // },
  receiptView:{
    flex:1
  },
  dialogButtonsContainer: {
    marginTop:10,
    height:40,
    flexDirection: 'row',
    justifyContent: "space-evenly",
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  checkOutButton: {
    backgroundColor: '#007bff',
  },
});

export default OrdersScreen;
