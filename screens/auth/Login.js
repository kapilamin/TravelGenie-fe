import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Pressable,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/AuthContext"; // Make sure to create and import AuthContext
import { postUser } from "../../api/api";
import { CommonActions } from "@react-navigation/native";
import showAlert from "../../utils/checkUserTaken";
import TextReg from "../TextReg";
import TextBold from "../TextBold";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPostingUser, setIsPostingUser] = useState(false);
  const { setUser } = useContext(AuthContext);

  const handleLogin = async () => {
    setIsPostingUser(true);
    const newUser = { username, password };
    try {
      setTimeout(async () => {
        await AsyncStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
      }, 2500);
    } catch (error) {
      setIsPostingUser(false);
      console.error("Error during Login:", error);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <TextBold style={styles.title}>Login</TextBold>
        <TextReg style={styles.inputHeading}>Username:</TextReg>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            editable={!isPostingUser}
          />
        </View>

        <TextReg style={styles.inputHeading}>Password:</TextReg>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!isPostingUser}
          />
        </View>
        <Button title="Login" onPress={handleLogin} disabled={isPostingUser} />
        <View style={styles.inline}>
          <TextReg style={styles.text}>New to TravelGenie? </TextReg>
          <Pressable
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <TextReg style={styles.signUp}>Sign up here</TextReg>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  container: {
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  image: {
    width: 27,
    height: 27,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    fontFamily: "Poppins",
  },
  button: {
    position: "absolute",
    bottom: 20,
    width: "90%",
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  inputHeading: {
    color: "rgba(0, 0, 0, 0.3)",
    alignSelf: "flex-start",
  },
  inline: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  text: {
    fontSize: 14,
  },
  signUp: {
    fontSize: 14,
    color: "#0373F3",
  },
});
