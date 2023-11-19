// Login successful screen
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProfileButton from '../components/profileButton';
import Leaderboard from '../components/leaderBoard';

const LoginSuccess = ({ route, navigation }) => {
  const { userData } = route.params;

  const handleLogout = () =>{
    const remove = require('../functions/storage');
    remove.removeToken();
    navigation.navigate('Login');
  }


  return (
      <View style={styles.container}>
        <TouchableOpacity onPress={handleLogout}><Text>Logout</Text></TouchableOpacity>
        <ProfileButton navigation={navigation} route={{ params: { userData } }} />
        <Text style={styles.text}>Welcome {userData.firstName} {userData.lastName}!</Text>
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
