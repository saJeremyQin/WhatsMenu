import { Pressable, Text, StyleSheet } from "react-native";
import { THEME } from "../globals/constants";

export function DishTypeButton({ title, slug, onPress, id, active }) {
  const {colors} = THEME;
  return (
    <Pressable
      onPress={() => onPress(slug, id)}
      style={[
        styles.dish_type_btn,
        {
          backgroundColor: active
            ? colors.dialogPrimary
            : colors.brightBackground
        },
      ]}
    >
      <Text
        style={[styles.dish_type_text, { color: active ? "#FFF" : "#000" }]}
      >
        {title}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  dish_type_btn: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    height: 35,
    paddingHorizontal: 15,
    borderRadius: 30,
    borderColor: "#000",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dish_type_text: {
    fontWeight: "300",
  },
});
