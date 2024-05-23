import React from "react";
import { Text, StyleSheet } from "react-native";

const TextBold = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins_700Bold", // or 'Poppins_700Bold' for bold text
  },
});

export default TextBold;
