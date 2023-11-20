import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import LoginSuccess from './src/screens/LoginSuccess';
import VerifyPage from './src/screens/Verify';
import Profile from './src/screens/Profile';
import TestPage from './src/screens/Testing';

const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {/* <Stack.Screen name="Test" component={TestPage} options={{headerShown: false}}/> */}
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="VerifyPage" component={VerifyPage} />
        <Stack.Screen name="LoginSuccess" component={LoginSuccess} options={{headerShown: false}}/>
        <Stack.Screen 
          name="Profile" 
          component={Profile} 
          options={{ headerShown: false }} // Hide the header for Profile screen
        />
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
