import {
    View,
    Text,
    StyleSheet,
    Linking,
    Pressable,
} from "react-native";
import { THEME, windowWidth, windowHeight } from "../globals/constants";
  

const Link = ({ linkUrl, linkTitle, spacingV }) => {
  const { colors } = THEME;
  return (
    <Pressable
      onPress={() => Linking.openURL(linkUrl || "")}
      style={[
        styles.container,
        { marginVertical: spacingV || 0.01*windowWidth },
      ]}
    >
      <View style={[styles.circle, { backgroundColor: colors.dialogPrimary }]} />
      <Text style={[styles.linkText, { color: colors.accent }]}>
        {linkTitle || "linkTitle prop is empty"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 0.02*windowWidth,
    height: 0.02*windowWidth,
    borderRadius: 0.01*windowWidth,
    marginRight: 0.01*windowWidth,
  },
  linkText: {
    fontSize: 20,
  },
});


export default Link;