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
      altitude: null,
      error: null
    };
  }

  componentDidMount() {
    this.interval = setInterval(
      () =>
        navigator.geolocation.getCurrentPosition(
          position => {
            this.setState({
              altitude: position.coords.altitude,
              error: null
            });
          },
          error => this.setState({ error: error.message }),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        ),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <View
        style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
      >
        <AnimatedGaugeProgress
          size={200}
          width={15}
          fill={this.state.altitude * 328.084 / 10000}
          cropDegree={90}
          tintColor="#4682b4"
          backgroundColor="#b0c4de"
          strokeCap="circle"
        >
          {fill => (
            <View style={styles.textView}>
              <Text style={styles.text}>
                {this.state.altitude * 3.28084} ft
              </Text>
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
    backgroundColor: "#F5FCFF"
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
