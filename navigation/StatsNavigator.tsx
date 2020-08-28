import { createStackNavigator } from "@react-navigation/stack";
import { HomeParamList } from "../types";
import Home from "../screens/Home";

const HomeStack = createStackNavigator<HomeParamList>();

export default function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: 'Home' }}
      />
    </HomeStack.Navigator>
  );
}