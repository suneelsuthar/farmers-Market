import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      Password: "",
      Email: "",
      trustDevice: false,
    };
  }

  Login = async () => {
    let { Password, Email, trustDevice } = this.state;
    if (Email === "") {
      showMessage({
        message: "Please enter your email",
        type: "danger",
      });
    } else if (Password === "") {
      showMessage({
        message: "Please enter your password",
        type: "danger",
      });
    } else {
      await axios
        .post(
          `https://uplft.bi/v1/auth/login/`,
          {
            email: Email,
            password: Password,
            trustDevice: trustDevice,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("----success------>", response.data);
          this.props.navigation.navigate("WebViewScreen");
        })
        .catch((error) => {
          console.log("----error------>", error.response.data);
          showMessage({
            message: "Something went wrong",
            type: "danger",
          });
        });
    }
  };
  render() {
    let { Password, Email, trustDevice } = this.state;
    return (
      <View style={styles._layer}>
        <Image
          source={require("./../../images/logo.png")}
          style={styles._logo}
          resizeMode="cover"
        />
        <View style={styles._inner_view}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles._label}>Email Address</Text>
            <TextInput
              value={Email}
              style={styles._text_input}
              onChangeText={(Email) => this.setState({ Email })}
            />
            <Text style={styles._label}>Password</Text>
            <TextInput
              value={Password}
              style={styles._text_input}
              secureTextEntry
              onChangeText={(Password) => this.setState({ Password })}
            />

            <View style={styles._check_Box_row}>
              {!trustDevice ? (
                <TouchableOpacity
                  onPress={() => this.setState({ trustDevice: true })}
                >
                  <MaterialCommunityIcons
                    name="checkbox-blank-outline"
                    size={24}
                    color="#60686f"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => this.setState({ trustDevice: false })}
                >
                  <MaterialCommunityIcons
                    name="checkbox-marked"
                    size={24}
                    color="#60686f"
                  />
                </TouchableOpacity>
              )}
              <Text style={styles._trust_text}>Trust this device</Text>
            </View>

            <TouchableOpacity
              style={styles._btn}
              activeOpacity={0.5}
              onPress={() => this.Login()}
            >
              <Text style={styles._btn_text}>Login</Text>
            </TouchableOpacity>
            <View style={[styles._row, { justifyContent: "space-between" }]}>
              <Text
                style={styles._forgot_text}
                onPress={() => this.props.navigation.navigate("Signup")}
              >
                Create an account
              </Text>
              <Text
                style={styles._forgot_text}
                onPress={() => this.props.navigation.navigate("ForgotPassword")}
              >
                Forgot your password?
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  _layer: {
    flex: 1,
    backgroundColor: "#f9fafb",
    paddingTop: "20%",
  },
  _logo: {
    height: 80,
    width: 200,
  },
  _btn: {
    backgroundColor: "#3b82f6",
    borderRadius: 10,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    height: 55,
    marginBottom: 20,
  },
  _btn_text: {
    color: "white",
    textAlign: "center",
    fontFamily: "Poppins_SemiBold",
  },
  _inner_view: {
    padding: 15,
  },
  _text_input: {
    backgroundColor: "#ece6e6",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    height: 55,
    borderWidth: 0.1,
    borderColor: "#fbf6f6",
    fontFamily: "Poppins_Regular",
  },
  _label: {
    marginVertical: 10,
    marginTop: 15,
    fontFamily: "Poppins_Medium",
  },
  _forgot_text: {
    alignSelf: "flex-end",
    color: "grey",
    fontFamily: "Poppins_Medium",
    textDecorationLine: "underline",
  },
  _row: {
    flexDirection: "row",
    alignItems: "center",
  },
  _check_Box_row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  _trust_text: {
    fontFamily: "Poppins_SemiBold",
  },
});
