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

export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      Firstname: "",
      Lastname: "",
      Password: "",
      Confirmpassword: "",
      Email: "",
      Username: "",
    };
  }

  CreteAccount = async () => {
    let { Firstname, Lastname, Password, Confirmpassword, Email, Username } =
      this.state;
    if (Username === "") {
      showMessage({
        message: "Please enter user name",
        type: "danger",
      });
    } else if (Firstname === "") {
      showMessage({
        message: "Please enter your first name",
        type: "danger",
      });
    } else if (Lastname === "") {
      showMessage({
        message: "Please enter your last name",
        type: "danger",
      });
    } else if (Password === "") {
      showMessage({
        message: "Please enter your password",
        type: "danger",
      });
    } else if (Confirmpassword === "") {
      showMessage({
        message: "Please enter your confirm password",
        type: "danger",
      });
    } else if (Email === "") {
      showMessage({
        message: "Please enter your email",
        type: "danger",
      });
    } else if (Password !== Confirmpassword) {
      showMessage({
        message: "Password does not matched",
        type: "danger",
      });
    } else {
      await axios
        .post(
          `https://uplft.bi/v1/auth/register/`,
          {
            username: Username,
            email: Email,
            firstname: Firstname,
            lastname: Lastname,
            password: Password,
            confirmPassword: Confirmpassword,
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
          showMessage({
            message: "Something went wrong!",
            type: "danger",
          });
          // showMessage({
          //   message: error.response.data.meta.message,
          //   type: "danger",
          // });
        });
    }
  };
  render() {
    let { Firstname, Lastname, Password, Confirmpassword, Email, Username } =
      this.state;
    return (
      <View style={styles._layer}>
        <Image
          source={require("./../../images/logo.png")}
          style={styles._logo}
          resizeMode="cover"
        />
        <View style={styles._inner_view}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles._label}>Username</Text>
            <TextInput
              value={Username}
              style={styles._text_input}
              onChangeText={(Username) => this.setState({ Username })}
            />
            <Text style={styles._label}>Firstname</Text>
            <TextInput
              value={Firstname}
              style={styles._text_input}
              onChangeText={(Firstname) => this.setState({ Firstname })}
            />

            <Text style={styles._label}>Lastname</Text>
            <TextInput
              value={Lastname}
              style={styles._text_input}
              onChangeText={(Lastname) => this.setState({ Lastname })}
            />

            <Text style={styles._label}>Password</Text>
            <TextInput
              value={Password}
              style={styles._text_input}
              secureTextEntry
              onChangeText={(Password) => this.setState({ Password })}
            />

            <Text style={styles._label}>Confirm password</Text>
            <TextInput
              value={Confirmpassword}
              style={styles._text_input}
              secureTextEntry
              onChangeText={(Confirmpassword) =>
                this.setState({ Confirmpassword })
              }
            />

            <Text style={styles._label}>Email</Text>
            <TextInput
              value={Email}
              style={styles._text_input}
              onChangeText={(Email) => this.setState({ Email })}
            />
            <TouchableOpacity
              style={styles._btn}
              activeOpacity={0.5}
              onPress={() => this.CreteAccount()}
            >
              <Text style={styles._btn_text}>Register</Text>
            </TouchableOpacity>
            <Text
              style={styles._forgot_text}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              Already heave an account?
            </Text>
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
    paddingTop: 20,
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
    marginBottom: 10,
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
    marginVertical: 10,
    fontFamily: "Poppins_Medium",
    marginBottom: 80,
    textDecorationLine: "underline",
  },
});
