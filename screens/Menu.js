import React,{ useEffect} from "react";
import { StyleSheet, View, Text } from "react-native";
import { client, DISHES_QUERY } from "../Gloabls/netRequest";


const MenuScreen = () => {
  useEffect(() => {
    client.request(DISHES_QUERY).then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is MenuScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent:"center",
    alignItems:"center"
  },
  text:{
    fontSize:30,
    // flexDirection:"column"
  },
});

export default MenuScreen;





