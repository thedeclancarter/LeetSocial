// Login successful screen
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProfileButton from '../components/profileButton';
import Leaderboard from '../components/leaderBoard';
import GradientBackground from '../components/gradientBackground';
import GridBackground from '../components/gridBackground';
import HeaderLogo from '../components/header';

const LoginSuccess = ({ route, navigation }) => {
  const { userData } = route.params;
  const id = userData.userId;
  const handleLogout = () =>{
    const remove = require('../functions/storage');
    remove.removeToken();
    navigation.navigate('Login');
  }


  return (
    <GradientBackground>
      <View style={styles.container}>
        <GridBackground />
        <HeaderLogo />
        <TouchableOpacity onPress={handleLogout} style={styles.button}><Text style={styles.buttonText}>Logout</Text></TouchableOpacity>
        <ProfileButton navigation={navigation} route={{ params: { id } }} />
        <Text style={styles.text}>Welcome {userData.firstName} {userData.lastName}!</Text>
        <Text style={styles.text}>{JSON.stringify(userData)}</Text>
        <Leaderboard /> 
    </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  button: {
    paddingHorizontal: 20,
    backgroundColor: 'rgba(176, 108, 39, 1)',
    borderRadius: 5,
    color: 'white',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  }
});



export default LoginSuccess;
