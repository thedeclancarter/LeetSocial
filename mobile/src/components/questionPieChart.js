//questionPieChart.js
//pie chart for questions solved

import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const MyDonutChart = ( {data} ) => {
    const nums = data;
    const chartData = [
        { name: 'Easy', population: nums.solvedCount.easy, color: '#3c3b39ff', legendFontColor: 'white', legendFontSize: 15 },
        { name: 'Medium', population: nums.solvedCount.medium, color: '#b06c27ff', legendFontColor: 'white', legendFontSize: 15 },
        { name: 'Hard', population: nums.solvedCount.hard, color: 'white', legendFontColor: 'white', legendFontSize: 15 },
    ];

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop:"auto"}}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Questions Solved</Text>
      <PieChart
        data={chartData}
        width={screenWidth*(3/4)}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[0, 0]} // Adjusted for centering
        absolute
        hasLegend={true}
        innerRadius={"50"} // Adjust for the hollow effect
        avoidFalseZero
      />
    </View>
  );
};

export default MyDonutChart;
