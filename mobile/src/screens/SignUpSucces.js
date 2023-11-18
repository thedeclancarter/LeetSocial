// SignUpSuccess.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const SignUpSucces = ({ route, navigation }) => {
  const { data } = route.params;
  const handleLogout = () => {
    // Perform logout logic, like clearing user data, tokens, etc.
    navigation.navigate('Login'); // Navigate back to the login screen
  };

  return (
      <View style={styles.container}>
        <Header />
        <Text style={styles.text}>Sign Up Success!</Text>
        <Text>{JSON.stringify(data)}</Text>
        <Button title="Logout" onPress={handleLogout} />
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

const Header = () => {
    return (
        <View style={styles.header}>
            <Text>Welcome!</Text>
        </View>
    );
};


export default SignUpSucces;
