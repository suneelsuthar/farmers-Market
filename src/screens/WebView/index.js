import * as React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet } from "react-native";
export default function WebViewScreen() {
  return (
    <WebView
      style={styles.container}
      originWhitelist={["*"]}
      source={{ uri: "https://uplft.bi/en-US/auth" }}
    />
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
