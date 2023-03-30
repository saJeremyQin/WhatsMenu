import React,{ useEffect, useState} from "react";
import { StyleSheet, View, Text, Dimensions, FlatList, Image } from "react-native";
import { client, DISHES_QUERY } from "../Gloabls/netRequest";
import { DISH_TYPES } from "../Gloabls/constants";
import DishCard from "../components/DishCard";
import { Divider } from '@rneui/themed';
import { useSelector } from "react-redux";
// import { selectCurrentTable } from "../redux/slice";
import { selectCurrentTable } from "../redux/slice";

const MenuScreen = () => {

  const [menuData, setMenuData] = useState();
  const [dishesByType, setDishesByType] = useState([]);   //dishes in array by current activeType

  const currentTableNum = useSelector(selectCurrentTable);
  console.log("current table is", currentTableNum);

  useEffect(() => {
    console.log(Dimensions.get("window").width);
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
      <View style={styles.headerContainer}>
        <Image
            source={require("../assets/table.png")}
            containerStyle={styles.headerItem}
            resizeMode="contain"
            // PlaceholderContent={<ActivityIndicator />}
        />        
        <Text style={styles.headerText}>
          Table26
        </Text>
        {/* <Button title="Test" style={{width:100}} /> */}
      </View>
      <Divider width={3} color={"#887"} />
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
    backgroundColor:"pink"
  },
  headerContainer:{
    flex:1,
    flexDirection:"row",
    backgroundColor:"green",
    paddingLeft:40,
    marginTop:40,
    marginBottom:40,
    justifyContent:"flex-start",
    alignItems:"center",
    height:100
  },
  headerItem:{
    // aspectRatio: 1,
    // width: "5%",
    width:64,
    height:64,
    // height: "auto"
    // borderWidth: 3,
    // borderColor:"#606"
    // verticalAlign:"middle"
  },
  headerText: {
    // borderWidth: 3,
    // borderColor:"#606",
    // backgroundColor:"blue",
    textAlign: 'center',
    fontSize: 30,
    minHeight:50,
    // color:"red",
  },
  flatlistContainer:{
    paddingTop: 20,
    justifyContent:"flex-start",
    alignItems:"center"
  },
  flat_list: {
    height: 700,
    flexGrow: 0,
    paddingHorizontal: 20,
  },
});

export default MenuScreen;





