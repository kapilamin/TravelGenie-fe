import React from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import TextBold from "../TextBold";
import TextReg from "../TextReg";
import { CommonActions } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const Profile = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
    navigation.navigate("login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <MaterialIcons name="account-circle" size={100} color="#007AFF" />
        <TextBold style={styles.username}>Hi {user?.username}</TextBold>
        <TextReg style={styles.info}>Number of Bookings: 1</TextReg>
        <TextReg style={styles.info}>Member Since: 30th May 2024</TextReg>
        <TextReg style={styles.info}>Account Plan: Free</TextReg>
      </View>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecfafb",
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  username: {
    fontSize: 24,
    marginTop: 10,
    color: "#007AFF",
  },
  info: {
    fontSize: 18,
    marginVertical: 5,
    color: "#007AFF",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default Profile;
