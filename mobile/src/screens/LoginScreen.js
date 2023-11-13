import React, {useState} from "react";
import { SafeAreaView, View, StyleSheet, StatusBar , TextInput, Button,TouchableOpacity, Text, Alert} from "react-native";
import TextAnimation from "../components/logo"; // Make sure the path is correct
import { navigate } from "../../App";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiBaseUrl = 'http://www.leetsocial.com';

const goToHomePage = () => {
    navigate('HomePage');
    };


const LoginScreen = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // ... additional state fields as needed

    const handleLogin = async (email, password) => {
        try {
            // const response = await axios.post('http://localhost:5102/api/login', { email:email, password:password });
            const js = JSON.stringify({email:email, password:password});
            const response = await fetch('http://localhost:5102/api/login', {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            const { token } = response.data;
            await AsyncStorage.setItem('userToken', token);
            goToHomePage();
        } catch (error) {
            console.log(error.message);
            Alert.alert('Login Failed', error.message);
        }
    };
    
      const handleSignUp = async () => {
        const endpoint = `http://www.leetsocial.com/api/signup`;
        const payload = { email:email, Password:password, FirstName:firstName, LastName:lastName };
    
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
    
          const data = await response.json();
          if (data.error) {
            Alert.alert('Signup Failed', data.error);
          } else {
            // Handle successful signup here
            // For example, show a success message and toggle to the login screen
            Alert.alert('Signup Success', 'Account created! Please login.');
            //navigation.navigate('HomePage');
          }
        } catch (error) {
          Alert.alert('Signup Error', error.message);
        }
      };
    


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
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={'#fff'}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
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
