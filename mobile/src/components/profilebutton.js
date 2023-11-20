// ProfileButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';


const ProfileButton = ({ route, navigation }) => {
    const { id } = route.params;
    const imageSource = require('../images/ProfileWhite.png');
    return (
    <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profile', { id })}>
        <Image source={imageSource} style={{width: 50, height: 50}}/>
        <Text style={styles.text}>Profile</Text>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(176, 108, 39, 1)',
    borderRadius: 5,
    position: 'absolute',
    top: 50,
    right: 20,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  }
});

export default ProfileButton;