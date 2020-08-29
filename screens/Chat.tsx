import * as React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { GiftedChat } from "react-native-gifted-chat";
import { Dialogflow_V2 } from "react-native-dialogflow";
import { dialogflowConfig } from "../env";
import { useState, useEffect } from "react";

type User = {
  _id: number;
  name: string;
  avatar: string;
};

type Message = {
  _id: number;
  text: string;
  createdAt: Date;
  user: User;
};

const BOT_USER: User = {
  _id: 2,
  name: "Health Bot",
  avatar: "https://i.imgur.com/dv3lHZT.png",
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      _id: 1,
      text: "Hi! I am the Moody 🤖.\n\nWhat is your mood today?",
      createdAt: new Date(),
      user: BOT_USER,
    },
  ]);

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
  };

  const onSend = (messages: Message[] = []) => {
    setMessages((prev) => GiftedChat.append(prev, messages));
    Dialogflow_V2.requestQuery(
      messages[0].text,
      (result) => handleGoogleResponse(result),
      (error) => console.log(error)
    );
  };

  const isURL = (input: string) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return pattern.test(input);
  };

  const sendBotResponse = (input: string) => {
    const data = isURL(input) ? { image: input } : { text: input };
    const msg = {
      ...data,
      _id: messages.length + 1,
      createdAt: new Date(),
      user: BOT_USER,
    };

    setMessages((prev) => GiftedChat.append(prev, [msg]));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.image}
      >
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            _id: 1,
          }}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
