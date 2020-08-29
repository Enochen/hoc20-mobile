import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Home from '../screens/Home';
import Mood from '../screens/Mood';
import Chat from '../screens/Chat';
import { BottomTabParamList, HomeParamList, ChatParamList, MoodParamList } from '../types';
import DetailedStats, { StatsType } from '../screens/DetailedStats';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={ChatNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="chat-bubble-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Mood"
        component={MoodNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person-outline" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: 'Home' }}
      />
      <HomeStack.Screen
        name="DetailedStats"
        component={DetailedStats}
        initialParams={{ type: StatsType.Stress, data: [] }}
        options={{ headerTitle: 'Stats' }}
      />
    </HomeStack.Navigator>
  );
}

const ChatStack = createStackNavigator<ChatParamList>();

function ChatNavigator() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="Chat"
        component={Chat}
        options={{ headerTitle: 'Chat' }}
      />
    </ChatStack.Navigator>
  );
}

const MoodStack = createStackNavigator<MoodParamList>();

function MoodNavigator() {
  return (
    <MoodStack.Navigator>
      <MoodStack.Screen
        name="Mood"
        component={Mood}
        options={{ headerTitle: 'Mood' }}
      />
    </MoodStack.Navigator>
  );
}


