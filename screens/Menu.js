import React,{ useEffect, useState} from "react";
import { StyleSheet, View, Text, Dimensions, FlatList } from "react-native";
import { client, DISHES_QUERY } from "../Gloabls/netRequest";
import { DISH_TYPES } from "../Gloabls/constants";
import DishCard from "../components/DishCard";
import { Divider } from '@rneui/themed';

const MenuScreen = () => {

  const [menuData, setMenuData] = useState();
  const [dishesByType, setDishesByType] = useState([]);   //dishes in array by current activeType
  console.log(menuData);

  useEffect(() => {
    client.request(DISHES_QUERY).then((data) => {
      setMenuData(data.dishes);
      const filterByDishesTypeArr = data.dishes.filter((dish) => dish.type == "main");
      setDishesByType(filterByDishesTypeArr);    
    });
  }, []);

  const renderDishItem = ({item}) => {
      return (
        <DishCard 
          // image={item.image}
          // title={item.name}
          // description={item.description}
          // price={item.price}
          // id={item.id}
          // navigation={navigation}
          dish={item}
        />
      );
  };
  // {
  //   console.log("the data is",dishesByType)
  // }
  return (
    <React.Fragment>
      <View>
        <Text style={styles.horizontalText}>
          Horizontal Divider with width and color
        </Text>
        <Divider width={3} color={"#887"} />
      </View>
      <View style={styles.flatlistContainer}> 
        <FlatList
          data={dishesByType}
          numColumns={5}
          width={Dimensions.get('window').width}
          style={styles.flat_list}
          alignItems={dishesByType.length > 1 ? "flex-start":"center"}
          renderItem={renderDishItem}
        />    
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // justifyContent:"center",
    // alignItems:"center"
  },
  horizontalText: {
    textAlign: 'center',
    fontSize: 24,
    marginVertical: 10,
  },
  flatlistContainer:{
    // flex: 1,
    padding: 10,
    justifyContent:"flex-start",
    alignItems:"center"
  },
  text:{
    fontSize:30,
    // flexDirection:"column"
  },
  flat_list: {
    height: 700,
    flexGrow: 0,
    paddingHorizontal: 20,
  },
});

export default MenuScreen;





