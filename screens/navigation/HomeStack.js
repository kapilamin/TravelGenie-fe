// screens/navigation/HomeStack.js
import React, { useContext } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GenerateNewBooking from "../home/GenerateNewBooking";
import ExistingBookings from "../home/ExistingBookings";
import ConfirmBooking from "../create-booking/ConfirmBooking";
import { AuthContext } from "../../context/AuthContext";
import Profile from "../home/Profile";
import Login from "../auth/Login";
import BookingInfo from "../existing-booking/BookingInfo";
import DocumentViewer from "../existing-booking/DocumentViewer";

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
  const { user } = useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ConfirmBooking" component={ConfirmBooking} />
      <Stack.Screen name="BookingInfo" component={BookingInfo} />
      <Stack.Screen name="DocumentViewer" component={DocumentViewer} />
    </Stack.Navigator>
  );
};

export default HomeStack;
