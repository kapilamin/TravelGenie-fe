// screens/navigation/BookingStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "../auth/SignUp";
import Login from "../auth/Login";

const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default LoginStack;
