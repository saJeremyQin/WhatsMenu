import React from "react";
import { StyleSheet, View, Text } from "react-native";

const OrdersScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is OrdersScreen</Text>
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
    flexDirection:"row"
  },
});

export default OrdersScreen;
