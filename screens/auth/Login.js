import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import React from "react";

const Login = ({ navigation }) => {
  return (
    <View>
      <Text>Signup</Text>
      <TextInput placeholder="username"></TextInput>
      <TextInput placeholder="password"></TextInput>
      <Button
        title="Signup"
        onPress={() => navigation.navigate("select-city")}
      ></Button>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
