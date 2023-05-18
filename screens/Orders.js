import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, View, Text, FlatList, Image, Dimensions, Alert } from "react-native";
import { Button, Divider, Overlay } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import * as Print from 'expo-print';

import { 
  placeOrder, 
  checkOutOrder,
  selectCurrentOrder, 
  selectCurrentTable,
  selectNumberOfDiners,
  selectTotalAmountByTableNumber
} from "../redux/slices/ordersSlice";
import { selectDishes, selectDishesByType } from "../redux/slices/dishesSlice";
import { ReturningDishContext } from "../context/appContext";

import OrdersTabView from "../navigation/OrdersTabView";
import CartDish from "../components/CartDish";
import DishCard from "../components/DishCard";
import ReceiptView,{ generateReceiptHTML } from "../components/ReceiptView";
import WarningOverlay from "../components/WarningOverlay";

import { DishTypeButton } from "../components/DishTypeButton";
import { THEME, DISH_TYPES, windowHeight, windowWidth } from "../globals/constants";

const OrdersScreen = ({navigation}) => {
  const {colors} = THEME;
  const {isReturningDish} = useContext(ReturningDishContext);
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [showWarningOverlay, setShowWarningOverlay] = useState(false);
  const [warningContent, setWarningContent] = useState('');

  const receiptViewRef = useRef(null);
  // Write the logic of menuScreen
  const dispatch = useDispatch();
  const [curDishType, setCurDishType] = useState("main");

  // Get the dishes by current dishType
  const dishesByType = useSelector(selectDishesByType(curDishType));

  const currentTableNum = useSelector(selectCurrentTable);
  // console.log("current table is",currentTableNum);
  const dishesCountInShoppingCart = (useSelector(selectCurrentOrder))?.shoppingCartDishes.length;
  const dinersNum = useSelector(selectNumberOfDiners);
  const total = useSelector(selectTotalAmountByTableNumber(currentTableNum));

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={ btnCheckOutHandler } title="CheckOut" titleStyle={{fontSize:14}} buttonStyle={{backgroundColor:colors.accent}} />
      ),
    });
  }, [isReturningDish, total]);

  const btnCheckOutHandler = () => {
    // console.log("isReturningDish in Orders is", isReturningDish);
    if(total === 0) {
      // Alert.alert("Warning", "No placed dishes to check out");
      setWarningContent("No placed dishes to check out");
      setShowWarningOverlay(true);
      return ;
    }
    if(isReturningDish) {
      // Alert.alert("Warning", "You are returning dish, can't check out!");
      setWarningContent("You are returning dish, can't check out!");
      setShowWarningOverlay(true);
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
            <Text 
              style={{
                fontSize:20,
                color:colors.dialogPrimary
              }}
            >
              There are no dishes for current type!
            </Text>
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
          <Button title="Cancel" onPress={() => setShowReceiptDialog(false)} buttonStyle={[styles.cancelBtn,{backgroundColor:colors.darkText}]}/>
          <Button title="CheckOut" onPress={() => handleReceiptCheckout()}buttonStyle={[styles.checkOutBtn,{backgroundColor:colors.accent}]}/>
        </View>
      </Overlay>
      <WarningOverlay
        isVisible={showWarningOverlay}
        warningTitle="Warning"
        warningContent={warningContent}
        onPress={() => setShowWarningOverlay(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftColumn: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dishesByTypeButtonContainer:{
    width:"100%",
    // height:80,
    height: 0.12*windowHeight,
    // backgroundColor:"pink"
  },
  dishesByTypeContainer:{
    width:"100%",
  },
  dishTypeButtonList:{
    marginLeft:"4%",
    // paddingTop: 25,  
    paddingTop: 0.02*windowHeight,
  },
  flatListContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  dishesList: {
    // marginTop:10,
    marginTop:0.01*windowHeight,
    // paddingHorizontal: 10,
    paddingHorizontal:0.01*windowWidth,
    // backgroundColor:"red"
  },
  rightColumn: {
    flex: 2,
    backgroundColor: '#eee',
    // height: Dimensions.get("window").height-120,
    height: windowHeight*0.9,
    overflow:"hidden"
  },
  flatList:{
    // marginTop:30,
    marginTop: 0.04*windowHeight,
    width:"80%"
  },
  overlayStyle:{
    // width:512,
    width: 0.6*windowWidth,
    // height:680,
    height:0.9*windowHeight,
    backgroundColor: 'white',
    // borderRadius: 20,
    borderRadius:0.02*windowWidth,
    // padding: 15,
    padding:0.015*windowWidth,
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
    // height:600,
    height:0.8*windowHeight,
    // padding: 10,
    padding:0.01*windowWidth,
    // borderRadius: 10,
    borderRadius:0.01*windowWidth
  },  
  receiptView:{
    flex:1
  },
  dialogButtonsContainer: {
    // marginTop:10,
    marginTop:0.01*windowHeight,
    // height:40,
    height:0.06*windowHeight,
    flexDirection: 'row',
    justifyContent: "space-evenly",
  },
  cancelBtn: {
    // width:100
    width:0.1*windowWidth,
  },
  checkOutBtn: {
    // width:100,
    width:0.1*windowWidth,
  },
  warningOverlayStyle:{
    // width:512,
    width:0.4*windowWidth,
    // height:180,
    height:0.25*windowHeight,
    backgroundColor: "rgba(3, 3, 3, 0.8)",
    // borderRadius: 10,
    borderRadius:0.01*windowWidth,
    // padding: 20,
    padding:0.02*windowWidth,
  },
  warningContainer: {
    alignItems: "flex-start",
    // marginHorizontal:10
    marginHorizontal:0.01*windowWidth,
  },
  warningTitle: {
    fontSize: 24,
    // marginBottom: 10,
    marginBottom:0.01*windowWidth,
  },
  warningContent: {
    // color: "#fff",
    fontSize: 16,
    textAlign: "center",
    // marginBottom: 20,
    marginBottom: 0.03*windowHeight,
  },
  okButtonContainerStyle:{
    // marginTop:10,
    marginTop:0.01*windowWidth,
    alignSelf:"flex-end"
  },
  okButtonStyle: {
    // backgroundColor: "#fff",
    // borderRadius: 20,
    borderRadius:0.02*windowWidth,
    // width: 100,
    width:0.1*windowWidth
  },
  okButtonTextStyle: {
    color: "white",
    fontSize: 16,
  },
});
  

export default OrdersScreen;
