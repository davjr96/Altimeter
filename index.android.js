import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import {
  AnimatedGaugeProgress,
  GaugeProgress
} from "react-native-simple-gauge";

export default class altimeter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      altitude: 0,
      error: null
    };
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          altitude: (position.coords.altitude * 3.28084).toFixed(0),
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 1000,
        distanceFilter: 0
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    return (
      <View style={styles.container}>
        <AnimatedGaugeProgress
          size={200}
          width={15}
          fill={this.state.altitude / 100}
          cropDegree={90}
          tintColor="#9f0000"
          backgroundColor="#b0c4de"
          strokeCap="circle"
        >
          {fill => (
            <View style={styles.textView}>
              <Text style={styles.text}>{this.state.altitude} ft</Text>
            </View>
          )}
        </AnimatedGaugeProgress>

        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3b3b3b"
  },
  textView: {
    position: "absolute",
    top: 15,
    left: 15,
    width: 170,
    height: 120,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

AppRegistry.registerComponent("altimeter", () => altimeter);
