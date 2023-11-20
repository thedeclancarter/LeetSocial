// Login successful screen
import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProfileButton from '../components/profileButton';
import Leaderboard from '../components/leaderBoard';
import GradientBackground from '../components/gradientBackground';
import GridBackground from '../components/gridBackground';
import HeaderLogo from '../components/header';

const UserHome = ({ route, navigation }) => {
  const { userData } = route.params;
  const id = userData.userId;
  const [friendList, setFriendList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFriends().then((updatedFriendList) => {
      setFriendList(updatedFriendList);
      setIsLoading(false);
    })
}, []);
  
  const handleLogout = () =>{
    const remove = require('../functions/storage');
    remove.removeToken();
    navigation.navigate('Login');
  }

  const loadFriends = async () => {
    const payload = {
      userId: id,
      searchString: "",
    };
  
    try {
      const res = await fetch('http://www.leetsocial.com/api/searchFriends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const jsonRes = await res.json();
      if (res.status === 200) {
        const updatedFriendList = await loadData(jsonRes);
        return updatedFriendList;
      } else {
        console.error('Error: ' + jsonRes.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

const loadData = async (friendList) => {
  const fetchPromises = friendList.map(async (friend) => {
    const payload = {
      username: friend.leetCodeUsername,
    };

    try {
      const response = await fetch('http://www.leetsocial.com/api/userSolvedCount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const jsonRes = await response.json();
      return { ...friend, ...jsonRes }; // Merge the friend object with the response
    } catch (err) {
      console.error(err);
      return friend; // In case of an error, return the original friend object
    }
  });

  return Promise.all(fetchPromises); // Wait for all fetch requests to complete
};

  if(isLoading){
    return (
      <GradientBackground>
        <View style={styles.container}>
          <GridBackground />
          <HeaderLogo />
          <Text style={styles.text}>Loading...</Text>
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <View style={styles.container}>
        <GridBackground />
        <HeaderLogo />
        <TouchableOpacity onPress={handleLogout} style={styles.button}><Text style={styles.buttonText}>Logout</Text></TouchableOpacity>
        <ProfileButton navigation={navigation} route={{ params: { id } }} />
        <Text style={styles.text}>Welcome {userData.firstName} {userData.lastName}!</Text>
        <Leaderboard friendData={friendList}/> 
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
    backgroundColor: 'rgba(176, 108, 39, 1)',
    borderRadius: 5,
    color: 'white',
    borderWidth: 2,
    borderColor: 'white',
    position: 'absolute',
    top: 60,
    left: 10,
  },
  buttonText: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  }
});



export default UserHome;
