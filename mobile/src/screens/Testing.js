import React from "react";
import { StyleSheet, SafeAreaView, Text, View} from "react-native";
import GradientBackground from "../components/gradientBackground";
import GridBackground from "../components/gridBackground";
import TextAnimation from "../components/logo";
import Leaderboard from "../components/leaderBoard";
import QuestionPieChart from "../components/questionPieChart";

const TestPage = () => {
    return (

            <SafeAreaView style={styles.container}>
                <TextAnimation />
                <Text style={styles.text}>what the fuck</Text>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <QuestionPieChart />
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

