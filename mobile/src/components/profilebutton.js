// ProfileButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


const ProfileButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Profile')}>
      <Text style={styles.text}>Go to Profile</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  }
});

export default ProfileButton;