import React, { useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { WebView } from "react-native-webview";

const BookingInfo = () => {
  const [fileResponse, setFileResponse] = useState(null);

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });
        setFileResponse(result);
        console.log(fileResponse);
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };



  return (
    <View style={styles.container}>
      <Button
        title="Pick Document"
        onPress={handleDocumentPick}
      />
      {fileResponse && (
        <View style={styles.responseContainer}>
          <Text>File Name: {fileResponse.assets[0].name}</Text>
          <Text>File Size: {fileResponse.size}</Text>
          <Text>File URI: {fileResponse.uri}</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  responseContainer: {
    marginTop: 20,
  },
});
export default BookingInfo;
