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
import { showMessage, hideMessage } from "react-native-flash-message";
export default class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      Password: "",
      Email: "",
      trustDevice: false,
    };
  }

  Login = async () => {
    let { Email } = this.state;
    if (Email === "") {
      showMessage({
        message: "Please enter your email",
        type: "danger",
      });
    } else {
      await axios
        .post(
          `https://uplft.bi/v1/auth/forgot-password/`,
          {
            email: Email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("----success------>", response.data);

          this.props.navigation.navigate("Login");
        })
        .catch((error) => {
          console.log("----error------>", error.response.data);
          // showMessage({
          //   message: error.response.data.meta.message,
          //   type: "danger",
          // });
        });
    }
  };
  render() {
    let { Email } = this.state;
    return (
      <View style={styles._layer}>
        <Image
          source={require("./../../images/logo.png")}
          style={styles._logo}
          resizeMode="cover"
        />
        <View style={styles._inner_view}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles._label}>Email</Text>
            <TextInput
              value={Email}
              style={styles._text_input}
              onChangeText={(Email) => this.setState({ Email })}
            />

            <TouchableOpacity
              style={styles._btn}
              activeOpacity={0.5}
              onPress={() => this.Login()}
            >
              <Text style={styles._btn_text}>Reset Password</Text>
            </TouchableOpacity>
            <View style={styles._or_view}>
              <Text style={styles._or}>or</Text>
            </View>

            <View style={styles._row}>
              <Text
                style={styles._forgot_text}
                onPress={() => this.props.navigation.navigate("Login")}
              >
                Back to sign in
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
    marginBottom: 40,
  },
  _btn_text: {
    color: "white",
    fontFamily: "Poppins_SemiBold",
    textAlign: "center",
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
    color: "grey",
    marginVertical: 10,
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Poppins_SemiBold",
  },
  _row: {
    // flexDirection: "row",
    // alignItems: "center",
  },
  _check_Box_row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  _trust_text: {
    fontWeight: "bold",
  },
  _or_view: {
    borderBottomWidth: 1,
    marginVertical: 10,
    borderColor: "#c6cacc",
  },
  _or: {
    alignSelf: "center",
    backgroundColor: "#f9fafb",
    marginBottom: -10,
    paddingHorizontal: 10,
    color: "#c6cacc",
  },
});
