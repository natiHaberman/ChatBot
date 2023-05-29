import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

function ChatPressable({onPress, text, color}) {
    return (
      <Pressable style={[styles.container, { backgroundColor: color }]} onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      borderRadius: 20,
      margin: 10,
      padding: 10,
      alignSelf: "flex-start",
    },
    text: {
      fontSize: 16,
      color: "white",
    },
  });
  
  export default ChatPressable;