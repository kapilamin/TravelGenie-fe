import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";

import { getFlights } from "../../api/api";

const GenerateInboundFlights = ({ navigation, route }) => {
  const [flights, setFlights] = useState([]);
  const [selectedInboundFlight, setSelectedInboundFlight] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    selectedOutboundFlight,
    outboundAirport,
    inboundAirport,
    departDate,
    returnDate,
    budget,
  } = route.params;

  useEffect(() => {
    setIsLoading(true);
    getFlights(inboundAirport, outboundAirport, returnDate).then(
      (flightData) => {
        setIsLoading(false);
        setFlights(flightData);
      }
    );
  }, []);

  const handleFlightSelect = (flight) => {
    setSelectedInboundFlight(flight);
  };

  const renderFlightItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleFlightSelect(item)}
      style={
        item.id === selectedInboundFlight?.id
          ? styles.selectedFlightItem
          : styles.flightItem
      }
    >
      <Text style={styles.flightText}>Flight: {item.id}</Text>
      <Text style={styles.flightText}>
        Departure: {item.itineraries[0].segments[0].departure.at.split("T")[1]}
      </Text>
      <Text style={styles.flightText}>
        Arrival: {item.itineraries[0].segments[0].arrival.at.split("T")[1]}
      </Text>
      <Text style={styles.flightText}>
        Number of Stops: {item.itineraries[0].segments[0].numberOfStops}
      </Text>
      <Text style={styles.flightText}>Price: £{item.price.total}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Inbound Flight</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <FlatList
            data={flights}
            renderItem={renderFlightItem}
            keyExtractor={(item) => item.id.toString()}
          />
          {selectedOutboundFlight && (
            <Button
              title={"Confirm Inbound Flight"}
              onPress={() =>
                navigation.navigate("generate-hotels", {
                  selectedOutboundFlight,
                  selectedInboundFlight,
                  outboundAirport,
                  inboundAirport,
                  departDate,
                  returnDate,
                  budget,
                })
              }
            ></Button>
          )}
        </>
      )}
    </View>
  );
};
export default GenerateInboundFlights;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  flightItem: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  flightText: {
    fontSize: 16,
  },
  selectedFlightItem: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#e0f7fa",
    borderRadius: 8,
  },
  selectedFlightText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
