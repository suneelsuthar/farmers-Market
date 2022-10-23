// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Signup, ForgotPassword, WebViewScreen } from "./../screens";
const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ header: false, headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ header: false, headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ header: false, headerShown: false }}
        />

        <Stack.Screen
          name="WebViewScreen"
          component={WebViewScreen}
          options={{ header: false, headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
