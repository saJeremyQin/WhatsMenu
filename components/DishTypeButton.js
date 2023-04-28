import { Pressable, Text, StyleSheet } from "react-native";
import { THEME } from "../globals/constants";

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
}
const styles = StyleSheet.create({
  dishTypeBtn: {
    marginHorizontal: 10,
    height: 35,
    paddingHorizontal: 15,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dishTypeText: {
    fontWeight: "300",
    fontSize:20
  },
});
