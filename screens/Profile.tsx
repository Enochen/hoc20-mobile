import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';
import { Button } from 'react-native-elements';

export default function Profile() {
  return (

    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View></View>

      <View style={{ marginTop: '8%', marginLeft: '2%', flex: 1, flexDirection: 'row' }}>
        <Image
          source={require('../assets/images/sample.png')}
          style={{ width: 150, height: 150, borderRadius: 400 / 2, backgroundColor: 'white', borderColor: 'white' }}
        />

        <View style={{ flex: 1, flexDirection: 'column' }}>

          <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: '10%' }}>
            Enoch Chen
          </Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: '10%', marginTop: '5%' }}>
            enochen.me
          </Text>
        </View>
      </View>

      <View style={{ bottom: '30%' }}>
        <Text style={{
          fontSize: 30,
          fontWeight: 'bold',
          marginLeft: '5%',
        }}>
          Filler Text
        </Text>

        <Card containerStyle={{ backgroundColor: '#FAE3FF', borderColor: '#FAE3FF', borderRadius: 10, alignContent: 'center', marginTop: '5%' }}>
          <Text style={{ color: 'black', marginTop: '2%', fontSize: 20, fontWeight: 'bold' }}>How do you feel today?</Text>

          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#BFFCC6', justifyContent: 'space-between', marginBottom: '5%' }} >
            <Text style={{ color: 'black', alignItems: 'flex-start', justifyContent: 'flex-start' }}>sad</Text>
            <Text style={{ color: 'black', alignItems: 'flex-end', justifyContent: 'flex-end' }}>happy</Text>
          </View>
        </Card>

      </View>
      <Button
        title="Sign Out"
        style={{ marginBottom: '10%', width: '90%', justifyContent: 'center', alignSelf: 'center', borderRadius: 10 }}
      />




    </View>

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
