import * as React from "react";
import { Card, Icon } from "react-native-elements";
import { View, Image, Text, StyleSheet } from "react-native";
import { Button } from '@rneui/themed';

const cardSize = 180;


const DishCard = props => {
  const dish = props.dish;
  // console.log(dish);
  return (
      <Card containerStyle={styles.container} wrapperStyle={{alignItems:"center"}}>
        <Card.Title style={styles.title}>{dish.name}</Card.Title>
        <Card.Divider />
        <View
          style={{
            position: "relative",
            // alignItems: "center"
          }}
        >
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{
              uri:dish.image 
            }}
          />
          <Text>{dish.description}</Text>
          <Text style={styles.price}>${dish.price}</Text>
          {/* <Button radius={'sm'} type="solid">
            Save
            <Icon name="save" color="white" />
          </Button> */}
        </View>
      </Card>
  );
}


const styles = StyleSheet.create({
  container:{
    borderWidth: 1,
    borderColor:"#52f",
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
    // paddingHorizontal:0       //can be used to make image occupy the whole width of the card.
  },
  title:{
    // margin:0,
  },
  image:{
    width: 180,
    height: cardSize/1.2,
    // margin:0,
    // padding:0,
    // marginTop: -10
  },
  description:{
    fontSize:20
  },
  price:{
    fontSize:22
  }
});

export default DishCard;



// <View style={styles.container}>
// <TouchableOpacity
//   onPress={() => navigation.navigate("SingleDish", { dish, setAdded })}
//   activeOpacity={0.7}
//   style={[
//     styles.bottom_container,
//     { backgroundColor: colors.dish.background },
//   ]}
// >
//   <Image
//     source={{
//       uri: image || blankImage,
//     }}
//     style={styles.image}
//   />
//   <Text style={[styles.title, { color: colors.dish.title }]}>
//     {dishTitle || "N/A"}
//   </Text>
//   <Text style={[styles.description, { color: colors.dish.description }]}>
//     {dishDescription || "N/A"}
//   </Text>
//   <Text style={[styles.price, { color: colors.dish.price }]}>
//     {currency.sign} {price || "N/A"}
//   </Text>
//   <TouchableOpacity
//     activeOpacity={0.5}
//     style={[styles.add_circle, { backgroundColor: colors.accent }]}
//     onPress={handleAddClick}
//   >
//     {added ? (
//       <MaterialIcons name="done" size={18} />
//     ) : (
//       <AntDesign name="plus" size={18} />
//     )}
//   </TouchableOpacity>
// </TouchableOpacity>
// </View>