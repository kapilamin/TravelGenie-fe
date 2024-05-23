import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen1 from "./screens/onboarding/OnboardingScreen1";
import OnboardingScreen2 from "./screens/onboarding/OnboardingScreen2";
import OnboardingScreen3 from "./screens/onboarding/OnboardingScreen3";
import Login from "./screens/auth/Login";
import SelectCity from "./screens/create-booking/SelectCity";
import SelectDates from "./screens/create-booking/SelectDates";
import SelectBudget from "./screens/create-booking/SelectBudget";
import GenerateOutboundFlights from "./screens/create-booking/GenerateOutboundFlights";
import GenerateInboundFlights from "./screens/create-booking/GenerateInboundFlights";
import GenerateHotels from "./screens/create-booking/GenerateHotels";
import { SafeAreaView } from "react-native";
import GenerateExcursions from "./screens/create-booking/GenerateExcursions";
import ConfirmBooking from "./screens/create-booking/ConfirmBooking";

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#e0f7fa",
    background: "white",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator>
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
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="select-city" component={SelectCity} />
          <Stack.Screen name="select-dates" component={SelectDates} />
          <Stack.Screen name="select-budget" component={SelectBudget} />
          <Stack.Screen
            name="generate-outbound-flights"
            component={GenerateOutboundFlights}
          />
          <Stack.Screen
            name="generate-inbound-flights"
            component={GenerateInboundFlights}
          />
          <Stack.Screen name="generate-hotels" component={GenerateHotels} />
          <Stack.Screen
            name="generate-excursions"
            component={GenerateExcursions}
          />
          <Stack.Screen name="confirm-booking" component={ConfirmBooking} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
