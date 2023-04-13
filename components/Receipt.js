import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Receipt = ({ header, lineItems, footer }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
        {lineItems.map((item) => (
          <View key={item.id} style={styles.lineItem}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={styles.subtotal}>Subtotal: {footer.subtotal}</Text>
        <Text style={styles.tax}>Tax: {footer.tax}</Text>
        <Text style={styles.total}>Total: {footer.total}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
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
