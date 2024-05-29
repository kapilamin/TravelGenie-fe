// screens/navigation/HomeStack.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GenerateNewBooking from "../home/GenerateNewBooking";
import ExistingBookings from "../home/ExistingBookings";
import ConfirmBooking from "../create-booking/ConfirmBooking";

import Profile from "../home/Profile";
import Login from "../auth/Login";
import BookingInfo from "../existing-booking/BookingInfo";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Generate New Booking"
        component={GenerateNewBooking}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Existing Bookings"
        component={ExistingBookings}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConfirmBooking"
        component={ConfirmBooking}
      />
      <Stack.Screen
        name="BookingInfo"
        component={BookingInfo}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
