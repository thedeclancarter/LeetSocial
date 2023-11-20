import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const Leaderboard = ({ friendData }) => {
    const [filter, setFilter] = useState('all');
    const [transformedData, setTransformedData] = useState([]);

    useEffect(() => {
        transformData(friendData);
    }, [friendData]);

    useEffect(() => {
        // Re-transform data when filter changes
        transformData(friendData);
    }, [filter]);

    const transformData = (data) => {
        if (data && data.length > 0) {
            // Sort and transform the data based on the current filter
            const sortedData = [...data].sort((a, b) => b[filter] - a[filter]);
            const transformed = sortedData.map((friend, index) => ({
                pos: `${index + 1}st`,
                un: friend.leetCodeUsername,
                numSolved: friend[filter].toString(),
                hard: friend.hard.toString(),
                medium: friend.medium.toString(),
                easy: friend.easy.toString(),
            }));
            setTransformedData(transformed);
        }
    };

    const getFilteredData = () => {
        return transformedData || [];
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
        borderRadius: 8,
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
