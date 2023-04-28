import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";
import { THEME } from "../globals/constants";

const HighlightedTable = ({ style }) => {
  const {colors} = THEME;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  const interpolatedColor = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.background, colors.accent],
  });

  return (
    <Animated.View style={[styles.table, { backgroundColor: interpolatedColor }, style]} />
  );
};

const styles = StyleSheet.create({
  table: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default HighlightedTable;
