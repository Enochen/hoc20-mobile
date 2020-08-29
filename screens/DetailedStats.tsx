import * as React from "react";
import { StyleSheet, Dimensions } from "react-native";

import { Text, View } from "../components/Themed";
import { RouteProp } from "@react-navigation/native";
import { HomeParamList } from "../types";
import { BarChart, Grid } from "react-native-svg-charts";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-elements";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";

export enum StatsType {
  Stress = "STRESS",
  Energy = "ENERGY",
  Mood = "MOOD",
}

export type DetailedStatsProps = {
  data: number[];
  type: StatsType;
  color: string;
};

export type StatsRouteProp = RouteProp<HomeParamList, "DetailedStats">;

type Props = {
  route: StatsRouteProp;
};

export default ({ route }: Props) => {
  const { data, type, color }: DetailedStatsProps = route.params;
  /* Specific day stats */
  function dayStats(data: number[]) {
    let table = [];
    for (var i = 0; i < data.length; i++) {
      table.push(<Text style={styles.subtitle}>day {i + 1}:  {data[i]}</Text>)
    }
    return table;
  }


  /* Average stats for overall analysis*/
  function avgStats(type: StatsType, data: number[]) {
    let avg = 0;
    let scale;
    if (type == "STRESS") {
      scale = ["relaxed", "stressed"];
    }
    else if (type == "ENERGY") {
      scale = ["tired", "energetic"];
    }
    else {
      scale = ["happy", "sad"];
    }

    for (var i = 0; i < data.length; i++) {
      avg += data[i];
    }

    avg = Math.floor(avg / data.length);
    let feeling = avg < 6 ? scale[0] : scale[1];

    return [<View style={{ flexDirection: 'row' }}>
      <Card containerStyle={{
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: "5%",
        width: "43%",
        alignSelf: 'center',
        shadowOpacity: 3,
        marginRight: "10.5%",
        marginLeft: "0.5%"
      }}>
        <Text style={styles.tinyheading}>you're</Text>
        <Text style={styles.heading}>{feeling}</Text>
      </Card>
      <Card containerStyle={{
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: "5%",
        width: "43%",
        alignSelf: 'center',
        shadowOpacity: 3,
        marginLeft: "3%",
        marginRight: "0.5%"
      }}>
        <Text style={styles.tinyheading}>{type} level</Text>
        <Text style={styles.heading}>{avg}</Text>
      </Card>
    </View>];
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detailed Stats for {type}</Text>
      <ScrollView>
        {/* Graph */}
        <Card
          containerStyle={{
            backgroundColor: "white",
            borderColor: color,
            borderWidth: 1,
            borderRadius: 10,
            alignContent: "center",
            marginTop: "5%",
            marginBottom: "7%"
          }}>
          <BarChart
            style={styles.graph}
            data={data}
            svg={{ fill: color }}
            contentInset={{ top: 30, bottom: 10 }}
            spacingInner={0.2}
          >
            <Grid />
          </BarChart>
          <Text style={styles.subtitle}>{type} levels</Text>
        </Card>
        {/* this week's analysis */}
        <Text style={styles.title}>this week</Text>
        <Card
          containerStyle={{
            backgroundColor: "white",
            borderColor: color,
            borderWidth: 1,
            borderRadius: 10,
            alignContent: "space-between",
            marginTop: "2%",
            width: "90%",
            alignSelf: "center",
            flexDirection: "row"
          }}>
          <Text style={styles.h2}>overall</Text>
          {avgStats(type, data)}

        </Card>
        <Card
          containerStyle={{
            backgroundColor: "white",
            borderColor: color,
            borderWidth: 1,
            borderRadius: 10,
            marginTop: "5%",
            width: "60%",
            alignSelf: 'center'
          }}>
          <Text style={styles.h2}>history</Text>
          <Text></Text>
          {dayStats(data)}
        </Card>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAE3FF"
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "4%",
    marginBottom: "4%"
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "200",
    textAlign: "center"
  },
  heading: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center"
  },
  h2: {
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center"
  },
  subheading: {
    fontSize: 15,
    fontWeight: "400",
    textAlign: "center"
  },
  tinyheading: {
    fontSize: 13,
    fontWeight: "300",
    textAlign: "center"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  graph: {
    height: 300,
    width: 300,
    marginBottom: "10%",
    backgroundColor: "white",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

});
