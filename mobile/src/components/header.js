//Header Leetsocial logo
//Header.js

import React, { Component } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
const viewWidth = window.width;

class HeaderLogo extends Component {
  state = {
    text: "LeetSocial",
    displayText: "", // Will be set to full text without typing effect
    fadeAnim: new Animated.Value(1) // Initial value for opacity: 1
  };

  componentDidMount() {
    this.setState({ displayText: this.state.text }); // Set the full text immediately
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

  render() {
    const { fadeAnim, displayText } = this.state;

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
          {displayText}
        </Animated.Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: 50,
    position: 'absolute',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Orbitron-Regular',
    fontSize: 45,
    color: '#fff',
    textShadowColor: '#ffaa00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
});

export default HeaderLogo;
