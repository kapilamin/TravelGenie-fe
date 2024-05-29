import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import TextBold from "../TextBold";
import { CommonActions } from "@react-navigation/native";
import BookingStack from "../navigation/BookingStack";
// use login from bookingStack to navigate logout
const Profile = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);
  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);

    navigation.navigate("login");
  };

  return (
    <View style={styles.container}>
      <TextBold>Hi {user?.username}</TextBold>
      <Button title="Logout" onPress={logout}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  stackContainer: {
    flex: 1,
  },
});

export default Profile;
