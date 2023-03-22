import React from "react";
import { StyleSheet, View, Text } from "react-native";

const MenuScreen = () => {
  return (
    <View style={styles.container}>
      {/* <FlatList
        data={tables}
        renderItem={renderTableItem}
        keyExtractor={(item) => item.tableNumber.toString()}
      /> */}
      <Text style={styles.text}>This is MenuScreen</Text>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row",
    padding: 10,
    justifyContent:"center",
    alignItems:"center"
  },
  text:{
    fontSize:30,
    flexDirection:"row"
  },
});

export default MenuScreen;





