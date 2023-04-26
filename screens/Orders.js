import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, View, Text, FlatList, Image, Dimensions, Alert } from "react-native";
import { Button, Divider, Overlay } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import CartDish from "../components/CartDish";
import ReceiptView,{ generateReceiptHTML } from "../components/ReceiptView";
import DishCard from "../components/DishCard";
import * as Print from 'expo-print';
import { isReturningDishContext } from "../context/appContext";

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



const OrdersScreen = ({navigation}) => {
  const {isReturningDish} = useContext(isReturningDishContext);

  const [showDialog, setShowDialog] = useState(false);

  const receiptViewRef = useRef(null);

  // Write the logic of menuScreen
  const dispatch = useDispatch();
  const [curDishType, setCurDishType] = useState("main");

  // Get the dishes by current dishType
  const dishesByType = useSelector(selectDishesByTypeWrapper(curDishType));
  // console.log("dishesByType are", dishesByType);

  const currentTableNum = useSelector(selectCurrentTable);
  // console.log("current table is",currentTableNum);
  const dishesCountInShoppingCart = (useSelector(selectCurrentOrder))?.tobeAddedDishes.length;
  const dinersNum = useSelector(selectNumberOfDiners);

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={ btnCheckOutHandler } title="CheckOut" style={{color:"#f31282"}} />
      ),
    });
  }, [isReturningDish]);

  const btnCheckOutHandler = () => {
    // console.log("i am clicked inside");
    console.log("isReturningDish in Orders is", isReturningDish);
    if(!isReturningDish) {
      setShowDialog(true);
    } else {
        Alert.alert("Warning", "You are returning dish, can't check out!");
    }
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

  const printReceipt = async({receiptContent}) => {
    // const reeiptContent = "Welcome";
    try {
      // const receiptContent = receiptViewRef.current.generateReceiptHTML();
      console.log(receiptContent);
      await Print.printAsync({
        html: receiptContent,
      })
      
    } catch (error) {
      console.error(error);
    }
  }
  
  // const handleReceiptCheckout = async () => {
  //   if(receiptViewRef.current) {
  //     const receiptContent = await receiptViewRef.current.generateReceiptHTML();

  //     console.log("checkout receiptViewRef is", receiptViewRef);
  //     await printReceipt(receiptContent).then(
  //       dispatch(checkOutOrder()),
  //       navigation.navigate("Tables")
  //     );
  //   }   
  // };

  const handleReceiptCheckout = () => {
    if (receiptViewRef.current) {
 
        receiptViewRef.current.printReceipt();
    
   
    } else {
      console.log('receiptViewRef.current is null or undefined');
    }
  };
  
  

  return (
    <View style={styles.container}> 
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
          <ReceiptView ref={receiptViewRef} edit={false} style={styles.receiptView}/>
        </View>
        <View style={styles.dialogButtonsContainer}>
          <Button title="Cancel" onPress={() => setShowDialog(false)} style={styles.cancelButton}/>
          <Button title="CheckOut" onPress={() => handleReceiptCheckout()} style={styles.checkOutButton}/>
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
    // elevation:5
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
