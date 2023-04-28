import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, View, Text, FlatList, Image, Dimensions, Alert } from "react-native";
import { Button, Divider, Overlay } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import CartDish from "../components/CartDish";
import ReceiptView,{ generateReceiptHTML } from "../components/ReceiptView";
import DishCard from "../components/DishCard";
import * as Print from 'expo-print';
import { ReturningDishContext } from "../context/appContext";

import { 
  placeOrder, 
  checkOutOrder,
  selectCurrentOrder, 
  selectCurrentTable,
  selectNumberOfDiners,
  selectTotalAmountByTableNumber
} from "../redux/slices/ordersSlice";
import { selectDishes, selectDishesByTypeWrapper } from "../redux/slices/dishesSlice";
import OrdersTabView from "../navigation/OrdersTabView";
import { DISH_TYPES } from "../gloabls/constants";
import { DishTypeButton } from "../components/DishTypeButton";
import { THEME } from "../gloabls/constants";



const OrdersScreen = ({navigation}) => {
  const {colors} = THEME;
  const {isReturningDish} = useContext(ReturningDishContext);
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);

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
  const total = useSelector(selectTotalAmountByTableNumber(currentTableNum));

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={ btnCheckOutHandler } title="CheckOut" buttonStyle={{backgroundColor:colors.accent}} />
      ),
    });
  }, [isReturningDish, total]);

  const btnCheckOutHandler = () => {
    console.log("isReturningDish in Orders is", isReturningDish);
    if(total === 0) {
      Alert.alert("Warning", "No placed dishes to check out");
      return ;
    }
    if(isReturningDish) {
      Alert.alert("Warning", "You are returning dish, can't check out!");
      return ;
    } 
    setShowReceiptDialog(true); 
  };

  const handleDishTypeClick = (slug) => {
    setCurDishType(slug);
  };

  const setClass = (slug) => {
    return curDishType === slug ; 
  };

  const renderDishItem = ({item}) => {
    return (
      <DishCard dish={item} />
    );
  };

  const printReceipt = async({receiptContent}) => {
    try {
      console.log(receiptContent);
      await Print.printAsync({
        html: receiptContent,
      })
      
    } catch (error) {
      console.error(error);
    }
  }
  
  const handleReceiptCheckout = async () => {
    if (receiptViewRef.current) {
      await receiptViewRef.current.printReceipt().then(
        dispatch(checkOutOrder()),
        navigation.navigate("Tables")
      )
    } else {
      console.log('receiptViewRef.current is null or undefined');
    }
  };
  
  

  return (
    <View style={styles.container}> 
      <View style={[styles.leftColumn,{backgroundColor:colors.background}]}>
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
        <View style={styles.flatListContainer}>
        {
          dishesByType.length === 0 ? (
            <Text style={{fontSize:26}}>There are no dishes for current type!</Text>
          ) : (
            <FlatList
              data={dishesByType}
              numColumns={3}
              contentContainerStyle={{ alignSelf: 'center' }}
              style={styles.dishesList}
              alignItems={dishesByType.length > 1 ? "flex-start":"center"}
              renderItem={renderDishItem}
            />  
          )
        }
        </View>
      </View>
      <Divider orientation="vertical" width={2} />
      <View 
        style={styles.rightColumn}
      >
        <OrdersTabView style={{flex:1,backgroundColor:"pink"}}/>
      </View>
      <Overlay 
        isVisible={showReceiptDialog} 
        onBackdropPress={() => setShowReceiptDialog(false)}
        overlayStyle={styles.overlayStyle}
      >
        <View style={styles.dialogContainer}>
          <ReceiptView ref={receiptViewRef} edit={false} style={styles.receiptView}/>
        </View>
        <View style={styles.dialogButtonsContainer}>
          <Button title="Cancel" onPress={() => setShowReceiptDialog(false)} buttonStyle={[styles.cancelButton,{backgroundColor:colors.darkText}]}/>
          <Button title="CheckOut" onPress={() => handleReceiptCheckout()}buttonStyle={[styles.checkOutBtn,{backgroundColor:colors.accent}]}/>
        </View>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
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
    // flexGrow:0,
  },
  dishesByTypeContainer:{
    width:"100%",
  },
  dishTypeButtonList:{
    marginLeft:30,
    paddingTop: 25,  
  },
  flatListContainer:{
    flex:1,
    // paddingTop: 20,
    // backgroundColor:"#f0f0f0",
    justifyContent:"center",
    alignItems:"center"
  },
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
