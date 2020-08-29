import * as React from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Text, View } from "../components/Themed";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";
import { AuthContext } from "../navigation";
import { useState } from "react";

import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";

type Item = {
  id: string;
  title: string;
};
export default () => {
  const { signOut } = React.useContext(AuthContext);

  const [notes, setNotes] = useState<string[]>([]);

  const navigation = useNavigation();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const notesString = await AsyncStorage.getItem("notes");
      setNotes(notesString ? JSON.parse(notesString) : []);
    });

    return unsubscribe;
  }, [navigation]);

  const DATA = notes.map((text, i) => {
    return {
      id: i.toString(),
      title: text,
    };
  });

  const [selectedId, setSelectedId] = useState("");

  const renderItem = ({ item }: { item: Item }) => {
    const backgroundColor = item.id === selectedId ? "#FFF" : "#FFF";

    return (
      <TouchableOpacity
        onPress={() => setSelectedId(item.id)}
        style={[styles.item, { backgroundColor, borderRadius: 15 }]}
      >
        <Text style={styles.otherTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (

    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.image}
      >
        <Text style={styles.title}> Past Moods </Text>
        <Card
          containerStyle={{
            backgroundColor: "#FAE3FF",
            borderColor: "#FAE3FF",
            borderRadius: 10,
            alignContent: "center",
            marginTop: "5%",
            height: "75%",
          }}
        >
          <ScrollView>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
            />
          </ScrollView>
        </Card>

        <Button
          title="Sign Out"
          style={{
            marginTop: '5%',
            marginBottom: "5%",
            width: "90%",
            justifyContent: "center",
            alignSelf: "center",
            borderRadius: 10,
          }}
          onPress={signOut}
        />
      </ImageBackground>
    </View>

  );
};

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
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: "5%",
    marginTop: '2%',
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  otherTitle: {
    marginLeft: '5%',
    fontSize: 20,
    color: "black",
  },
});
