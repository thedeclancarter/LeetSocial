import React, { Component } from 'react';
import './Logo.css';

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
            this.setState({
                displayText: this.state.displayText + this.state.text.charAt(this.state.index),
                index: this.state.index + 1
            });
            setTimeout(this.typeText, 150); // Adjust the typing speed here
        }
    };

    render() {
        return (
            <div className="glow">
                <h1>                   
                    {this.state.displayText}
                </h1>
            </div>
        );
    }
}

export default TextAnimation;