import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import * as SplashScreen from 'expo-splash-screen'
SplashScreen.preventAutoHideAsync();

const ConfirmBooking = ({ navigation, route }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplashScreen();
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  const {
    selectedOutboundFlight,
    selectedInboundFlight,
    outboundAirport,
    inboundAirport,
    departDate,
    returnDate,
    budget,
    selectedHotel,
    selectedExcursions,
  } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Holiday</Text>
      <Text style={styles.subheading}>Hotel</Text>
      <ImageBackground
        source={{ uri: "https://picsum.photos/500/100" }}
        style={styles.hotelCard}
      >
        <View style={styles.overlay}>
          <Text style={styles.hotelName}>hotel name</Text>
        </View>
      </ImageBackground>
      <Text style={styles.subheading}>Flights</Text>
      <View style={styles.flightRow}>
        <View style={styles.flightCard}>
          <View style={styles.flagCard}>
            <Text style={styles.flag}>🇬🇧</Text>
          </View>
          <Text style={styles.text}>Manchester</Text>
          <Text style={styles.text}>Manchester</Text>
          <Text style={styles.text}>23/05/24 11:00AM</Text>
        </View>
        <Image
          source={require("../../assets/arrow-right-dark.png")}
          style={styles.arrow}
        />
        <View style={styles.flightCard}>
          <View style={styles.flagCard}>
            <Text style={styles.flag}>🇬🇧</Text>
          </View>
          <Text style={styles.text}>Manchester</Text>
          <Text style={styles.text}>Manchester</Text>
          <Text style={styles.text}>23/05/24 11:00AM</Text>
        </View>
      </View>
      <View style={styles.flightRow}>
        <View style={styles.flightCard}>
          <View style={styles.flagCard}>
            <Text style={styles.flag}>🇬🇧</Text>
          </View>
          <Text style={styles.text}>Manchester</Text>
          <Text style={styles.text}>Manchester</Text>
          <Text style={styles.text}>23/05/24 11:00AM</Text>
        </View>
        <Image
          source={require("../../assets/arrow-right-dark.png")}
          style={styles.arrow}
        />
        <View style={styles.flightCard}>
          <View style={styles.flagCard}>
            <Text style={styles.flag}>🇬🇧</Text>
          </View>
          <Text style={styles.text}>Manchester</Text>
          <Text style={styles.text}>Manchester</Text>
          <Text style={styles.text}>23/05/24 11:00AM</Text>
        </View>
      </View>
      <Text style={styles.subheading}>Cost</Text>
      <Text style={styles.text}>Hotel (5 Night)</Text>
      <Text style={styles.text}>Flights</Text>
      <Text style={styles.text}>Excursions</Text>
      <Text style={styles.text}>Total</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  container: {
    width: "90%",
    flex: 1,
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 18,
    marginBottom: 5,
    marginTop: 5,
    lineHeight: 40,
    fontFamily: "Poppins",
  },
  subheading: {
    width: "80%",
    lineHeight: 25,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "flex-start",
    color: "black",
    fontFamily: "Poppins",
  },
  image: {
    width: 330,
    height: 330,
    marginTop: 20,
    marginBottom: 50,
    alignSelf: "center",
  },
  icon: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    borderRadius: 50,
    marginBottom: 20,
    height: 75,
    width: 75,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  hotelCard: {
    width: "100%",
    height: 100,
    layoutmarginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  hotelName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: "70%",
    fontFamily: "Poppins",
  },
  flightRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
  },
  flightCard: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    width: 150,
    height: 150,
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrow: {
    height: 30,
    width: 30,
    margin: 15,
  },
  flagCard: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    borderRadius: 50,
    height: 60,
    width: 60,
    marginBottom: 5,
  },
  flag: {
    fontSize: 32,
  },
  text: {
    fontFamily: "Poppins",
  },
});

export default ConfirmBooking;
