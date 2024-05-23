import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useState } from "react";
import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

const SelectDates = ({ navigation, route }) => {
  const { outboundAirport, inboundAirport } = route.params;
  const [departDate, setDepartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [dateDepart, setDateDepart] = useState(new Date());
  const [dateReturn, setDateReturn] = useState(new Date());
  const convertDateFormat = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };



  function onDepartChange(_, selectedDate) {
    const formattedDate = selectedDate.toLocaleDateString()
    setDateDepart(selectedDate)
    setDepartDate(convertDateFormat(selectedDate.toLocaleDateString()));
    ;
  }
  function onReturnChange(_, selectedDate) {
    setDateReturn(selectedDate)
    setReturnDate(convertDateFormat(selectedDate.toLocaleDateString()));
    ;
  }

  return (
    <View style={styles.container}>
      <Text>Select dates</Text>
      <DateTimePicker
        value={dateDepart}
        mode="date"
        onChange={onDepartChange}
      ></DateTimePicker>
      <DateTimePicker
        value={dateReturn}
        mode="date"
        onChange={onReturnChange}
      ></DateTimePicker>
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

const styles = StyleSheet.create({

});
