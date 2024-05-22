import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";

const SelectBudget = ({ navigation, route }) => {
  const { outboundAirport, inboundAirport, departDate, returnDate } =
    route.params;
  const [budget, setBudget] = useState("");
  return (
    <View>
      <Text>SelectBudget</Text>
      <TextInput
        placeholder="Enter your budget"
        value={budget}
        onChangeText={setBudget}
      ></TextInput>
      <Button
        title="Confirm"
        onPress={() =>
          navigation.navigate("generate-outbound-flights", {
            outboundAirport,
            inboundAirport,
            departDate,
            returnDate,
            budget,
          })
        }
      ></Button>
    </View>
  );
};

export default SelectBudget;

const styles = StyleSheet.create({});
