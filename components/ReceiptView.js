import React,{ useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { selectDishes } from '../redux/slices/dishesSlice';
import { selectOngoingDishesSections } from '../redux/slices/ordersSlice';
import { Divider, Button } from '@rneui/themed';
import { Pressable } from 'react-native';
import { AntDesign } from "@expo/vector-icons";

const ReceiptView = () => {

  const [returningDish, setReturningDish] = useState(false);

  const logo_img = require("../assets/restaurant_logo.png");
  const restaurant = {
    company:"Forks and Chopsticks Asian Restaurant",
    address:"Unit 69/155 Brebner Dr, West Lakes SA 5021",
    logo:logo_img
  };

  // dishSections, [{[dishesPlaced1], time1}, {[dishesPlaced2],time2}]
  const dishes = useSelector(selectDishes);
  const getDishById = (dishId) => {
    const dish = dishes.find((dish) => dish.id === dishId);
    console.log("dishprice is",dish.price);
    return dish;
  };

  const dishesSections = useSelector(selectOngoingDishesSections);

  // Calculate the total money of all sections.
  let subtotal = 0;
  dishesSections.map((dishSection) => {
    console.log("dishSection.dishesOngoing is",dishSection.dishesOngoing);
    subtotal = subtotal + dishSection.dishesOngoing.reduce(
      (acc, dish) => acc + getDishById(dish.dishId).price * dish.dishQuantity,0
    );
    // console.log("subtotal inside is", subtotal);
  })
  
  // console.log("receipt subtotal is", subtotal);
  
  const tax = subtotal * 0.1 ;
  const total = subtotal + tax;

  const btnReturnDishHandler = () => {
    setReturningDish(true);
    console.log("return Dish here");

  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.receiptContainer}>
        <View style={styles.header}>
          <Image style={styles.logo} source={restaurant.logo} />
          <Text style={styles.company}>{restaurant.company}</Text>
          <Text style={styles.address}>{restaurant.address}</Text>
        </View>
        <View style={styles.dishesSections}>
          <View style={styles.sectionHeader}>
            <Text style={styles.itemHeader}>Item</Text>
            <Text style={styles.quantityHeader}>Qty</Text>
            <Text style={styles.priceHeader}>Price</Text>
            { returningDish && (
              <Text style={styles.optHeader}>Opt</Text>
            )}  
          </View>
          {
            dishesSections.map((dishSection, indexS) => {
              const placedTime = dishSection.placedTime;
              const formattedTimestamp = new Date(placedTime).toLocaleString();
              return (
                <React.Fragment key={indexS}>
                {
                  dishSection.dishesOngoing.map((dishItem,indexD) => {
                    const dish = getDishById(dishItem.dishId);
                    {/* console.log("dish inside is",dish); */}
                    return (            
                        <View key={`line-${indexS}-${indexD}`} style={[styles.dishItem, {height: returningDish ? 50 : 30}]}>
                          <Text style={styles.name}>{dish.name}</Text>
                          <Text style={styles.quantity}>{dishItem.dishQuantity}</Text>
                          <Text style={styles.price}>{getDishById(dishItem.dishId).price}</Text>
                          { returningDish && (
                            <Pressable style={styles.delete_container} >
                              <AntDesign name="minus" size={24} color="white"/>
                            </Pressable>
                          )}  
                        </View>                     
                    )
                  })
                }
                <Text style={styles.timeText}>placed on {formattedTimestamp}</Text>
                {indexS < dishesSections.length-1  && <Divider width={1} color={"#ccc"} />}
                </React.Fragment>
              )
            })
          }
        </View>
        <View style={styles.footer}>
          <Text style={styles.subtotal}>Subtotal: {subtotal}</Text>
          <Text style={styles.tax}>Tax: {tax}</Text>
          <Text style={styles.total}>Total: {total}</Text>
        </View>
      </ScrollView>
      <Button
        title="Return Dish"
        buttonStyle={{
            backgroundColor: 'rgba(111, 202, 186, 1)',
            borderRadius: 5,
        }}
        // disabled={orderPlaced}
        titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
        containerStyle={{
            marginVertical: 10,
            alignSelf: 'center', // center the button horizontally
            position:"absolute",
            bottom:30
        }}
        onPress={btnReturnDishHandler}
      />  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: 20,
    // borderWidth: 1,
    // borderColor: '#ccc',
    // borderRadius: 10,
    margin: 10,
    // backgroundColor:"pink",
    width:"100%",
    // alignItems:"center",
    // justifyContent:"space-between"
  },
  receiptContainer:{

  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  header: {
    marginTop: 20,
    alignItems:"center"
  },
  company: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    marginTop: 5,
    fontSize: 14,
  },
  dishesSections: {
    marginTop: 10,
    paddingTop:10,
    paddingHorizontal:5,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderColor: '#ccc',
    alignItems:"center",
    justifyContent:"space-between"
  },
  sectionHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  dishItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    alignItems:"center",
    width:"100%",
    // height:80,
    // backgroundColor:"pink"
  },
  itemHeader: {
    flex: 1,
    fontWeight: 'bold',
  },
  quantityHeader: {
    width: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  priceHeader: {
    width: 70,
    fontWeight: 'bold',
    textAlign: 'right',
  },  
  optHeader:{
    width: 60,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  name: {
    flex: 1,
  },
  quantity: {
    width: 50,
    textAlign: 'center',
  },
  price: {
    width: 70,
    textAlign: 'right',
  },
  delete_container:{
    width:30,
    height:30,
    borderRadius:15,
    backgroundColor:"#f00",
    marginLeft:40,
    // marginRight:10,
    // backgroundColor:"pink",
    justifyContent:"center",
    alignItems:"center"
  },
  timeText:{
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderColor: '#ccc',   
    alignSelf:"flex-end"
  },
  separator:{
    paddingTop:5,
    color:"#ccc"
  },
  footer: {
    alignSelf:"flex-end",
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 10,
  },
  subtotal: {
    textAlign: 'right',
    marginBottom: 5,
  },
  tax: {
    textAlign: 'right',
    marginBottom: 5,
  },
  total: {
    textAlign: 'right',
    fontWeight: 'bold',
  },
});

export default ReceiptView;
