import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectDishes } from '../redux/slices/dishesSlice';

const Receipt = ({ header, lineItems, footer }) => {

  // const dishes = useSelector(selectDishes);
  // const getDishById = (dishId) => {
  //   const dish = dishes.find((dish) => dish.id === dishId);
  //   console.log("dishprice is",dish.price);
  //   return dish;
  // };

  // const subtotal = lineItems.reduce(
  //     (acc, dish) => acc + getDishById(dish.dishId).price * dish.dishQuantity,0
  // );
  
  // const tax = subtotal * 0.1 ;
  // const total = subtotal + tax;

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Image style={styles.logo} source={header.logo} />
        <Text style={styles.company}>{header.company}</Text>
        <Text style={styles.address}>{header.address}</Text>
      </View>
      <View style={styles.lineItems}>
        <View style={styles.lineItem}>
          <Text style={styles.itemHeader}>Item</Text>
          <Text style={styles.quantityHeader}>Qty</Text>
          <Text style={styles.priceHeader}>Price</Text>
        </View>
        {
          lineItems.map((item,index) => {
            const dish = getDishById(item.dishId);
            return (
              <View key={`line-item-${index}`} style={styles.lineItem}>
                <Text style={styles.name}>{dish.name}</Text>
                <Text style={styles.quantity}>{item.dishQuantity}</Text>
                <Text style={styles.price}>{getDishById(item.dishId).price}</Text>
              </View>
            )
          })
        }
      </View>
      <View style={styles.footer}>
        <Text style={styles.subtotal}>Subtotal: {subtotal}</Text>
        <Text style={styles.tax}>Tax: {tax}</Text>
        <Text style={styles.total}>Total: {total}</Text>
      </View> */}
      <Text>This is Receipt</Text>
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
    // backgroundColor:"pink",
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
  lineItems: {
    marginTop: 20,
    paddingTop:20,
    paddingHorizontal:5,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  lineItem: {
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

export default Receipt;
