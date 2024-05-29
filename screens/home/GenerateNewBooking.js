// screens/home/GenerateNewBooking.js
import React from "react";
import { View, StyleSheet } from "react-native";
import BookingStack from "../navigation/BookingStack";

const GenerateNewBooking = () => {
  return (
    <View style={styles.container}>
      <BookingStack />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stackContainer: {
    flex: 1,
  },
});

export default GenerateNewBooking;
