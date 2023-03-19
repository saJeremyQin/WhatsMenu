import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { openDatabase } from 'expo-sqlite';
import { updateTable } from '../store/actions/tables';

const db = openDatabase('mydb.db');

const TablesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const tables = useSelector((state) => state.tables.tables);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS tables (id INTEGER PRIMARY KEY AUTOINCREMENT, tableNumber INTEGER, tableCapacity INTEGER)'
      );
    });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT tables.id AS id, tableNumber, tableCapacity, COUNT(orders.id) AS orderCount, SUM(price) AS orderAmount FROM tables LEFT JOIN orders ON tables.id = orders.tableId WHERE orders.orderStatus = 1 OR orders.orderStatus IS NULL GROUP BY tables.id ORDER BY tableNumber',
          [],
          (_, { rows: { _array } }) => {
            dispatch(updateTable(_array));
          }
        );
      });
    });

    return unsubscribe;
  }, [dispatch, navigation]);

  const renderTableItem = ({ item }) => {
    const handleTablePress = () => {
      navigation.navigate('Menu', { tableNumber: item.tableNumber });
    };

    return (
      <TouchableOpacity style={styles.tableItem} onPress={handleTablePress}>
        <View style={styles.tableInfo}>
          <Text style={styles.tableNumber}>Table {item.tableNumber}</Text>
          <Text style={styles.tableCapacity}>Capacity: {item.tableCapacity}</Text>
          <Text style={styles.tableStatus}>
            {item.orderCount > 0 ? `Order Amount: ${item.orderAmount}` : 'Status: Available'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={tables} renderItem={renderTableItem} keyExtractor={(item) => item.id.toString()} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableItem: {
    width: '90%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  tableNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tableCapacity: {
    fontSize: 14,
    color: '#888',
  },
  tableStatus: {
    fontSize: 14,
    color: '#888',
  },
};

export default TablesScreen;


import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { setCurrentTable } from '../actions/orderActions';

const TablesScreen = ({ navigation, tables, setCurrentTable }) => {
  useEffect(() => {
    // Load tables data from SQLite or server and dispatch it to Redux store
    // ...
  }, []);

  const handleTablePress = (table) => {
    setCurrentTable(table.tableNumber, table.tableCapacity);
    if (table.orderStatus === 1) {
      navigation.navigate('Order');
    } else {
      navigation.navigate('Menu');
    }
  };

  const renderTableItem = ({ item }) => {
    let orderAmount = null;
    if (item.orderStatus === 1) {
      // Calculate order amount for ongoing orders
      orderAmount = item.OngoingDishes.reduce((total, dish) => {
        return total + dish.price;
      }, 0);
    }

    return (
      <TouchableOpacity onPress={() => handleTablePress(item)}>
        <View style={styles.tableItem}>
          <Text style={styles.tableNumber}>Table {item.tableNumber}</Text>
          {item.orderStatus === 1 ? (
            <>
              <Text style={styles.orderAmount}>Order Amount: ${orderAmount}</Text>
              <Text style={styles.numberOfDiners}>Diners: {item.numberOfDiners}</Text>
            </>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tables}
        renderItem={renderTableItem}
        keyExtractor={(item) => item.tableNumber.toString()}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    tables: state.order.tables,
  };
};

export default connect(mapStateToProps, { setCurrentTable })(TablesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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

/*In this code, we import the setCurrentTable action creator from orderActions, and use connect to map the tables state from the Redux store to the component's props. We also pass setCurrentTable as a second argument to connect, which makes it available as a prop in the component.

In the TablesScreen component, we use handleTablePress to dispatch the setCurrentTable action when a table is pressed, and navigate to the Menu screen. We also use renderTableItem to render each table item in the FlatList.

Finally, we export the component wrapped with connect to connect it to the Redux store.*/
