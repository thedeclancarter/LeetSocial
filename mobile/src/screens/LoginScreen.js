import React, {useState} from "react";
import { SafeAreaView, View, StyleSheet, StatusBar , TextInput, Button,TouchableOpacity, Text} from "react-native";
import TextAnimation from "../components/logo"; // Make sure the path is correct

const LoginScreen = () => {
    const [isSignUp, setIsSignUp] = useState(false); // State to toggle between login and sign up
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // State for sign-up fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // ... additional state fields as needed

    const [username, setUsername] = useState('');

    const handleLogin = () => {
        // Implement your login logic here
        console.log(username, password);
    };
    const handleSignUp = () => {
        //Sign up logic
    
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
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={setLastName}
                />
                </>
            )}
                <TextInput
                    style={styles.input}
                    placeholder="username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                {isSignUp && (
                    <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
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
