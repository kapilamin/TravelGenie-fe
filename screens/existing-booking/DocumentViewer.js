import React from "react";
import { View, StyleSheet, Alert, Image } from "react-native";
import { WebView } from "react-native-webview";

const DocumentViewer = ({ route }) => {
  const { uri } = route.params;

  console.log(uri);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/boarding-pass.jpg")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    resizeMode: "contain",
  },
});

export default DocumentViewer;
