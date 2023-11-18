// Login successful screen
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import ProfileButton from '../components/profilebutton';

const LoginSuccess = ({ route, navigation }) => {
    const { data } = route.params;

  return (
      <View style={styles.container}>
        <ProfileButton navigation={navigation}/>
        <Text style={styles.text}>Login Successful!</Text>
        <Text>{JSON.stringify(data)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // or any color you like
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});



export default LoginSuccess;
