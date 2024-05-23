import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import React from "react";
import { useState } from "react";

const SelectCity = ({ navigation }) => {
  const [outboundAirport, setOutboundAirport] = useState("BKK");
  const [inboundAirport, setInboundAirport] = useState("MAN");

  return (
    <View>
      <Text>SelectCity</Text>
      <TextInput
        placeholder="Enter outbound airport code"
        value={outboundAirport}
        onChangeText={setOutboundAirport}
      ></TextInput>
      <TextInput
        placeholder="Enter inbound airport code"
        value={inboundAirport}
        onChangeText={setInboundAirport}
      ></TextInput>
      <Button
        title="Confirm"
        onPress={() =>
          navigation.navigate("select-dates", {
            outboundAirport,
            inboundAirport,
          })
        }
      ></Button>
    </View>
  );
};

export default SelectCity;

const styles = StyleSheet.create({});
