import React, { useState, useContext } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/AuthContext"; // Make sure to create and import AuthContext
import { postUser } from "../../api/api";
import { CommonActions } from "@react-navigation/native";
import showAlert from "../../utils/checkUserTaken";


const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPostingUser, setIsPostingUser] = useState(false);
  const { setUser } = useContext(AuthContext);

  const handleSignup = async () => {
    setIsPostingUser(true);
    const newUser = { username, email, password };
    try {
      if (newUser.username === "U") {
        showAlert(setIsPostingUser)
        setUsername('')
        
      } else {
        const user = await postUser(newUser);
        await AsyncStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "onboarding1" }],
          })
        );
      }
    } catch (error) {
      setIsPostingUser(false);
      console.error("Error during signup:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="Signup"
        onPress={handleSignup}
        disabled={isPostingUser}
      />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 25,
  },
});
