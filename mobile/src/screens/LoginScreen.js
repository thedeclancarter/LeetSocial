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
                            setIsError(false);
                            navigate('LoginSuccess', {data: jsonRes});
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
                        navigate('SignUpSuccess', {data: jsonRes});
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

const styles = StyleSheet.create({
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