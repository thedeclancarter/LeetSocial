//Header.js
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const Header = () => {
    return (
        <View style={styles.header}>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        color: '#fff',
        height: 50, // Set the height of the header
        backgroundColor: '#404040', // Dark grey color for the header
        alignItems: 'center',
        justifyContent: 'right',
        shadowColor: '#000', // Black color for the shadow
        shadowOffset: { width: 0, height: 2 }, // Shadow position
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3.84, // Shadow blur radius
        elevation: 5, // Elevation for Android (adds shadow effect)
        marginTop: 50,
    },
});

export default Header;