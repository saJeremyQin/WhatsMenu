import React from "react";
import { Pressable, View, StyleSheet, Text} from "react-native";
import { AntDesign } from "@expo/vector-icons";


const ShoppingCart = (props) => {
    const count = props.count;
    console.log(count);
    
    return (
        <Pressable style={styles.cartContainer}
            activeOpacity={0.1}
        >
            <AntDesign
                name="shoppingcart"
                size={36}
                color="white"
                style={{paddingLeft:10, paddingTop:10}}
            />
            { count&&count!=0 ? (
                <View style={styles.countContainer}>
                    <Text style={styles.count}>{count}</Text>
                </View>
              ) : null
            }
        </Pressable>
    );
};

const styles=StyleSheet.create({
    cartContainer:{
        width:60,
        height:60,
        backgroundColor:"#000",
        borderRadius:30,      
    },
    countContainer:{
        width:26,
        height:26,
        backgroundColor:"#EA5755",
        borderRadius:13,
        marginTop:-50,
        marginLeft:-10,       
    },
    count:{
        color:"white",
        fontSize:20,
        marginLeft:7,
        marginTop:-2
    }
});

export default ShoppingCart;