import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import HomeStack from "./screens/navigation/HomeStack";
import { BookingProvider } from "./context/BookingContext";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import AppLoading from "expo-app-loading";
import "react-native-url-polyfill/auto";
import LoginStack from "./screens/navigation/LoginStack";
import { useContext, useEffect } from "react";


import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#e0f7fa",
    background: "white",
  },
};

export default function App() {
  useEffect(() => {
    
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      console.log(userData);
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    loadUser();
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <AuthProvider>
      <BookingProvider>
        <NavigationContainer theme={MyTheme}>
          <LoginStack />
        </NavigationContainer>
      </BookingProvider>
    </AuthProvider>
  );
}
