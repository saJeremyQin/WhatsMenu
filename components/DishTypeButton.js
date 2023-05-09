import { Pressable, Text, StyleSheet } from "react-native";
import { THEME, windowHeight, windowWidth } from "../globals/constants";

export function DishTypeButton({ title, slug, onPress, id, active }) {
  const {colors} = THEME;
  return (
    <Pressable
      onPress={() => onPress(slug, id)}
      style={[
        styles.dishTypeBtn,
        {
          borderColor:colors.accent,
          backgroundColor: active
            ? colors.dialogPrimary
            : colors.brightBackground
        },
      ]}
    >
      <Text
        style={[styles.dishTypeText, { color: active ?  colors.background : colors.accent}]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  dishTypeBtn: {
    // marginHorizontal: 10,
    marginHorizontal:0.01*windowWidth,
    // height: 35,
    height: 0.05*windowHeight,
    // paddingHorizontal: 15,
    paddingHorizontal:0.015*windowWidth,
    // borderRadius: 30,
    borderRadius:0.03*windowWidth,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dishTypeText: {
    fontWeight: "300",
    fontSize:20
  },
});
