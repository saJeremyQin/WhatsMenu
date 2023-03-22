import React from "react";
import { StyleSheet, View, Text } from "react-native";

const TablesScreen = () => {
  return (
    <View style={styles.container}>
      {/* <FlatList
        data={tables}
        renderItem={renderTableItem}
        keyExtractor={(item) => item.tableNumber.toString()}
      /> */}
      <Text style={styles.text}>This is TablesScreen</Text>
    </View>
  );
}

export default TablesScreen;






// //Tables.js

// import React, { useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { connect } from 'react-redux';
// import { setCurrentTable } from '../actions/orderActions';

// const TablesScreen = ({ navigation, tables, setCurrentTable }) => {
// useEffect(() => {
// // Load tables data from SQLite or server and dispatch it to Redux store
// // ...
// }, []);

// const handleTablePress = (table) => {
// setCurrentTable(table.tableNumber, table.tableCapacity);
// if (table.orderStatus === 1) {
// navigation.navigate('Order');
// } else {
// navigation.navigate('Menu');
// }
// };

// const renderTableItem = ({ item }) => {
// let orderAmount = null;
// if (item.orderStatus === 1) {
// // Calculate order amount for ongoing orders
// orderAmount = item.OngoingDishes.reduce((total, dish) => {
// return total + dish.price;
// }, 0);
// }

// return (
// <TouchableOpacity onPress={() => handleTablePress(item)}>
// <View style={styles.tableItem}>
// <Text style={styles.tableNumber}>Table {item.tableNumber}</Text>
// {item.orderStatus === 1 ? (
// <>
// <Text style={styles.orderAmount}>Order Amount: ${orderAmount}</Text>
// <Text style={styles.numberOfDiners}>Diners: {item.numberOfDiners}</Text>
// </>
// ) : null}
// </View>
// </TouchableOpacity>
// );
// };

// return (
// <View style={styles.container}>
// <FlatList
// data={tables}
// renderItem={renderTableItem}
// keyExtractor={(item) => item.tableNumber.toString()}
// />
// </View>
// );
// };

// const mapStateToProps = (state) => {
// return {
// tables: state.order.tables,
// };
// };

// export default connect(mapStateToProps, { setCurrentTable })(TablesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"row",
    padding: 10,
    justifyContent:"center",
    alignItems:"center"
  },
  text:{
    fontSize:30
  },
  tableItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
  },
  tableNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  orderAmount: {
    fontSize: 16,
    color: '#555',
  },
  numberOfDiners: {
    fontSize: 16,
    color: '#555',
  },
});

