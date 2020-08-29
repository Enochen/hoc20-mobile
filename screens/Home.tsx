import * as React from "react";
import {
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground
} from "react-native";
/* import {
  LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart
} from "react-native-chart-kit"; */
import { useState, useEffect } from "react";
import { Text, View } from "../components/Themed";
import Slider from "@react-native-community/slider";
import { Card } from "react-native-elements";
import { Dimensions } from "react-native";
import { HeaderBackground } from "@react-navigation/stack";
import { BarChart, Grid } from "react-native-svg-charts";
import navigation from "../navigation";
import { useNavigation } from "@react-navigation/native";
import { HomeParamList } from "../types";
import { StatsType } from "./DetailedStats";
import { Button } from 'react-native-elements';
import AsyncStorage from "@react-native-community/async-storage";


export default function Home() {
  const [stress, setStress] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [mood, setMood] = useState(5);
  const [text, setText] = useState("");
  const [info, setInfo] = useState<string[]>([]);

  const screenWidth = Dimensions.get("window").width;

  //sample bar graph data
  const dataStress = [10, 5, 25, 15, 20, 30];
  const dataEnergy = [1, 5, 2, 30, 20, 15];
  const dataMood = [3, 5, 24, 13, 10, 14];

  const navigation = useNavigation();

  const onSubmit = () => {
    setText("");
    AsyncStorage.getItem("notes").then(prev => {
      const notes = prev ? JSON.parse(prev) : [];
      AsyncStorage.setItem('notes', JSON.stringify([...notes, text]));
    })
    Alert.alert(
      "Mood Recorded",
      "Thanks for recording your mood today! You can view your past moods on your profile.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  }

  return (
    //What is rendered
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground source={require('../assets/images/background.png')} style={styles.image}>
          <Text style={styles.title}>Hi Tony! 👋</Text>

          {/* Green Card  w/ Sliders   */}
          <Card
            containerStyle={{
              backgroundColor: "#C4FAF8",
              borderColor: "#C4FAF8",
              borderRadius: 10,
              alignContent: "center",
              marginTop: "10%",
            }}
          >
            <Text
              style={{
                color: "black",
                marginTop: "2%",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              How do you feel today?
          </Text>
            <Slider
              style={{
                width: "95%",
                height: 40,
                marginTop: "5%",
                alignSelf: "center",
              }}
              value={stress}
              onValueChange={setStress}
              minimumValue={0}
              maximumValue={10}
              step={1}
              minimumTrackTintColor="#000"
              maximumTrackTintColor="#000"
            />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "#C4FAF8",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "black",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                relaxed
            </Text>
              <Text
                style={{
                  color: "black",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                stressed
            </Text>
            </View>

            <Slider
              style={{
                width: "95%",
                height: 40,
                marginTop: "5%",
                alignSelf: "center",
              }}
              value={energy}
              onValueChange={setEnergy}
              minimumValue={0}
              maximumValue={10}
              step={1}
              minimumTrackTintColor="#000"
              maximumTrackTintColor="#000"
            />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "#C4FAF8",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "black",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                tired
            </Text>
              <Text
                style={{
                  color: "black",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                energetic
            </Text>
            </View>

            <Slider
              style={{
                width: "95%",
                height: 40,
                marginTop: "5%",
                alignSelf: "center",
              }}
              value={mood}
              onValueChange={setMood}
              minimumValue={0}
              maximumValue={10}
              step={1}
              minimumTrackTintColor="#000"
              maximumTrackTintColor="#000"
            />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "#C4FAF8",
                justifyContent: "space-between",
                marginBottom: "5%",
              }}
            >
              <Text
                style={{
                  color: "black",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                sad
            </Text>
              <Text
                style={{
                  color: "black",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                happy
            </Text>
            </View>

            <TextInput
              style={{
                height: 125,
                borderColor: "white",
                backgroundColor: "white",
                borderWidth: 2,
                marginTop: "4%",
                marginBottom: "5%",
                fontSize: 15,
                color: "black",
                borderRadius: 10,
                shadowRadius: 10,
                shadowOpacity: 0.5,
              }}
              onChangeText={(text) => setText(text)}
              value={text}
              multiline={true}
            />

            <Button
              title="Submit"
              style={{ marginBottom: '2%', width: '90%', justifyContent: 'center', alignSelf: 'center', borderRadius: 20, }}
              onPress={() => onSubmit(text)}
            />
          </Card>

          {/* Pink Card  w/ Graphs */}
          <Card
            containerStyle={{
              backgroundColor: "#FAE3FF",
              borderColor: "#C4FAF8",
              borderRadius: 10,
              alignContent: "center",
              marginTop: "10%",
              marginBottom: "10%",
            }}
          >
            <Text
              style={{
                color: "black",
                marginTop: "2%",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Trends
          </Text>

            <Text style={styles.graphText}>Stress</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DetailedStats", {
                  type: StatsType.Stress,
                  data: dataStress,
                })
              }
            >
              <BarChart
                style={styles.graph}
                data={dataStress}
                svg={{ fill: "rgb(255, 171, 171)" }}
                contentInset={{ top: 30, bottom: 30 }}
                spacingInner={0.2}
              >
                <Grid />
              </BarChart>
            </TouchableOpacity>

            <Text style={styles.graphText}>Energy</Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DetailedStats", {
                  type: StatsType.Energy,
                  data: dataEnergy,
                })
              }
            >
              <BarChart
                style={styles.graph}
                data={dataEnergy}
                svg={{ fill: "rgb(175, 248, 219)" }}
                contentInset={{ top: 30, bottom: 10 }}
                spacingInner={0.2}
              >
                <Grid />
              </BarChart>
            </TouchableOpacity>

            <Text style={styles.graphText}>Mood</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DetailedStats", {
                  type: StatsType.Mood,
                  data: dataMood,
                })
              }
            >
              <BarChart
                style={styles.graph}
                data={dataMood}
                svg={{ fill: "rgb(0, 65, 244)" }}
                contentInset={{ top: 30, bottom: 20 }}
                spacingInner={0.2}
              >
                <Grid />
              </BarChart>
            </TouchableOpacity>
          </Card>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "3%",
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  graphText: {
    color: "black",
    marginTop: "5%",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: "3%",
  },
  graph: {
    height: 200,
    marginBottom: "3%",
    backgroundColor: "white",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: "5%",
    marginTop: '3%'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});





