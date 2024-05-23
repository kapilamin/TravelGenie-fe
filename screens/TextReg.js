import React from "react";
import { Text, StyleSheet } from "react-native";

const TextReg = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins_400Regular", // or 'Poppins_700Bold' for bold text
  },
});

export default TextReg;
