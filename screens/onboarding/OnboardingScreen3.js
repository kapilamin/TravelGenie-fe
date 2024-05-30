import { StyleSheet, Text, View, Button, Image, Pressable } from "react-native";
import { CommonActions } from "@react-navigation/native";
import React from "react";

const OnboardingScreen1 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/screen3.png")}
        style={styles.image}
      />
      <Text style={styles.heading}>Travel documents in one place</Text>
      <Text style={styles.subheading}>
        Easily store all your travel documents on your booking page.
      </Text>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#ddd" : "#007BFF",
          },
          styles.button,
        ]}
        onPress={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "login" }],
            })
          )
        }
      >
        <Image
          source={require("../../assets/arrow-right.png")}
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
};

export default OnboardingScreen1;

const styles = StyleSheet.create({
  container: {
    width: "70%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 40,
  },
  subheading: {
    width: "70%",
    lineHeight: 25,
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 50,
    color: "grey",
    textAlign: "center",
  },
  image: {
    width: 330,
    height: 330,
    marginTop: 20,
    marginBottom: 50,
    alignSelf: "center",
  },
  icon: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    borderRadius: 50,
    marginBottom: 20,
    height: 75,
    width: 75,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
