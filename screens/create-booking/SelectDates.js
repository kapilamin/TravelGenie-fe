import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import TextBold from "../TextBold";
import TextReg from "../TextReg";

const SelectDates = ({ navigation, route }) => {
  const { outboundAirport, inboundAirport } = route.params;
  const [departDate, setDepartDate] = useState("Depart Date");
  const [returnDate, setReturnDate] = useState("Return Date");
  const [datePickerDepartDate, setDatePickerDepartDate] = useState(new Date());
  const [datePickerReturnDate, setDatePickerReturnDate] = useState(new Date());
  const convertDateFormat = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  function onDepartChange(_, selectedDate) {
    const formattedDate = selectedDate.toLocaleDateString();
    setDatePickerDepartDate(selectedDate);
    setDepartDate(convertDateFormat(selectedDate.toLocaleDateString()));
  }
  function onReturnChange(_, selectedDate) {
    setDatePickerReturnDate(selectedDate);
    setReturnDate(convertDateFormat(selectedDate.toLocaleDateString()));
  }

  return (
    <>
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <TextBold style={styles.title}>When do you want to go?</TextBold>
          <TextReg style={styles.inputHeading}>Selected dates:</TextReg>
          <View style={styles.inputContainer}>
            <Image
              source={require("../../assets/pin.png")}
              style={styles.image}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#B0B0B0"
              value={departDate + "    /    " + returnDate}
            ></TextInput>
          </View>
        </View>

        <View style={styles.datePickerContainer}>
          <View style={styles.datePicker}>
            <TextReg style={styles.inputHeading}>Depart Date:</TextReg>
            <DateTimePicker
              value={datePickerDepartDate}
              mode="date"
              onChange={onDepartChange}
              minimumDate={new Date()}
            ></DateTimePicker>
          </View>

          <View style={styles.datePicker}>
            <TextReg style={styles.inputHeading}>Return Date:</TextReg>
            <DateTimePicker
              value={datePickerReturnDate}
              mode="date"
              onChange={onReturnChange}
              minimumDate={datePickerDepartDate}
            ></DateTimePicker>
          </View>
        </View>

        <View style={styles.datePickerContainer}>
          {/* <Button
            title="Confirm"
            onPress={() =>
              navigation.navigate("select-budget", {
                outboundAirport,
                inboundAirport,
                departDate,
                returnDate,
              })
            }
          ></Button> */}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("select-budget", {
              outboundAirport,
              inboundAirport,
              departDate,
              returnDate,
            })
          }
        >
          <TextReg style={styles.buttonText}>Next</TextReg>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SelectDates;

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

    paddingHorizontal: 20,
    marginBottom: 30,
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
    marginBottom: 10,
  },
  datePickerContainer: {
    flexDirection: "row",

    width: "80%",
    justifyContent: "space-between",
  },
  datePicker: {
    flexDirection: "column",
  },
});
