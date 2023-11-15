import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Button, Text, View, StatusBar} from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import HomePage from './src/screens/HomePage';
import LoginSuccess from './src/screens/LoginSuccess';


const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="LoginSuccess" component={LoginSuccess} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export const navigationRef = React.createRef();

export function navigate(name, params) {
  if (navigationRef.current) {
    navigationRef.current.navigate(name, params);
  }
}

export default App;
