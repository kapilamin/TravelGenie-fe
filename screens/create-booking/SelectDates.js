import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useState } from "react";
import React from "react";

const SelectDates = ({ navigation, route }) => {
  const { outboundAirport, inboundAirport } = route.params;
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  return (
    <View>
      <Text>Select dates</Text>
      <TextInput
        placeholder="Enter departure date"
        value={departDate}
        onChangeText={setDepartDate}
      ></TextInput>
      <TextInput
        placeholder="Enter return date"
        value={returnDate}
        setReturnDate
        onChangeText={setReturnDate}
      ></TextInput>
      <Button
        title="Confirm"
        onPress={() =>
          navigation.navigate("select-budget", {
            outboundAirport,
            inboundAirport,
            departDate,
            returnDate,
          })
        }
      ></Button>
    </View>
  );
};

export default SelectDates;

const styles = StyleSheet.create({});
