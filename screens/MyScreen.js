import React from 'react';
import { View } from 'react-native';
import { Button, Card, Input } from 'react-native-elements';

const MyScreen = () => {
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 1 }}>
        <Card title="Card Title">
          <Input placeholder="Input Field" />
          <Button title="Button" />
        </Card>
      </View>
      <View style={{ flex: 1 }}>
        <Card title="Card Title">
          <Input placeholder="Input Field" />
          <Button title="Button" />
        </Card>
      </View>
    </View>
  );
};

export default MyScreen;


// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { FlatList, Text, TouchableOpacity, View } from 'react-native';
// import { openDatabase } from 'expo-sqlite';
// import { updateTable } from '../store/actions/tables';

// const db = openDatabase('mydb.db');

// const TablesScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const tables = useSelector((state) => state.tables.tables);

//   useEffect(() => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         'CREATE TABLE IF NOT EXISTS tables (id INTEGER PRIMARY KEY AUTOINCREMENT, tableNumber INTEGER, tableCapacity INTEGER)'
//       );
//     });
//   }, []);

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       db.transaction((tx) => {
//         tx.executeSql(
//           'SELECT tables.id AS id, tableNumber, tableCapacity, COUNT(orders.id) AS orderCount, SUM(price) AS orderAmount FROM tables LEFT JOIN orders ON tables.id = orders.tableId WHERE orders.orderStatus = 1 OR orders.orderStatus IS NULL GROUP BY tables.id ORDER BY tableNumber',
//           [],
//           (_, { rows: { _array } }) => {
//             dispatch(updateTable(_array));
//           }
//         );
//       });
//     });

//     return unsubscribe;
//   }, [dispatch, navigation]);

//   const renderTableItem = ({ item }) => {
//     const handleTablePress = () => {
//       navigation.navigate('Menu', { tableNumber: item.tableNumber });
//     };

//     return (
//       <TouchableOpacity style={styles.tableItem} onPress={handleTablePress}>
//         <View style={styles.tableInfo}>
//           <Text style={styles.tableNumber}>Table {item.tableNumber}</Text>
//           <Text style={styles.tableCapacity}>Capacity: {item.tableCapacity}</Text>
//           <Text style={styles.tableStatus}>
//             {item.orderCount > 0 ? `Order Amount: ${item.orderAmount}` : 'Status: Available'}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList data={tables} renderItem={renderTableItem} keyExtractor={(item) => item.id.toString()} />
//     </View>
//   );
// };

// const styles = {
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   tableItem: {
//     width: '90%',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   tableInfo: {
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//   },
//   tableNumber: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   tableCapacity: {
//     fontSize: 14,
//     color: '#888',
//   },
//   tableStatus: {
//     fontSize: 14,
//     color: '#888',
//   },
// };

// export default TablesScreen;


// import { useEffect } from 'react';

// import { useWindowDimensions } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from "@react-navigation/native";
// import * as ScreenOrientation from 'expo-screen-orientation';

// import TablesScreen from './screens/Tables';
// import MenuScreen from './screens/Menu';

// const Tab = createBottomTabNavigator();

// export default function App() {
//   const dimensions = useWindowDimensions();
//   const isLandscape = dimensions.width > dimensions.height;
//   console.log("Horizontally display!, ", isLandscape);

//   useEffect(() => {
//     try {
//       ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
//     } catch (error) {
//       console.log(error);   
//     }

//     return () => {
//       ScreenOrientation.unlockAsync();
//     };
//   },[]);

//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={{
//           tabBarStyle: {
//             backgroundColor: '#333',
//             flexDirection: isLandscape ? 'column':'row', // change flexDirection doesn't take any effect
//             width: isLandscape ? 300 : '100%', // set width based on orientation
//           },
//           tabBarItemStyle: {
//             justifyContent: 'center',
//             alignItems: 'center',
//           },
//           tabBarItemLabelStyle: {
//             fontSize: 16,
//           },
//         }}
//       >
//         <Tab.Screen
//           name="Tables"
//           component={TablesScreen}
//           options={{
//             tabBarLabel: 'Tables',
//           }}
//         />
//         <Tab.Screen
//           name="Menu"
//           component={MenuScreen}
//           options={{
//             // tabBarIcon: ({ color, size }) => (
//             //   <Icon name="settings" color={color} size={size} />
//             // ),
//             tabBarLabel: 'Menu',
//           }}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

