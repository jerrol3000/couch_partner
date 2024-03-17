import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const AnimatedCheckMark = ({ isVisible }) => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start(() => {
        // Reset the scale value after the animation completes
        scaleValue.setValue(0);
      });
    }
  }, [isVisible]);
  return (
    isVisible && (
      <View style={styles.container}>
        <Animated.View
          style={[styles.checkMark, { transform: [{ scale: scaleValue }] }]}
        >
          <Icon
            name="check-circle"
            type="material"
            size={100}
            color="#00FF00"
          />
        </Animated.View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "50%",
    left: "40%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkMark: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 25,
    padding: 5,
  },
});

export default AnimatedCheckMark;
