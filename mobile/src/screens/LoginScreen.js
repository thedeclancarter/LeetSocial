import React, {useState} from "react";
import { SafeAreaView, View, StyleSheet, StatusBar , TextInput, Button,TouchableOpacity, Text, Alert, LogBox, Keyboard, KeyboardAvoidingView} from "react-native";
import TextAnimation from "../components/logo"; // Make sure the path is correct
import { navigate } from "../../App";
// import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeToken, getToken, removeToken } from "../functions/storage";
import GradientBackground from "../components/gradientBackground";
import GridBackground from "../components/gridBackground";


const apiBaseUrl = 'http://www.leetsocial.com';
const jwtDecode = require('jwt-decode');

const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
};
const isValidName = (name) => {
    return name && name.trim().length > 1;
};

const validatePassword = (password) => {
    return {
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumbers: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        isLongEnough: password.length >= 8
    };
};




const LoginScreen = ({navigation}) => {
    const [isSignUp, setIsSignUp] = useState(false);
    // const [email, setEmail] = useState('testing@test.com'); //remove later this is for testing
    const [email, setEmail] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // const [password, setPassword] = useState('password'); //remove later this is for testing
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
        // ... additional state fields as needed

    const handleLogin = () => {
        const payload = {
            email:email,
            password:password,
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
                        setIsError(true);
                        setMessage(jsonRes.error);
                    }
                    else {
                        setMessage('');
                        setIsError(false);
                        const token = jsonRes.accessToken;
                        await storeToken(token);
                        const decoded = jwtDecode(token);
                        navigation.navigate('UserHome', {userData:decoded});
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
        if (!isValidEmail(email)) {
            setMessage("Valid email required");
            setIsError(true);
            return;
        }
        
        if (!isValidName(firstName)) {
            setMessage("Invalid first name");
            setIsError(true);
            return;
        }
    
        if (!isValidName(lastName)) {
            setMessage("Invalid last name");
            setIsError(true);
            return;
        }

        const passwordValidation = validatePassword(password);
        const passwordErrors = [];
        if (!passwordValidation.hasUpperCase) passwordErrors.push("an uppercase letter");
        if (!passwordValidation.hasLowerCase) passwordErrors.push("a lowercase letter");
        if (!passwordValidation.hasNumbers) passwordErrors.push("a number");
        if (!passwordValidation.hasSpecialChar) passwordErrors.push("a special character");
        if (!passwordValidation.isLongEnough) passwordErrors.push("minimum 8 characters");
    
        if (passwordErrors.length > 0) {
            const errorString = "Password must contain " + passwordErrors.join(", ") + ".";
            setMessage(errorString);
            setIsError(true);
            return;
        }
    
        if (password !== confirmPassword) {
            setMessage("Passwords don't match");
            setIsError(true);
            return;
        }
        const payload = {
            email:email,
            password:password,
            firstName:firstName,
            lastName:lastName,
            };
            fetch(apiBaseUrl+'/api/signup',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
            .then (async res => {
                try{
                    const jsonRes = await res.json();
                    if (res.status === 409){
                        setMessage('Email already Exists');
                        setIsError(true);
                    }
                    if (res.status != 201){
                        setIsError(true);
                        setMessage(jsonRes.error);
                    }
                    else{
                        setIsError(false);
                        navigation.navigate('VerifyPage');
                    }
                }catch (err){
                    console.log(err);
                }  
            })
            .catch(err => {
                console.log(err);
            });
        };



    const getMessage = () => {
        const status = isError ? 'Error: ' : '';
        return status + message;
    }


    return (
        <GradientBackground>
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <GridBackground />
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
                            placeholderTextColor={'black'}
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Last Name"
                            placeholderTextColor={'black'}
                            value={lastName}
                            onChangeText={setLastName}
                        />
                        </>
                    )}
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor={'black'}
                            value={email}
                            onChangeText={newText => setEmail(newText)}
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor={'black'}
                            secureTextEntry
                            value={password}
                            onChangeText={newText => setPassword(newText)}
                            autoCapitalize="none"
                        />
                        {isSignUp && (
                            <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            placeholderTextColor={'black'}
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            />
                        
                        )}
                        <TouchableOpacity onPress={isSignUp ? handleSignUp : handleLogin} style={styles.button}>
                            <Text style={styles.buttonText}>
                                {isSignUp ? "Sign Up" : "Login"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setIsSignUp(!isSignUp)}
                            style={styles.toggleButton}
                        >
                            <Text style={styles.toggleButtonText}>
                            {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                            </Text>
                        </TouchableOpacity>
                    </View>
            </KeyboardAvoidingView>
            </SafeAreaView>
        </GradientBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
    },
    loginContainer: {
        margin: 20,
        padding: 20,
        backgroundColor: '#333', // Darker grey background for the form
        borderRadius: 5,
        elevation: 10, // Elevation for Android (adds shadow effect)
        // For iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderWidth: 2,
        borderColor: 'white',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: 'black', // White text for the inputs
        backgroundColor: 'white', // Even darker grey for the input fields
    },
    toggleButton: {
        marginTop: 20,
      },
    toggleButtonText: {
        color: '#3797EF',
        alignSelf: 'center',
    },
    button: {
        marginTop: 20,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(176, 108, 39, 1)',
        borderRadius: 5,
        color: 'white',
        width: 'auto',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
    message: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
});


export default LoginScreen;