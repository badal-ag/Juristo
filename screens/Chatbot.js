import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

const Chatbot = () => {
  const [data, setData] = useState([
    { type: "bot", text: "Hello! I'm a chatbot. Ask me anything and I'll try to help you out." },
  ]);
  
  const apiKey = "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";
  const apiUrl =
    "https://api.openai.com/v1/engines/text-davinci-003/completions";
  const [textInput, setTextInput] = useState("");

  const handleSend = async () => {
    const prompt = textInput;
    const response = await axios.post(
      apiUrl,
      {
        prompt: prompt,
        max_tokens: 1024,
        temperature: 0.5,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const text = response.data.choices[0].text;
    setData([
      ...data,
      { type: "user", text: textInput },
      { type: "bot", text: text },
    ]);
    setTextInput("");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#34D6CA" }}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.body}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              justifyContent: item.type === "user" ? "flex-start" : "flex-end",
            }}
          >
            <View
              style={[
                styles.chatBox,
                {
                  backgroundColor: item.type === "user" ? "#fff" : "#f0f0f0",
                  borderTopLeftRadius: item.type === "user" ? 20 : 0,
                  borderTopRightRadius: item.type === "user" ? 0 : 20,
                  marginLeft: item.type === "user" ? 0 : 50,
                  marginRight: item.type === "user" ? 50 : 0,
                },
              ]}
            >
              <Text
                style={{
                  color: item.type === "user" ? "green" : "red",
                  fontSize: 16,
                  padding: 10,
                  alignSelf: "flex-start",
                }}
              >
                {item.text}
              </Text>
            </View>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={textInput}
          onChangeText={(text) => setTextInput(text)}
          placeholder="Ask Me Anything"
        />
        <TouchableOpacity onPress={handleSend}>
          <AntDesign name="rightcircle" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Chatbot;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#34D6CA",
    width: "102%",
  },
  chatBox: {
    maxWidth: "80%",
    borderRadius: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#fff",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginRight: 10,
    marginLeft: 10,
  },
});
