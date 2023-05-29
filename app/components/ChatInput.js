import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const ChatInput = ({onSend}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    onSend(message);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        value={message} 
        onChangeText={setMessage} 
        placeholder="Type a message"
        placeholderTextColor="grey"
      />
      <Button title="Send" onPress={handleSend} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopColor: 'grey',
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 20,
  },
});

export default ChatInput;