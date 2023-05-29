import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import ChatTypingIndicator from "./ChatTypingIndicator";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import axios from "axios";

const ChatScreen = () => {
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (message) => {
    console.log("chat: ", chat);
    setChat((oldChat) => [...oldChat, { text: message, role: "user" }]);
    let response;
    setIsLoading(true);
    try {
      response = await axios.post("http://192.168.3.155:5000/api/chat", {
        chat: chat,
        prompt: message,
      });
    } catch (err) {
      console.log(err);
    }

    if (response) {
      try {
        const data = await response.data;
        if (!data.type) {
          setChat((oldChat) => [
            ...oldChat,
            { text: data, role: "assistant", type: "chat" },
          ]);
        } else {
          setChat((oldChat) => [...oldChat, { ...data }]);
        }
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.chatContainer}
        data={chat}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ChatBubble data={item} onSend={handleSend}/>}
        contentContainerStyle={styles.chatList}
        ListFooterComponent={isLoading && <ChatTypingIndicator />}
      />
      <ChatInput onSend={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    justifyContent: "flex-end",
  },
  chatContainer: {
    paddingHorizontal: 10,
    flex: 1,
  },
  chatList: {
    paddingTop: 5, // adds padding at the top of the chat history
  },
  typingAnimation: {
    marginBottom: 10,
    marginRight: 10,
    alignSelf: "flex-end",
  },
});

export default ChatScreen;
