import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const Leaderboard = () => {
    const [filter, setFilter] = useState('all');

    const data = [
        {
            pos: "1st",
            un: "Dr. Lienecker",
            numSolved: "236",
            hard: "236",
            medium: "0",
            easy: "0",
        },
        {
            pos: "2nd",
            un: "Dr. Szumlanski",
            numSolved: "214",
            hard: "200",
            medium: "13",
            easy: "1",
        },
        {
            pos: "3rd",
            un: "Dr. Steinberg",
            numSolved: "197",
            hard: "128",
            medium: "64",
            easy: "5",
        },
        {
            pos: "4th",
            un: "Dr. Ahmed",
            numSolved: "181",
            hard: "59",
            medium: "100",
            easy: "22",
        },
        {
            pos: "5th",
            un: "Dr. Guha",
            numSolved: "1",
            hard: "0",
            medium: "0",
            easy: "1",
        },
    ];

    const getFilteredData = () => {
        switch (filter) {
            case 'hard':
                return data.filter(item => item.hard > 0);
            case 'medium':
                return data.filter(item => item.medium > 0);
            case 'easy':
                return data.filter(item => item.easy > 0);
            default:
                return data;
        }
    };

    const filteredData = getFilteredData();

    return (
        <View style={styles.tableContainer}>
            <Text style={styles.headerText}>Problems Solved</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => setFilter('all')}>
                    <Text style={styles.buttonText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setFilter('hard')}>
                    <Text style={styles.buttonText}>Hard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setFilter('medium')}>
                    <Text style={styles.buttonText}>Medium</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setFilter('easy')}>
                    <Text style={styles.buttonText}>Easy</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                {filteredData.map((item, index) => (
                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                        <Text style={styles.text}>{item.pos}</Text>
                        <Text style={styles.text}>{item.un}</Text>
                        <Text style={styles.text}>{item.numSolved}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default Leaderboard;


const styles = StyleSheet.create({
    tableContainer: {
        flex: 0.5,
        justifyContent: 'center',
        paddingBottom: 0,
        marginTop: 80, // React Native uses pixel values, 8rem might be approximated to 80
        marginHorizontal: 10,
        width: '95%', // React Native does not support vw, use percentage
        backgroundColor: '#3c3b39',
        borderRadius: 15,
        color: 'white',
        borderColor: 'rgba(176, 108, 39, 1)',
        borderWidth: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 0,
    },
    headerText: {
        padding: 10,
        fontSize: 20, // 2rem approximated to 32
        fontWeight: '600',
        color: 'white',
        justifyContent: 'space-between',
    },
    button: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'transparent',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginBottom: 10,
    },
    text:{
        color: 'white',
        alignSelf: 'center',
    }
});
