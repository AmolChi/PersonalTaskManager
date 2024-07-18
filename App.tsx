import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { persister, store } from "./context/store";
import { PersistGate } from "redux-persist/integration/react";
import { useAppSelector } from "./hooks/reduxHooks";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import LandingPage from "./screens/public/LandingPage";
import Login from "./screens/public/Login";
import Register from "./screens/public/Register";
import HomePage from "./screens/auth/HomePage";
import Calender from "./screens/auth/Calendar";
import { toastConfig } from "./helper/toastConfigs";
import Toast from "react-native-toast-message";
import { TabBarIcon } from "./components/TabBarIcon";
import CreateTask from "./screens/auth/CreateTask";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function InitialLayout() {
  const activeUser = useAppSelector((state) => state.reducer.activeUser);

  return (
    <NavigationContainer>
      {activeUser === null ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="LandingPage" component={LandingPage} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          activeColor="#ffffff"
          inactiveColor="#ffffff"
          barStyle={{ backgroundColor: '#4535C1' }}
          activeIndicatorStyle={{ backgroundColor: '#4535C1' }}
          shifting={true}
          initialRouteName="Home"
        >
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Calendar"
            component={Calender}

            options={{
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  color={color}
                  name={focused ? "calendar" : "calendar-clear-outline"}
                />
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

const HomeStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerTitleAlign: 'center',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#4535C1'
      }
    }}>
      <Stack.Screen name="home" component={HomePage} options={{ headerShown: false }} />
      <Stack.Screen name="New Task" component={CreateTask} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <GestureHandlerRootView>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <StatusBar style="auto" />
          <InitialLayout />
          <Toast config={toastConfig} />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F9F2",
  },
});
