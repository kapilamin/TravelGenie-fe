// screens/navigation/HomeStack.js
import React, { useContext } from "react";
import { Image } from "react-native";
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
import generateIcon from "../../assets/generateIcon.png";
import existingIcon from "../../assets/existing.png";
import profileIcon from "../../assets/profile.png";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === "New Booking") {
            iconSource = generateIcon;
          } else if (route.name === "My Bookings") {
            iconSource = existingIcon;
          } else if (route.name === "Profile") {
            iconSource = profileIcon;
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
            />
          );
        },
        tabBarActiveTintColor: "#007AFF", // Change this to your desired color
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="New Booking"
        component={GenerateNewBooking}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="My Bookings"
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
      <Stack.Screen
        name="ConfirmBooking"
        component={ConfirmBooking}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookingInfo"
        component={BookingInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DocumentViewer"
        component={DocumentViewer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
