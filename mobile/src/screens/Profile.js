//Profile.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Profile = ({navigation}) => {
  return (
      <View style={styles.container}>
        <Header />
        {/* back button to home screen (loginsuccess) */}
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}>
            <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Profile</Text>
        <Text>LeetCode Username: </Text>
        <Text>Top Language: Java</Text>
        <Text>Questions Solved: 20</Text>
        {/* graphic that shows split of question difficulty */}
        {/* rank among friends */}
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
  button: {
    backgroundColor: 'black',
    borderRadius: 5,
  },
});

const Header = () => {
    return (
        <View style={styles.header}>
            <Text>Welcome!</Text>
        </View>
    );
};


export default Profile;
