import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectDishes } from '../redux/slices/dishesSlice';
import { selectOngoingDishesSections } from '../redux/slices/ordersSlice';

const ReceiptView = () => {

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
    console.log("subtotal inside is", subtotal);
  })
  
  console.log("receipt subtotal is", subtotal);
  
  const tax = subtotal * 0.1 ;
  const total = subtotal + tax;

  return (
    <View style={styles.container}>
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
        </View>
        {
          dishesSections.map((dishSection, indexS) => {
            return dishSection.dishesOngoing.map((dishItem,indexD) => {
              const dish = getDishById(dishItem.dishId);
              console.log("dish inside is",dish);
              return (
                <View style={styles.dishSection}>
                {/* {console.log(`line-${indexS}-${indexD}`)} */}                
                  <View key={`line-${indexS}-${indexD}`} style={styles.dishItem}>
                    <Text style={styles.name}>{dish.name}</Text>
                    <Text style={styles.quantity}>{dishItem.dishQuantity}</Text>
                    <Text style={styles.price}>{getDishById(dishItem.dishId).price}</Text>
                  </View>                     
                </View>
              )
            })
          })
        }
      </View>
      <View style={styles.footer}>
        <Text style={styles.subtotal}>Subtotal: {subtotal}</Text>
        <Text style={styles.tax}>Tax: {tax}</Text>
        <Text style={styles.total}>Total: {total}</Text>
      </View>
      {/* <Text>This is Receipt</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    margin: 10,
    backgroundColor:"pink",
    width:"100%",
    // alignItems:"center"
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
    marginTop: 20,
    paddingTop:20,
    paddingHorizontal:5,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  dishSection:{
    // flex:1,
    // borderTopWidth: 1,
    // borderColor: '#ccc',
    backgroundColor:"pink"
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
  footer: {
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
