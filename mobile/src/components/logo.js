import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class TextAnimation extends Component {
  state = {
    text: "LeetSocial",
    index: 0,
    displayText: ""
  };

  componentDidMount() {
    this.typeText();
  }

  typeText = () => {
    if (this.state.index < this.state.text.length) {
      this.setState(prevState => ({
        displayText: prevState.displayText + this.state.text.charAt(this.state.index),
        index: prevState.index + 1
      }));
      setTimeout(this.typeText, 150); // Adjust the typing speed here
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.state.displayText}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontFamily: 'Orbitron-Regular', // Make sure you have this font loaded in your project
    fontSize: 45,
    color: '#fff', // White text color
    // Add any additional styling you want for the text here
  },
});

export default TextAnimation;
