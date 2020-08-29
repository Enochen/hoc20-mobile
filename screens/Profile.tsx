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
        <Text style={{
          fontSize: 30,
          fontWeight: "bold",
          marginLeft: "5%",
          marginBottom: '5%'
        }}>Profile</Text>
        <View
          style={{
            marginLeft: "2%",
            marginRight: '2%',
            width: '95%',
            backgroundColor: '#C4FAF8',
            justifyContent: 'center',
            alignSelf: 'center',
            height: '35%',
            flexDirection: "row",
            borderRadius: 10,
          }}
        >
          <Image
            source={require("../assets/images/sample.png")}
            style={{
              width: 150,
              height: 150,
              borderRadius: 400 / 2,
              backgroundColor: "white",
              borderColor: "white",
              marginLeft: '3%',
              marginTop: '3%'
            }}
          />

          <View style={{ flex: 1, flexDirection: "column", borderRadius: 10, backgroundColor: '#C4FAF8' }}>
            <Text
              style={{ fontSize: 30, fontWeight: "bold", marginLeft: "10%", marginTop: '10%', color: 'black' }}
            >
              Enoch Chen
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: "10%",
                marginTop: "5%",
                color: 'black'
              }}
            >
              enochen.me
            </Text>
          </View>
        </View>


        <Text
          style={styles.title}
        >
          Past Moods
          </Text>

        <Card
          containerStyle={{
            backgroundColor: "#FAE3FF",
            borderColor: "#FAE3FF",
            borderRadius: 10,
            alignContent: "center",
            marginTop: "5%",
            height: "35%",
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
    marginTop: '2%'
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  otherTitle: {
    fontSize: 15,
    color: "black",
  },
});
