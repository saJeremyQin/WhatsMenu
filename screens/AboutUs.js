import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Link from "../components/Link";
import { THEME, windowHeight, windowWidth } from "../globals/constants";

const AboutUsScreen = () => {
  const { colors } = THEME;
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        resizeMode="contain"
        style={styles.fullLogo}
      />
      <Text style={[styles.text, { color: colors.accent }]}>
        The cheapest way to make your own customizable
        restaurant menu app.
      </Text>
      <View style={styles.linksContainer}>
        <Link
          linkUrl="https://whatsmenu-web.vercel.app/"
          linkTitle="What we offer"
        />
        <Link
          linkUrl="https://jeremyqin.vercel.app/"
          linkTitle="My Website"
        />
      </View>
      <Text style={[styles.copyrightText, { color: colors.accent }]}>
        &copy; Jeremy Qin, 2023
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0.03*windowHeight,
  },
  fullLogo: {
    aspectRatio:1,
    width: "10%",
  },
  text: {
    width: 0.9*windowWidth,
    textAlign: "center",
    fontSize: 20,
    marginVertical: 0.03*windowHeight,
  },
  linksContainer: {
    alignItems: "flex-start",
  },
  copyrightText: {
    position: "absolute",
    bottom: 0,
    fontSize: 18,
  },
});
  

export default AboutUsScreen;
