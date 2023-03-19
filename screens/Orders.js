import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeDishFromOrder, placeOrder } from '../redux/actions/orderActions';
import { RootState } from '../redux/store';
import { SQLite } from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';

const db = SQLite.openDatabase('restaurant.db');

const OrdersScreen = () => {
  const dispatch = useDispatch();
  const order = useSelector((state: RootState) => state.order);
  const [newDishes, setNewDishes] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Orders WHERE id = ?',
        [order.id],
        (_, { rows: { _array } }) => setNewDishes(_array),
        (_, error) => console.log('Error: ', error)
      );
    });
  }, [order.id]);

  const handleRemoveDish = (dishId: number) => {
    dispatch(removeDishFromOrder(dishId));
  };

  const handlePlaceOrder = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE Orders SET orderStatus = 0 WHERE id = ?',
        [order.id],
        () => dispatch(placeOrder()),
        (_, error) => console.log('Error: ', error)
      );
    });
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text>{item.name}</Text>
      <TouchableOpacity onPress={() => handleRemoveDish(item.dishId)}>
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
        <Text>New Dishes:</Text>
        <Text>Order Amount: {order.amount}</Text>
      </View>
      <FlatList data={newDishes} renderItem={renderItem} keyExtractor={(item) => item.dishId.toString()} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
        <Text>Total: {order.amount}</Text>
        <TouchableOpacity onPress={handlePlaceOrder}>
          <Text>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrdersScreen;
