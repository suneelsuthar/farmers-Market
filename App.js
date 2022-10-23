import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./src/navigation";
import FlashMessage from "react-native-flash-message";
import * as Font from "expo-font";
import { LogBox } from "react-native";
import AppLoading from "expo-app-loading";

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreAllLogs(); // ignore all logs

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      fontsLoaded: false,
    };
  }

  // <<<<<<<<<<<< COMFORTAA FONTS INITIALIZE >>>>>>>>>>>>>
  loadFonts = async () => {
    try {
      await Font.loadAsync({
        Poppins_Regular: require("./assets/fonts/Poppins-Regular.ttf"),
        Poppins_Medium: require("./assets/fonts/Poppins-Medium.ttf"),
        Poppins_SemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),

        //
      });
      this.setState({ fontsLoaded: true });
    } catch (err) {
      console.log(">>>>>errerr>>>>>>>>", err);
    }
  };

  render() {
    const { loggedIn, fontsLoaded } = this.state;
    if (fontsLoaded) {
      return (
        <View style={{ flex: 1 }}>
          <Navigation />
          <FlashMessage
            position="top"
            style={{ top: 10 }}
            floating={true}
          />
        </View>
      );
    } else {
      return (
        <AppLoading
          startAsync={this.loadFonts}
          onFinish={() => this.setState({ fontsLoaded: true })}
          onError={console.log("")}
        />
      );
    }
  }
}
