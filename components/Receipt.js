import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Receipt = props => {
    { items, subtotal, tax, discount, total } = props;

    return (
        <View style={styles.container}>
        <Text style={styles.header}>Receipt</Text>
        <View style={styles.itemList}>
            {items.map((item, index) => (
            <View style={styles.item} key={index}>
                <Text>{item.name}</Text>
                <Text>{item.price}</Text>
            </View>
            ))}
        </View>
        <View style={styles.totals}>
            <View style={styles.totalRow}>
            <Text>Subtotal:</Text>
            <Text>{subtotal}</Text>
            </View>
            <View style={styles.totalRow}>
            <Text>Tax:</Text>
            <Text>{tax}</Text>
            </View>
            <View style={styles.totalRow}>
            <Text>Discount:</Text>
            <Text>{discount}</Text>
            </View>
            <View style={styles.totalRow}>
            <Text>Total:</Text>
            <Text>{total}</Text>
            </View>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemList: {
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totals: {
    borderTopWidth: 1,
    paddingTop: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});

export default Receipt;
