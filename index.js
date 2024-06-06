/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import MainDrawer from './src/components/Drawer';
import LoginForm from './src/screens/Auth/Login';
const Stack = createNativeStackNavigator();
AppRegistry.registerComponent(appName, () => () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Home" component={MainDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
});
