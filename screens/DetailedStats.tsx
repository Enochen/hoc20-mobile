import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { RouteProp } from "@react-navigation/native";
import { HomeParamList } from "../types";

export enum StatsType {
  Stress = "STRESS",
  Energy = "ENERGY",
  Mood = "MOOD",
}

export type DetailedStatsProps = {
  data: number[];
  type: StatsType;
};

export type StatsRouteProp = RouteProp<HomeParamList, "DetailedStats">;

type Props = {
  route: StatsRouteProp;
};

export default ({ route }: Props) => {
  const { data, type }: DetailedStatsProps = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detailed Stats for {type}</Text>
      <Text style={styles.container}>Here's the data in text form: {data.toString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
