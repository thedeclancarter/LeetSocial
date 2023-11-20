import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';
import GridBackground from '../components/gridBackground';
import GradientBackground from '../components/gradientBackground';
import HeaderLogo from '../components/header';
import { SafeAreaView } from 'react-native-safe-area-context';

function VerifyPage({ navigation }) {
    const [leetCodeUsername, setUsername] = useState('');
    const [token, setToken] = useState('');

    const handleSubmit = () => {
      const payload = {
          token: token,
          leetCodeUsername: leetCodeUsername,
      };
          fetch(apiBaseUrl+'/api/login',{
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
                      navigation.navigate('Login');
                  }
              }catch (err){
                  console.log(err);
              };
          })
          .catch(err => {
              console.log(err);
          });
      };

    return (
        <GradientBackground>
        <SafeAreaView style={styles.container}>
            <GridBackground />
            <HeaderLogo />
            <View style={styles.formStyle}>
                <Text style={styles.formText}>Verification Code:</Text>
                <TextInput
                    style={styles.inputStyle}
                    value={token}
                    onChangeText={setToken}
                    placeholder='Verification Code'
                    placeholderTextColor='white'
                />
                <Text style={styles.formText}>LeetCode Username:</Text>
                <TextInput
                    style={styles.inputStyle}
                    value={leetCodeUsername}
                    onChangeText={setUsername}
                    placeholder='LeetCode Username'
                    placeholderTextColor='white'
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}><Text style={styles.buttonText}>Submit</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    formStyle: {
        backgroundColor: '#333',
        padding: 20,
        borderRadius: 8,
        color: 'white',
        width: '90%',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    inputStyle: {
        padding: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'grey',
        color: 'white',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formText: {
        padding: 10,
        color: 'white',
        fontSize: 20,
    },
    button: {
        marginTop: 20,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(176, 108, 39, 1)',
        borderRadius: 5,
        color: 'white',
        width: '50%',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'white',

    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
});

export default VerifyPage;
