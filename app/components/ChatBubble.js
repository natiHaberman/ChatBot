import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ChatPressable from "./ChatPressable";

const ChatBubble = ({ data, onSend }) => {
  const { role, type, text, intro, solutions, questions } = data;
  const bubbleStyle = role == "user" ? styles.userBubble : styles.botBubble;
  const textStyle = role == "user" ? styles.userText : styles.botText;

  const handleSolutionPress = async (pressableText) => {
    // Add your desired functionality here
    console.log(`Solution pressed: ${text}`);
    onSend(pressableText);
  };

  const handleQuestionPress = async (pressableText) => {
    // Add your desired functionality here
    console.log(`Question pressed: ${text}`);
  };

  if (role == "user" || type == "chat" || (!solutions && !questions)) {
    return (
      <View style={[styles.bubble, bubbleStyle]}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
    );
  } else {
    if (type == "solution") {
      return (
        <View style={[styles.bubble, bubbleStyle]}>
          <ChatPressable
            color="green"
            key="intro"
            onPress={() => handleSolutionPress(intro)  }
            text={intro}
          />
          {solutions &&
            solutions.map((solution, solutionIndex) => (
              <React.Fragment key={`solution-${solutionIndex}`}>
                <ChatPressable
                  color="blue"
                  key={`intro`}
                  onPress={() => handleSolutionPress(solution.intro)}
                  text={solution.intro}
                />
                {solution.steps.map((step, stepIndex) => (
                  <ChatPressable
                    color="red"
                    key={`step-${stepIndex}`}
                    onPress={() => handleSolutionPress(step)}
                    text={step}
                  />
                ))}
              </React.Fragment>
            ))}
        </View>
      );
    }
    if (type == "question") {
      return (
        <View style={[styles.bubble, bubbleStyle]}>
          <ChatPressable
            color="green"
            key="intro"
            onPress={handleQuestionPress}
            text={intro}
          />
          {questions &&
            questions.map((question, questionIndex) => (
              <React.Fragment key={`question-${questionIndex}`}>
                <ChatPressable
                  color="blue"
                  onPress={handleQuestionPress}
                  text={question}
                />
              </React.Fragment>
            ))}
        </View>
      );
    }
  }
};

const styles = StyleSheet.create({
  bubble: {
    borderRadius: 20,
    margin: 10,
    padding: 10,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "white",
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
  },
  userText: {
    color: "black",
  },
  botText: {
    color: "white",
  },
});

export default ChatBubble;
