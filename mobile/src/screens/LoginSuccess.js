// Login successful screen
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import ProfileButton from '../components/profileButton';
import Leaderboard from '../components/leaderBoard';

const LoginSuccess = ({ route, navigation }) => {
    const { data } = route.params;

  return (
      <View style={styles.container}>
        <ProfileButton navigation={navigation}/>
        <Text style={styles.text}>Login Successful!</Text>
        <Text>{JSON.stringify(data)}</Text>
        <Text>{data.leetCodeUsername}</Text>
        <Leaderboard /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3c4749', // or any color you like
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});



export default LoginSuccess;
