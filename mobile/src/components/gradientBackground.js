//gradientBackground.js
//gradient background for the app
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet } from 'react-native';

const GradientBackground = ({ children }) => {
    return (
        <LinearGradient
            colors={['#1a1a1a', '#181817ff', '#1a1a1a']} // Replace with your colors
            style={styles.linearGradient}
        >
            {children}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
});

export default GradientBackground;
