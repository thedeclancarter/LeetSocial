import React, {useState} from "react";
import { SafeAreaView, View, StyleSheet, StatusBar , TextInput, Button,TouchableOpacity, Text, Alert, LogBox} from "react-native";
import TextAnimation from "../components/logo"; // Make sure the path is correct
import { navigate } from "../../App";
import axios from "axios";

import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiBaseUrl = 'http://www.leetsocial.com';

   
const LoginScreen = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
        // ... additional state fields as needed

            // const handleLogin = async (email, password) => {
            //     const endpoint = `http://localhost:5102/api/login`;
            //     const payload = { email:email, password:password };
            //     const js = JSON.stringify(payload);
            //     Alert.alert('Login Attempted', 'email: ' + email + ' pw: ' + password);
            //     try
            //     {
            //         LogBox.log('attempting to fetch');
            //         const response = await fetch(endpoint,
            //             {method:'POST', body:js, headers:{'Content-Type': 'application/json'}});
                    
            //         if(!response.ok){
            //             throw new Error('HTTP error, status = ${response.status}');
            //         }
            //         // Store/Decode the incoming JWT token
            //         const data = await response.json();
            //         LogBox.log('Response Data', data);
            //         //store the token
            //         if( data.userId === -1 )
            //         {
            //             setMessage('User/Password combination incorrect');
            //         }
            //         else
            //         {
            //             goToHomePage();
            //         }
            //     }
            //     catch(e)
            //     {
            //         LogBox.log('Error in catch block', e);
            //         Alert.alert(e.toString());
            //     }

            //     //AsyncStorage.setItem('userToken', userToken);

            // };
        const handleLogin = () => {
                const payload = {
                    email:email,
                    password:password,
                };
                fetch('http://localhost:5102/api/login',{
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
                            setIsError(true);
                            setMessage(jsonRes.error);
                        }
                        else {
                            navigate('HomePage', {data: jsonRes});
                        }
                    }catch (err){
                        console.log(err);
                    };
                })
                .catch(err => {
                    console.log(err);
                });
            };
    
    
    const handleSignUp = () => {
        if (password !== confirmPassword) {
            setMessage("Passwords don't match");
            setIsError(true);
        } else {

        const payload = {
            email:email,
            password:password,
            firstName:firstName,
            lastName:lastName,
            };
            fetch('http://localhost:5102/api/signup',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
            .then (async res => {
                try{
                    const jsonRes = await res.json();
                    if (res.status != 201){
                        setIsError(true);
                        setMessage('Error: ' + jsonRes.error);
                    }
                    else {
                        setIsError(false);
                        navigate('HomePage', {data: jsonRes});
                    }
                }catch (err){
                    console.log(err);
                }  
            })
            .catch(err => {
                console.log(err);
            });
        }
        };



    const getMessage = () => {
        const status = isError ? 'Error: ' : 'Success: ';
        return status + message;
    }


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor="#404040" // Dark grey color for the status bar
                barStyle="light-content" // Light content for dark backgrounds
            />
            <Header />
            <View style={styles.centeredView}>
                <TextAnimation />
            </View>
            <View style={styles.loginContainer}>
            <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
            {isSignUp && (
                <>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor={'#fff'}
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor={'#fff'}
                    value={lastName}
                    onChangeText={setLastName}
                />
                </>
            )}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={'#fff'}
                    value={email}
                    onChangeText={newText => setEmail(newText)}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={'#fff'}
                    // secureTextEntry
                    value={password}
                    onChangeText={newText => setPassword(newText)}
                    autoCapitalize="none"
                />
                {isSignUp && (
                    <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor={'#fff'}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    />
                
                )}
                <Button
                    title={isSignUp ? "Sign Up" : "Login"}
                    onPress={isSignUp ? handleSignUp : handleLogin}
                />
                <TouchableOpacity
                    onPress={() => setIsSignUp(!isSignUp)}
                    style={styles.toggleButton}
                >
                    <Text style={styles.toggleButtonText}>
                    {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const Header = () => {
    return (
        <View style={styles.header}>
            <Text>Welcome!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        color: '#fff',
        height: 50, // Set the height of the header
        backgroundColor: '#404040', // Dark grey color for the header
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000', // Black color for the shadow
        shadowOffset: { width: 0, height: 2 }, // Shadow position
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3.84, // Shadow blur radius
        elevation: 5, // Elevation for Android (adds shadow effect)
    },
    container: {
        backgroundColor: '#3c4749',
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginContainer: {
        margin: 20,
        padding: 20,
        backgroundColor: '#2e2f38', // Darker grey background for the form
        borderRadius: 5,
        elevation: 10, // Elevation for Android (adds shadow effect)
        // For iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: 'white', // White text for the inputs
        backgroundColor: '#696969', // Even darker grey for the input fields
    },
    toggleButton: {
        marginTop: 20,
      },
      toggleButtonText: {
        color: '#3797EF',
      },
});


export default LoginScreen;