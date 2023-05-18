import React from "react";
import { Overlay, Button } from "react-native-elements";
import { StyleSheet, View, Text } from "react-native";
import { THEME, windowHeight, windowWidth } from "../globals/constants";

const WarningOverlay = ({isVisible, warningTitle, warningContent, onPress}) => {
    const { colors } = THEME;
    return (
        <Overlay
            isVisible={isVisible}
            overlayStyle={styles.warningOverlayStyle}
        >
            <View style={styles.warningContainer}>
                <Text style={[styles.warningTitle, {color:colors.accent}]}>Warning</Text>
                <Text style={[styles.warningContent,{color:colors.text}]}>{warningContent}</Text>
                <Button 
                    title="Ok" 
                    onPress={()=> onPress(false)}
                    buttonStyle={[styles.okButtonStyle,{backgroundColor:colors.accent}]}
                    titleStyle={styles.okButtonTextStyle}
                    containerStyle={styles.okButtonContainerStyle}
                />
            </View>
        </Overlay> 
    )

}


const styles = StyleSheet.create({
    warningOverlayStyle:{
        width:0.36*windowWidth,
        height:0.2*windowHeight,
        backgroundColor: "rgba(3, 3, 3, 0.8)",
        borderRadius:0.02*windowHeight,
        padding:0.03*windowHeight
      },
      warningContainer: {
        // alignItems: "flex-start",
        alignItems:"flex-start",
        // justifyContent:"center",
        marginHorizontal:0.01*windowWidth,
      },
      warningTitle: {
        fontSize: 24,
        marginBottom:0.01*windowHeight,
      },
      warningContent: {
        fontSize: 16,
        textAlign: "center",
        marginBottom:0.02*windowHeight,
      },
      okButtonContainerStyle:{
        marginTop:0.01*windowHeight,
        alignSelf:"flex-end"
      },
      okButtonStyle: {
        borderRadius:0.03*windowHeight,
        width:0.08*windowWidth
      },
      okButtonTextStyle: {
        color: "white",
        fontSize: 16,
      },
});

export default WarningOverlay;