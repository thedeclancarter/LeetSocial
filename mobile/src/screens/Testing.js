import React from "react";
import { StyleSheet, SafeAreaView, Text, View} from "react-native";
import GradientBackground from "../components/gradientBackground";
import GridBackground from "../components/gridBackground";
import TextAnimation from "../components/logo";
import Leaderboard from "../components/leaderBoard";

const TestPage = () => {
    return (

            <SafeAreaView style={styles.container}>
                <TextAnimation />
                <Text style={styles.text}>what the fuck</Text>
                <Leaderboard />
            </SafeAreaView>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',

    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
})



export default TestPage;

