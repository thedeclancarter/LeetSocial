// Login successful screen
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfileButton from '../components/profileButton';
import Leaderboard from '../components/leaderBoard';

const LoginSuccess = ({ route, navigation }) => {
  const { userData } = route.params;
  console.log(userData);


  return (
      <View style={styles.container}>
        <ProfileButton navigation={navigation}/>
        <Text style={styles.text}>Hello {userData.firstName}</Text>
        <Text>{JSON.stringify(userData)}</Text>
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
