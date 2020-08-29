import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { RouteProp } from "@react-navigation/native";
import { HomeParamList } from "../types";
import { BarChart, Grid } from "react-native-svg-charts";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-elements";

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
      <ScrollView horizontal={true}>
        <BarChart
          style={styles.graph}
          data={data}
          svg={{ fill: "rgb(175, 248, 219)" }}
          contentInset={{ top: 30, bottom: 10 }}
          spacingInner={0.2}
        >
          <Grid />
        </BarChart>
      </ScrollView>
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
  graph: {
    height: 200,
    marginBottom: "3%",
    backgroundColor: "white",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
