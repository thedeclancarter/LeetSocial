import React from "react";
import { StyleSheet, SafeAreaView, Text, View} from "react-native";
import GradientBackground from "../components/gradientBackground";
import GridBackground from "../components/gridBackground";
import TextAnimation from "../components/logo";
import Leaderboard from "../components/leaderBoard";
import QuestionPieChart from "../components/questionPieChart";
import HeaderLogo from "../components/header";

const TestPage = () => {
    return (

            <SafeAreaView style={styles.container}>
                <HeaderLogo />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                </View>
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

