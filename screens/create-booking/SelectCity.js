import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import TextReg from "../TextReg";
import TextBold from "../TextBold";

const SelectCity = ({ navigation }) => {
  const [outboundAirport, setOutboundAirport] = useState("Bangkok");
  const [inboundAirport, setInboundAirport] = useState("Manchester");

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <TextBold style={styles.title}>Where do you want to go?</TextBold>
        <TextReg style={styles.inputHeading}>Flying from:</TextReg>
        <View style={styles.inputContainer}>
          <Image
            source={require("../../assets/pin.png")}
            style={styles.image}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#B0B0B0"
            value={outboundAirport}
            onChangeText={setOutboundAirport}
          />
        </View>
        <TextReg style={styles.inputHeading}>Flying to:</TextReg>
        <View style={styles.inputContainer}>
          <Image
            source={require("../../assets/pin.png")}
            style={styles.image}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#B0B0B0"
            value={inboundAirport}
            onChangeText={setInboundAirport}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("select-dates", {
            outboundAirport,
            inboundAirport,
          })
        }
      >
        <TextReg style={styles.buttonText}>Next</TextReg>
      </TouchableOpacity>
    </View>
  );
};

export default SelectCity;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  container: {
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
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
});
