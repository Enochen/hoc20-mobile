import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import Login from "../screens/Login";
import AsyncStorage from "@react-native-community/async-storage";
import { useEffect } from "react";

type State = {
  userToken?: string;
};

type Action = { type: "SIGN_IN"; userToken: string } | { type: "SIGN_OUT" };

type Context = {
  signIn: (userToken: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const initContext: Context = {
  signIn: async () => {},
  signOut: async () => {},
};

export const AuthContext = React.createContext(initContext);

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "SIGN_IN":
        return { ...state, userToken: action.userToken };
      case "SIGN_OUT":
        return { ...state, userToken: undefined };
    }
  };

  const [state, dispatch] = React.useReducer(reducer, {});

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        if (userToken !== null) {
          dispatch({ type: "SIGN_IN", userToken });
        }
      } catch (e) {}
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (userToken: string) => {
        await AsyncStorage.setItem("userToken", userToken);
        dispatch({ type: "SIGN_IN", userToken });
      },
      signOut: async () => {
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("notes");
        dispatch({ type: "SIGN_OUT" });
      },
    }),
    []
  );


  const navigator = state.userToken ? <RootNavigator /> : <AuthNavigator />;

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        {navigator}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
type AppStackParamList = { Root: undefined; NotFound: undefined };
type AuthStackParamList = { Login: undefined };

const AppStack = createStackNavigator<AppStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();

function RootNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Root" component={BottomTabNavigator} />
      <AppStack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </AppStack.Navigator>
  );
}

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  );
}
/* <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator >
  );
}
<AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator >
  );
} */
