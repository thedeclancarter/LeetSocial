import React, { Component } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';

class TextAnimation extends Component {
  state = {
    text: "LeetSocial",
    index: 0,
    displayText: "",
    fadeAnim: new Animated.Value(1) // Initial value for opacity: 0
  };

  componentDidMount() {
    this.typeText();
    this.startBreathingEffect();
  }

  startBreathingEffect = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.fadeAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true
        }),
        Animated.timing(this.state.fadeAnim, {
          toValue: 0.5,
          duration: 1500,
          useNativeDriver: true
        }),
        Animated.timing(this.state.fadeAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true
        })
      ])
    ).start();
  };

  typeText = () => {
    if (this.state.index < this.state.text.length) {
      this.setState({
        displayText: this.state.displayText + this.state.text.charAt(this.state.index),
        index: this.state.index + 1
      });
      setTimeout(this.typeText, 150); // Adjust the typing speed here
    }
  };

  render() {
    const { fadeAnim } = this.state;

    return (
      <View style={styles.container}>
        <Animated.Text
          style={[
            styles.text,
            {
              opacity: fadeAnim, // Bind opacity to animated value
            },
          ]}
        >
          {this.state.displayText}
        </Animated.Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Orbitron-Regular',
    fontSize: 45,
    color: '#fff',
    textShadowColor: '#ffaa00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    // React Native doesn't support multiple text shadows and complex shadow animations like CSS
  },
});

export default TextAnimation;
