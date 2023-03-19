import React, { useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { client, DISHES_QUERY } from '../graphql';
import { addDish } from '../redux/actions';
import { openDatabase } from 'expo-sqlite';
import DishCell from '../components/DishCell';

const db = openDatabase('mydb.db');

const Menu = ({ route }) => {
  const { tableNumber } = route.params;
  const dispatch = useDispatch();
  const dishes = useSelector((state) => state.dishes);

  useEffect(() => {
    // Fetch dishes from SQLite database
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Dishes',
        [],
        (_, { rows: { _array } }) => {
          if (_array.length > 0) {
            // Dispatch the dishes to Redux store
            dispatch({ type: 'SET_DISHES', dishes: _array });
          } else {
            // If no dishes found in SQLite database, fetch from GraphQL server
            client
              .request(DISHES_QUERY)
              .then((data) => {
                const { dishes } = data;
                // Dispatch the dishes to Redux store
                dispatch({ type: 'SET_DISHES', dishes });
                // Insert the dishes to SQLite database
                dishes.forEach((dish) => {
                  tx.executeSql(
                    'INSERT INTO Dishes (id, name, description, image, price, type, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [dish.id, dish.name, dish.description, dish.image, dish.price, dish.type, new Date().toISOString()],
                    () => {},
                    (_, error) => {
                      console.log(error);
                    }
                  );
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }
        },
        (_, error) => {
          console.log(error);
        }
      );
    });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => dispatch(addDish(item))}>
      <DishCell dish={item} />
    </TouchableOpacity>
  );

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <FlatList
        data={dishes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.shoppingCartContainer}
        onPress={() => navigation.navigate('Order', { tableNumber })}
      >
        <Text style={styles.shoppingCartText}>
          {dishes.filter((dish) => dish.quantity > 0).length}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  shoppingCartContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 40,
    height: 40,
    backgroundColor: '#008CBA',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export default MenuScreen;