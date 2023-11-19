//Profile.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';


const Profile = ({route, navigation}) => {
  const { userData } = route.params;


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
        <Text style={styles.text}>LeetCode Username: {userData.leetCodeUsername}</Text>
        <Text style={styles.text}>Top Language: Java</Text>
        <Text style={styles.text}>Questions Solved: 20</Text>
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
    backgroundColor: '#3c4749', // or any color you like
    color: 'white',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 5,
    textAlign: 'center',
    color: 'white',
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
