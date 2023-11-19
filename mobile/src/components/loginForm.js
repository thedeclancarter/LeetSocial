import React from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';

const LoginForm = ({ isSignUp, setIsSignUp, handleLogin, handleSignUp, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, firstName, setFirstName, lastName, setLastName, message, getMessage, isError }) => {
    return (
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
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={'black'}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
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
    );
};

const styles = StyleSheet.create({
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
        paddingBottom: 40,
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
    },
});

export default LoginForm;
