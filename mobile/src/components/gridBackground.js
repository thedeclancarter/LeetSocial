//gridBackground.js

import React from 'react';
import { View, StyleSheet } from 'react-native';

const GridBackground = () => {
    return (
        <View style={styles.container}>
            {Array.from({ length: 18 }).map((_, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {Array.from({ length: 9 }).map((_, columnIndex) => (
                        <View key={columnIndex} style={styles.cell} />
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'column',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    cell: {
        flex: 1,
        borderColor: 'rgba(255, 255, 255, 0.064)',
        borderWidth: 0.5,
    },
});

export default GridBackground;
