//Profile.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import { useState } from 'react';
import QuestionPieChart from '../components/questionPieChart';
import HeaderLogo from '../components/header';

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
        <HeaderLogo />
        {isLoading ? (
        <>
            <Text style={styles.text}>Loading...</Text>
            <ActivityIndicator size="large" color="rgba(176, 108, 39, 1)" />
        </>
        ) : (
        <>
        {/* back button to home screen (loginsuccess) */}
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}>
            <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
        <View style={styles.ProfileContainer}>
        <Text style={styles.text}>Profile</Text>
        <Text style={styles.text}>
        <Text style={styles.boldText}>LeetCode Username: </Text>{profileData?.leetCodeUsername}</Text>
        <Text style={styles.text}>
        <Text style={styles.boldText}>Top Language:</Text> {profileData?.topLanguage}
        </Text>
        <Text style={styles.text}>
        <Text style={styles.boldText}>Total Questions with Top Language:</Text> {profileData?.topLanguageCount}
        </Text>
        </View>
        <QuestionPieChart  data={profileData}/>
        
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
    ProfileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3c4749', // or any color you like
        color: 'white',
        borderWidth: 1,
        borderColor: 'rgba(176, 108, 39, 1)',
        borderRadius: 15,
        padding: 10,
        marginBottom: 20,
    },
  text: {
    fontSize: 20,
    color: 'white',
  },
  boldText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 5,
    textAlign: 'center',
    color: 'white',
    padding: 10,
    position : 'absolute',
    top: 50,
    left: 20,
  },
});


export default Profile;