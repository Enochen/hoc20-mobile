import * as React from "react";
import { StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";
import { AuthContext } from "../navigation";
import { useState } from "react";
import {
  RouteProp,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { BottomTabParamList } from "../types";
import AsyncStorage from "@react-native-community/async-storage";

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

  // useFocusEffect(() => {
  //   React.useCallback(async () => {
  //     return () => {}
  //   }, [])
  // })
  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Do something when the screen is focused
  //     setNotes(["HI"]);
  //     return () => {
  //       // Do something when the screen is unfocused
  //       // Useful for cleanup functions
  //     };
  //   }, [])
  // );

  const DATA = notes.map((text) => {
    return {
      id: Math.random().toString(),
      title: text,
    };
  });
  // [
  //   {
  //     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
  //     title: "First Item",
  //   },
  //   {
  //     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
  //     title: "Second Item",
  //   },
  //   {
  //     id: "58694a0f-3da1-471f-bd96-145571e29d72",
  //     title: "Third Item",
  //   },
  //   {
  //     id: "58694a0f-3da1-471f-bd96-145571e29d72",
  //     title: "Third Item",
  //   },
  //   {
  //     id: "58694a0f-3da1-471f-bd96-145571e29d72",
  //     title: "Third Item",
  //   },
  // ];

  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.otherTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const [selectedId, setSelectedId] = useState("");

  const renderItem = ({ item }: {item: Item}) => {
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
      <Text style={styles.title}>Profile</Text>

      <View></View>

      <View
        style={{
          marginTop: "8%",
          marginLeft: "2%",
          flex: 1,
          flexDirection: "row",
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
          }}
        />

        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={{ fontSize: 30, fontWeight: "bold", marginLeft: "10%" }}>
            Enoch Chen
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: "10%",
              marginTop: "5%",
            }}
          >
            enochen.me
          </Text>
        </View>
      </View>

      <View style={{ marginTop: "7%", top: "12.5%" }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginLeft: "5%",
          }}
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
            height: "65%",
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
      </View>
      <Button
        title="Sign Out"
        style={{
          marginBottom: "5%",
          width: "90%",
          justifyContent: "center",
          alignSelf: "center",
          borderRadius: 10,
        }}
        onPress={signOut}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "3%",
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: "5%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  otherTitle: {
    fontSize: 20,
    color: "black",
  },
});
