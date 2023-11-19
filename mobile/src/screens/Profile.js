//Profile.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import { useState } from 'react';

const Profile = ({route, navigation}) => {
    const { id } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);
    useEffect(() => {
        getUserProfile();
    }, []);

    const getUserProfile = () => {
        setLoading(true);
        // get user profile from leetcode
        const payload = {
            userId: id,
            };
            fetch('http://www.leetsocial.com/api/viewProfile',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
            .then (async res => {
                try{
                    const jsonRes = await res.json();
                    if (res.status != 200){
                        console.log('Error: ' + jsonRes.error);
                    }
                    else {
                        console.log(jsonRes);
                        setProfileData(jsonRes);
                        setLoading(false);
                    }
                }catch (err){
                    console.log(err);
                }  
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
        };

    return (
        <View style={styles.container}>
        <Header />
        {isLoading ? (
            <ActivityIndicator size="large" color="rgba(176, 108, 39, 1)" /> // Customize as needed
        ) : (
        <>
        {/* back button to home screen (loginsuccess) */}
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}>
            <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Profile</Text>
        <Text style={styles.text}>LeetCode Username: {profileData?.leetCodeUsername}</Text>
        <Text style={styles.text}>Top Language: {profileData?.topLanguage}</Text>
        <Text style={styles.text}>Total Questions with Top Language: {profileData?.topLanguageCount}</Text>
        <Text style={styles.text}>Questions Solved: {profileData?.solvedCount.all}</Text>
        {/* graphic that shows split of question difficulty */}
        {/* rank among friends */}
        </>
        )}
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
    fontSize: 20,
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