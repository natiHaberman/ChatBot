import React, {useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Easing } from 'react-native';

// Create a Dot component for the animation
const Dot = () => {
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad),
        }),
        Animated.timing(scale, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad),
        }),
      ]),
      { iterations: -1 },
    ).start();
  }, [scale]);

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          transform: [{ scale }],
        },
      ]}
    />
  );
};

const TypingIndicator = () => {
  return (
    <View style={styles.botBubble}>
      <View style={styles.container}>
        <Dot />
        <Dot />
        <Dot />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#000",
    borderRadius: 20,
    margin: 10,
    padding: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
});

export default TypingIndicator;
