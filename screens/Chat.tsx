import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from '../env';
import { useState, useEffect } from 'react';

type User = {
  _id: number,
  name: string,
  avatar: string
}

type Message = {
  _id: number,
  text: string,
  createdAt: Date,
  user: User
}

const BOT_USER: User = {
  _id: 2,
  name: 'Health Bot',
  avatar: 'https://previews.123rf.com/images/iulika1/iulika11909/iulika1190900021/129697389-medical-worker-health-professional-avatar-medical-staff-doctor-icon-isolated-on-white-background-vec.jpg'
};

export default function Chat() {

  const [messages, setMessages] = useState<Message[]>([{
    _id: 1,
    text: 'Hi! I am the Moody 🤖.\n\nHow may I help you today?',
    createdAt: new Date(),
    user: BOT_USER
  }]);

  useEffect(() => {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }, []);

  const handleGoogleResponse = (result: any) => {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    sendBotResponse(text);
  }

  const onSend = (messages: Message[] = []) => {
    setMessages(prev => GiftedChat.append(prev, messages))
    Dialogflow_V2.requestQuery(
      messages[0].text,
      result => handleGoogleResponse(result),
      error => console.log(error)
    );
  }

  const sendBotResponse = (text: string) => {
    const msg = {
      _id: messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER
    };

    setMessages(prev => GiftedChat.append(prev, [msg]))
  }


  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1
        }}
      />
      {
        Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
