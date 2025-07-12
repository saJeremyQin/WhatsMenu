import React,{ useCallback, useEffect,useState } from "react";
import { StyleSheet, View, Text, Image, FlatList, Alert, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, selectOrders,resumeOrder } from "../redux/slices/ordersSlice";
import { fetchDishes, selectDishes } from "../redux/slices/dishesSlice";
import { Overlay, Button, Input, Divider, colors } from "react-native-elements";
import { DISHES_QUERY } from "../globals/netRequest";
import TableCard from "../components/TableCard";
import { THEME, windowWidth,windowHeight } from '../globals/constants';
import WarningOverlay from "../components/WarningOverlay";

// Keep it a pure function, variable read only is ok.
const numOfTables = 30;

const TablesScreen = ({navigation}) => {
  const { colors } = THEME;
  // const { loading, error, data } = useQuery(DISHES_QUERY);

  const dispatch = useDispatch();
  const tableNumbers = Array.from({length: numOfTables}, (_, index) => index + 1);

  const [showNumbersOfDiners, setShowNumbersOfDiners] = useState(false);
  const [tableNumber, setTableNumber] = useState(null);
  const [numberOfDiners, setNumberOfDiners] = useState(null);
  const [showWarningOverlay, setShowWarningOverlay] = useState(false);
  const [warningContent, setWarningContent] = useState('');

  // Get the data, loading status and error from Redux
  const dishes = useSelector(selectDishes);
  const loadingDishes = useSelector(state => state.allDishes.loading);
  const dishError = useSelector(state => state.allDishes.error);

  const orders = useSelector(selectOrders);

  // When mounting, dishpatch fetchDishes thunk action
  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  // Error displaying
  useEffect(() => {
    if(dishError) {
      console.error("❌ Dish Fetch Error from Redux:", dishError);
      setWarningContent(`Network issue! Please check your internet connection. Error: ${dishError}`);
      setShowWarningOverlay(true);
    } else {
      setShowWarningOverlay(false);
    }
  }, [dishError]);

  // This is the function pass down to child component and invoked by TableCard.
  // Use useCallback to wrap handleNeedCreateOrder

  const handleNeedCreateOrder = useCallback((tableNumber) => {
    setTableNumber(tableNumber);
    setShowNumbersOfDiners(true);
  }, []);

  // Open one new table after input numberOfDiners
  const handleDialogSubmit = () => {
    dispatch(
      createOrder({
        tableNumber,
        numberOfDiners
      })
    );
    setShowNumbersOfDiners(false);
    navigation.navigate("Orders");
  };

  // Pass the function cached directly
  const renderTableItem = useCallback(({item}) => {
    return (
      <TableCard 
        // Pass handleTableCardClick directly, instead of wrapping it in a new ananymous function
        // It can receive parameter of item interally
        tableNumber={item} 
        onNeedCreateOrder={handleNeedCreateOrder} 
      />    
    )
  },[handleNeedCreateOrder]) 


  return (
    <View style={styles.container}>
      <View style={[styles.headContainer,{backgroundColor:colors.darkBG}]}>
        <Image 
          source={require("../assets/logo.png")}
          resizeMode="contain"
          style={styles.headerImage}
        />
        <Text style={[styles.headerText, {color: colors.text}]}>
          Welcome to WhatsMenu
        </Text>
      </View>
      <Divider width={1} color="#333" />
      <FlatList
        data={tableNumbers}
        numColumns={4}
        renderItem={renderTableItem}
        keyExtractor={(item) => item.toString()}
        style={[styles.flatList,{backgroundColor: colors.background}]}
      />
      <Overlay 
        isVisible={showNumbersOfDiners} 
        onBackdropPress={() => setShowNumbersOfDiners(false)}
        overlayStyle={[styles.overlayStyle,{backgroundColor:colors.background}]}
      >
        <View style={[styles.dialogContainer,{backgroundColor:colors.brightBackground}]}>
          <Text style={[styles.dialogTitle,{color:colors.accent}]}>Enter Number of Diners Table {tableNumber}</Text>
          <Input
            placeholder="Number of Diners"
            keyboardType="numeric"
            onChangeText={value => setNumberOfDiners(value)}
            style={[styles.input, {borderColor:colors.accent}]}
            inputContainerStyle={{borderBottomWidth: 0}} // add this line
          />
          <View style={styles.dialogButtonsContainer}>
            <Button title="Cancel" onPress={() => setShowNumbersOfDiners(false)} buttonStyle={[styles.cancelButton,{backgroundColor:colors.darkText}]} titleStyle={{fontSize:14}}/>
            <Button title="Ok" onPress={handleDialogSubmit} buttonStyle={[styles.okButton, {backgroundColor:colors.accent}]} titleStyle={{fontSize:14}}/>
          </View>
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

const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
  },
  headContainer:{
    flex:1,
    flexDirection:"row",
    // paddingHorizontal:40,
    paddingHorizontal: 0.05*windowWidth,
    // marginTop:20,
    marginTop: 0.015*windowHeight,
    justifyContent:"flex-start",
    alignItems:"center",
    // minHeight:80,
    minHeight:0.1*windowHeight
  },
  headerImage:{
    aspectRatio: 1,
    width: "5%",
  },
  headerText:{
    fontSize:20,
    // minHeight:50,
    minHeight: 0.05*windowHeight,
    // paddingLeft:30,
    paddingLeft:0.02*windowWidth,
    // lineHeight:60,
    lineHeight:0.07*windowHeight
  },
  flatList:{ 
    padding: 16 
  },
  overlayStyle: {
    // borderRadius: 20,
    borderRadius: 0.02*windowWidth,
    // padding: 15,
    padding: 0.02*windowHeight,
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
    // padding: 20,
    padding:0.02*windowHeight,
    // borderRadius: 15,
    borderRadius:0.02*windowHeight,
    elevation:5,
    // backgroundColor:"pink"
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginBottom: 20,
    marginBottom:0.02*windowHeight
  },
  input:{
    borderWidth: 1,
    // borderRadius: 5,
    borderRadius:0.01*windowHeight,
    paddingLeft:0.01*windowHeight,
  },
  dialogButtonsContainer: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
  },
  cancelButton: {
    // width:80,
    width: 0.08*windowWidth,
  },
  okButton: {
    // width:80
    width:0.08*windowWidth,
  },
  warningOverlayStyle:{
    // width:512,
    width:0.4*windowWidth,
    // height:180,
    height:0.25*windowHeight,
    backgroundColor: "rgba(3, 3, 3, 0.8)",
    // borderRadius: 10,
    borderRadius:0.02*windowHeight,
    // padding: 20,
    padding:0.03*windowHeight
  },
  warningContainer: {
    alignItems: "flex-start",
    // marginHorizontal:10
    marginHorizontal:0.01*windowWidth,
  },
  warningTitle: {
    fontSize: 24,
    // marginBottom: 10,
    marginBottom:0.01*windowHeight,
  },
  warningContent: {
    // color: "#fff",
    fontSize: 16,
    textAlign: "center",
    // marginBottom: 20,
    marginBottom:0.02*windowHeight,
  },
  okButtonContainerStyle:{
    // marginTop:10,
    marginTop:0.01*windowHeight,
    alignSelf:"flex-end"
  },
  okButtonStyle: {
    // backgroundColor: "#fff",
    // borderRadius: 20,
    borderRadius:0.03*windowHeight,
    // width: 100,
    width:0.12*windowWidth
  },
  okButtonTextStyle: {
    color: "white",
    fontSize: 16,
  },
});

export default TablesScreen;

