import { StyleSheet, Text, View, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import axios from 'axios'
import TypingIndicator from "react-native-gifted-chat/lib/TypingIndicator"


const Chatbot = () => {
  const [messages, setMessages] = useState([])

  const YOUR_CHATGPT_API_KEY = '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'

  const handleSend = async (newMessages = []) => {
    // <TypingIndicator
    //   isTyping={true}
    // />

    // <ActivityIndicator />

    try {
      <TypingIndicator
        isTyping={true}
      />



      // Get the users message
      const userMessage = newMessages[0];

      // Add the user's message to the message state
      setMessages(previousMessages => GiftedChat.append(previousMessages, userMessage));
      const messageText = userMessage.text.toLowerCase();
      const keywords = [
        'crime',
        'law',
        'regulataions',
        'articles',
        'citizen',
        'theft',
        'layer',
        'court',
        'attorney',
        'legal',
        'litigation',
        'solicitor',
        'prosecutor',
        'statutory',
        'common law',
        'barrister',
        'counsel',
        'law school',
        'family law',
        'lawsuit',
        'civil law',
        'civil case',
        'criminal law',
        'criminal case',
        'international law',
        'Bankruptcy',
      ];// add more keywords as needed

      if (!keywords.some(keyword => messageText.includes(keyword))) {
        // if the message does not contain any food-related keywords, respond with a default message
        const botMessage = {
          _id: new Date().getTime + 1,
          text: "I'm your law bot, ask me anything realted to law",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Law Bot'
          }
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
        return;
      }
      // ToastAndroid.show("Response coming in 5 sec", ToastAndroid.SHORT)
      // ToastAndroid.show("Response coming in 3 sec", ToastAndroid.SHORT)
      ToastAndroid.show("bot is Typing", ToastAndroid.SHORT)
      // ToastAndroid.show("Response coming in 1 sec", ToastAndroid.SHORT)
      //if the message contains food-related keywords, fetch a botresponse from the API and respond with it

      const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        prompt: `Get me information about ${messageText}`,
        max_tokens: 1200,
        temperature: 0.2,
        n: 1,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${YOUR_CHATGPT_API_KEY}`
        }
      });
      // console.log(response.data);


      const botresponse = response.data.choices[0].text.trim();
      ToastAndroid.show("Response opening", ToastAndroid.SHORT)
      const botMessage = {
        _id: new Date().getTime() + 1,
        // text: "looking for best response",
        text: botresponse,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Law Bot'
        }
      };
      setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: '#F5F5F5',
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
          borderBottomWidth: 1,
          marginBottom: 5
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
          }}
        >
          Juristo
        </Text>
      </View>
      {/* <TypingIndicator
        isTyping={false}
      /> */}
      <GiftedChat
        messages={messages}
        onSend={newMessages => handleSend(newMessages)}
        user={{ _id: 1 }}
      />
    </View>
  )
}

export default Chatbot

const styles = StyleSheet.create({})