import React from "react";
import { StyleSheet, SafeAreaView, Text, View} from "react-native";
import GradientBackground from "../components/gradientBackground";
import GridBackground from "../components/gridBackground";
import TextAnimation from "../components/logo";
import LoginForm from "../components/loginForm";
const TestPage = () => {
    return (
        <GradientBackground >
        <GridBackground />
            <SafeAreaView style={styles.container}>
                <TextAnimation />
                <Text style={styles.text}>what the fuck</Text>
            </SafeAreaView>

        </GradientBackground>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
})



export default TestPage;

