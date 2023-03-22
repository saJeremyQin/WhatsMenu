import React from "react";
import { StyleSheet, View, Text } from "react-native";

const AboutUsScreen = () => {
  return (
    <View style={styles.container}>
      {/* <FlatList
        data={tables}
        renderItem={renderTableItem}
        keyExtractor={(item) => item.tableNumber.toString()}
      /> */}
      <Text style={styles.text}>This is AboutUsScreen</Text>
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
      fontSize:30
    },
});
  

export default AboutUsScreen;
