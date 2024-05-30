// screens/navigation/BookingStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "../auth/SignUp";
import Login from "../auth/Login";
import OnboardingScreen1 from "../onboarding/OnboardingScreen1";
import OnboardingScreen2 from "../onboarding/OnboardingScreen2";
import OnboardingScreen3 from "../onboarding/OnboardingScreen3";

const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName="onboarding1">
      <Stack.Screen
        name="onboarding1"
        component={OnboardingScreen1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="onboarding2"
        component={OnboardingScreen2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="onboarding3"
        component={OnboardingScreen3}
        options={{ headerShown: false }}
      />
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
