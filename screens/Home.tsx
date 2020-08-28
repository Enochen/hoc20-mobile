import * as React from 'react';
import { StyleSheet, ScrollView, TextInput } from 'react-native';
import {
  LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart
} from "react-native-chart-kit";
import { useState, useEffect } from "react";
import { Text, View } from '../components/Themed';
import Slider from '@react-native-community/slider';
import { Card } from 'react-native-elements';
import { Dimensions } from "react-native";
import { HeaderBackground } from '@react-navigation/stack';

export default function Home() {

  const [stress, setStress] = useState(5)
  const [energy, setEnergy] = useState(5)
  const [emotion, setEmotion] = useState(5)

  const screenWidth = Dimensions.get("window").width;

  //sample bar graph data
  const data = {
    labels: ['Aug 1', 'Aug 2', 'Aug 3', 'Aug 4', 'Aug 5', 'Aug 6', 'Aug 7', 'Aug 8',],
    datasets: [{
      data: [2, 5, 10, 3, 1, 4, 7, 8]
    }]
  }

  return (
    //What is rendered
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Hi Tony!  👋</Text>

        {/* Green Card  w/ Sliders   */}
        <Card containerStyle={{ backgroundColor: '#BFFCC6', borderColor: '#BFFCC6', borderRadius: 10, alignContent: 'center', marginTop: '10%' }}>
          <Text style={{ color: 'black', marginTop: '2%', fontSize: 20, fontWeight: 'bold' }}>How do you feel today?</Text>
          <Slider
            style={{ width: '95%', height: 40, marginTop: '5%', alignSelf: 'center' }}
            value={stress}
            onValueChange={setStress}
            minimumValue={0}
            maximumValue={10}
            step={1}
            minimumTrackTintColor="#000"
            maximumTrackTintColor="#000"
          />
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#BFFCC6', justifyContent: 'space-between' }} >
            <Text style={{ color: 'black', alignItems: 'flex-start', justifyContent: 'flex-start' }}>relaxed</Text>
            <Text style={{ color: 'black', alignItems: 'flex-end', justifyContent: 'flex-end' }}>stressed</Text>
          </View>

          <Slider
            style={{ width: '95%', height: 40, marginTop: '5%', alignSelf: 'center' }}
            value={energy}
            onValueChange={setEnergy}
            minimumValue={0}
            maximumValue={10}
            step={1}
            minimumTrackTintColor="#000"
            maximumTrackTintColor="#000"
          />
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#BFFCC6', justifyContent: 'space-between' }} >
            <Text style={{ color: 'black', alignItems: 'flex-start', justifyContent: 'flex-start' }}>tired</Text>
            <Text style={{ color: 'black', alignItems: 'flex-end', justifyContent: 'flex-end' }}>energetic</Text>
          </View>

          <Slider
            style={{ width: '95%', height: 40, marginTop: '5%', alignSelf: 'center' }}
            value={emotion}
            onValueChange={setEmotion}
            minimumValue={0}
            maximumValue={10}
            step={1}
            minimumTrackTintColor="#000"
            maximumTrackTintColor="#000"
          />
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#BFFCC6', justifyContent: 'space-between', marginBottom: '5%' }} >
            <Text style={{ color: 'black', alignItems: 'flex-start', justifyContent: 'flex-start' }}>sad</Text>
            <Text style={{ color: 'black', alignItems: 'flex-end', justifyContent: 'flex-end' }}>happy</Text>
          </View>
        </Card>


        {/* Pink Card  w/ Graphs */}
        <Card containerStyle={{ backgroundColor: '#FAE3FF', borderColor: '#FAE3FF', borderRadius: 10, alignContent: 'center', marginTop: '10%' }}>
          <Text style={{ color: 'black', marginTop: '2%', fontSize: 20, fontWeight: 'bold' }}>Trends</Text>

          <BarChart
            style={{
              marginVertical: 10,
              borderRadius: 16,
              marginTop: '5%',
            }}
            data={data}
            width={screenWidth}
            height={220}
            withHorizontalLabels={false}
            fromZero={true}
            showBarTops={false}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              barRadius: 5,
              barPercentage: .7,
              fillShadowGradient: "#555",
              fillShadowGradientOpacity: 1,
              strokeWidth: 20,
            }}
          />

        </Card>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '3%',
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: '5%'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
