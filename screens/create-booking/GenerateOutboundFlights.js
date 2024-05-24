import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { cityToCode, codeToCity } from "../../utils/iataAirportCodes";
import { getFlights } from "../../api/api";
import TextReg from "../TextReg";
import TextBold from "../TextBold";
import { codeToAirline } from "../../utils/airlineCodes";

const GenerateOutboundFlights = ({ navigation, route }) => {
  const [flights, setFlights] = useState([]);
  const [selectedOutboundFlight, setSelectedOutboundFlight] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { outboundAirport, inboundAirport, departDate, returnDate, budget } =
    route.params;

  useEffect(() => {
    setIsLoading(true);
    const outboundAirportCode = cityToCode(outboundAirport);
    const inboundAirportCode = cityToCode(inboundAirport);
    getFlights(outboundAirportCode, inboundAirportCode, departDate)
      .then((flightData) => {
        setIsLoading(false);
        setFlights(flightData);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const handleFlightSelect = (flight) => {
    setSelectedOutboundFlight(flight);
  };

  const renderFlightItem = ({ item }) => (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleFlightSelect(item)}
        style={
          item.id === selectedOutboundFlight?.id
            ? styles.selectedFlightItem
            : styles.flightItem
        }
      >
        <View style={styles.flightInfoContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/plane.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.airlineText}>
              {codeToAirline(item.itineraries[0].segments[0].carrierCode) +
                " " +
                item.itineraries[0].segments[0].carrierCode +
                item.itineraries[0].segments[0].aircraft.code}
            </Text>
            <Text style={styles.departureText}>
              Departs{" "}
              {item.itineraries[0].segments[0].departure.at
                .split("T")[1]
                .split(":")
                .splice(0, 2)
                .join(":")}
            </Text>
          </View>
        </View>
        <Text style={styles.priceText}>£{item.price.total.split(".")[0]}</Text>
        <Pressable onPress={() => navigation.navigate("onboarding2")}>
          <Image
            source={require("../../assets/info.png")}
            style={styles.arrowImage}
          />
        </Pressable>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.flightContainer}>
      <TextBold style={styles.title}>Select Outbound Flight</TextBold>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <>
          <FlatList
            data={flights}
            renderItem={renderFlightItem}
            keyExtractor={(item) => item.id.toString()}
          />
          {selectedOutboundFlight && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate("generate-inbound-flights", {
                    selectedOutboundFlight,
                    outboundAirport,
                    inboundAirport,
                    departDate,
                    returnDate,
                    budget,
                  })
                }
              >
                <TextReg style={styles.buttonText}>Confirm Flight</TextReg>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};
export default GenerateOutboundFlights;

const styles = StyleSheet.create({
  flightContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  container: {
    flex: 1,
    paddingHorizontal: 8,

    backgroundColor: "#fff",
  },
  flightInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  imageContainer: {
    marginRight: 16,
  },
  image: {
    width: 40,
    height: 40,
  },
  textContainer: {
    flex: 1,
  },
  airlineText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  departureText: {
    fontSize: 14,
    color: "#888",
  },
  flightItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  selectedFlightItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#e0f7fa",
    borderRadius: 8,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
    marginRight: 16,
  },
  arrowImage: {
    width: 20,
    height: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    padding: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
