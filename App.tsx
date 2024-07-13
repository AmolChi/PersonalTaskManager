import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { persister, store } from './context/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useAppSelector } from './hooks/reduxHooks';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import LandingPage from './screens/public/LandingPage';
import Login from './screens/public/Login';
import Register from './screens/public/Register';
import HomePage from './screens/auth/HomePage';
import Calender from './screens/auth/Calendar';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function InitialLayout(){


  const activeUser = useAppSelector(state => state.reducer.activeUser)

  return(
    <NavigationContainer>
      {
        activeUser === null?
        <Stack.Navigator>
          <Stack.Screen name='LandingPage' component={LandingPage}/>
          <Stack.Screen name='Login' component={Login}/>
          <Stack.Screen name='Register' component={Register}/>
        </Stack.Navigator>
        :
        <Tab.Navigator>
          <Tab.Screen name='Home' component={HomePage}/>
          <Tab.Screen name='Calendar' component={Calender}/>
        </Tab.Navigator>
      }
    </NavigationContainer>
  )
}

export default function App() {  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <StatusBar style='light'/>
        <InitialLayout/>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
